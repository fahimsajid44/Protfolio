import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";

/* ══════════════════════════════════════════
   REUSABLE ANIMATION PRIMITIVES
══════════════════════════════════════════ */
function MaskReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
      <div style={{ width: 28, height: 1, background: "#14B8A6", opacity: 0.5 }} />
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: 10,
        color: "#14B8A6", letterSpacing: 3, textTransform: "uppercase",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

function DrawLine({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "80px 0", overflow: "hidden" }}>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
        style={{ height: "100%", background: "rgba(255,255,255,0.04)", transformOrigin: "left" }}
      />
    </div>
  );
}

function SplitHeadline({ words, delay = 0, center = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: "0.3em", alignItems: "baseline", justifyContent: center ? "center" : "flex-start" }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            style={{
              display: "inline-block",
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-1px",
              color: i % 2 === 0 ? "rgba(255,255,255,0.78)" : "rgba(20,184,166,0.6)",
            }}
            initial={{ y: "110%", opacity: 0, skewY: 5 }}
            animate={inView ? { y: "0%", opacity: 1, skewY: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   HERO — SCROLLING MARQUEE STRIP
══════════════════════════════════════════ */
function ScrollStrip({ text, direction = 1 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [`${direction * 8}%`, `${direction * -8}%`]);
  return (
    <div ref={ref} style={{ overflow: "hidden", padding: "6px 0", position: "relative" }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "10%",
        background: "linear-gradient(to right, #06060A, transparent)", zIndex: 1, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "10%",
        background: "linear-gradient(to left, #06060A, transparent)", zIndex: 1, pointerEvents: "none",
      }} />
      <motion.div style={{ x, display: "flex", gap: "clamp(32px,5vw,80px)", whiteSpace: "nowrap", width: "max-content" }}>
        {[...Array(8)].map((_, i) => (
          <span key={i} style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: "clamp(32px, 7vw, 96px)",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.055)",
            letterSpacing: "-1px",
            userSelect: "none",
            flexShrink: 0,
          }}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   OFFER CARD
══════════════════════════════════════════ */
const OFFERS = [
  {
    num: "01",
    title: "Full-Stack Development",
    desc: "End-to-end MERN applications built to scale — from database architecture and REST/GraphQL APIs to performant, pixel-perfect React interfaces. I own the entire lifecycle.",
    tags: ["React", "Node.js", "MongoDB", "Express", "REST API"],
    color: "#14B8A6",
    icon: "⚙️",
  },
  {
    num: "02",
    title: "UI / UX Design",
    desc: "Interfaces that don't just look good — they convert. Thoughtful component systems, motion design, and accessibility-first layouts that captivate every user.",
    tags: ["Figma", "Framer", "Motion", "Design Systems", "A11y"],
    color: "#A78BFA",
    icon: "✦",
  },
  {
    num: "03",
    title: "Backend & CMS",
    desc: "Robust, secure server infrastructure with headless CMS integrations (Sanity, Contentful, Craft CMS) so your team can manage content without touching code.",
    tags: ["Sanity", "Contentful", "Docker", "Firebase", "Auth"],
    color: "#F78C6C",
    icon: "🗄️",
  },
  {
    num: "04",
    title: "Dynamic Interactions",
    desc: "Creative 3D experiences and scroll-driven animations using Three.js and GSAP that transform static pages into immersive digital environments.",
    tags: ["Three.js", "GSAP", "WebGL", "Canvas", "Lottie"],
    color: "#4ADE80",
    icon: "◈",
  },
];

function OfferCard({ num, title, desc, tags, color, icon, index }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{ position: "relative" }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: "32px 28px",
          borderRadius: 16,
          border: `1px solid ${hov ? color + "40" : "rgba(255,255,255,0.07)"}`,
          background: hov ? `${color}06` : "rgba(255,255,255,0.02)",
          transition: "border-color 0.35s, background 0.35s",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          cursor: "default",
        }}
      >
        {/* Ghost number */}
        <div style={{
          position: "absolute", right: 20, bottom: 16,
          fontFamily: "'Clash Display', sans-serif",
          fontSize: 100, fontWeight: 700,
          color: hov ? `${color}12` : "rgba(255,255,255,0.018)",
          lineHeight: 1, userSelect: "none",
          transition: "color 0.45s",
        }}>{num}</div>

        {/* Glow */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.4 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute", top: -60, right: -60, width: 200, height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
            filter: "blur(32px)", pointerEvents: "none",
          }}
        />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 9,
            color, letterSpacing: 2, textTransform: "uppercase",
          }}>{num}</span>
          <motion.span
            animate={{ scale: hov ? 1.2 : 1, rotate: hov ? 12 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 22, display: "inline-block" }}
          >{icon}</motion.span>
        </div>

        <h3 style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: "clamp(18px, 2.2vw, 22px)", fontWeight: 600,
          letterSpacing: "-0.3px", marginBottom: 14,
          color: hov ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.75)",
          transition: "color 0.3s",
        }}>{title}</h3>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13.5, color: "rgba(255,255,255,0.3)",
          lineHeight: 1.85, fontWeight: 300, marginBottom: 24,
        }}>{desc}</p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map(t => (
            <span key={t} style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9.5,
              color, letterSpacing: 1,
              padding: "3px 9px", borderRadius: 4,
              background: `${color}0E`, border: `1px solid ${color}20`,
              textTransform: "uppercase",
            }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   TECH STACK — expandable category
══════════════════════════════════════════ */
const STACK = [
  {
    category: "Frontend",
    color: "#14B8A6",
    items: ["React", "Next.js", "Astro", "Gatsby", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Redux", "Vite", "Webpack"],
  },
  {
    category: "Backend / CMS",
    color: "#A78BFA",
    items: ["Node.js", "Express", "GraphQL", "REST API", "Sanity", "Contentful", "Craft CMS", "Drupal", "Firebase", "Prisma", "Mongoose", "Socket.io"],
  },
  {
    category: "Infrastructure",
    color: "#F78C6C",
    items: ["AWS", "Cloudflare", "Digital Ocean", "Docker", "Vercel", "Railway", "CI/CD", "Nginx", "Linux", "GitHub Actions"],
  },
  {
    category: "Ecommerce",
    color: "#4ADE80",
    items: ["Shopify", "Stripe", "Medusa", "WooCommerce", "Lemon Squeezy", "Snipcart", "PayPal"],
  },
];

function TechCategory({ category, color, items, index }) {
  const [expanded, setExpanded] = useState(false);
  const VISIBLE = 6;
  const displayed = expanded ? items : items.slice(0, VISIBLE);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{
        padding: "24px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.018)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, opacity: 0.7, flexShrink: 0 }} />
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10,
          color, letterSpacing: 2.5, textTransform: "uppercase",
        }}>{category}</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        <AnimatePresence>
          {displayed.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.22, delay: i * 0.03 }}
              style={{
                fontFamily: "'DM Mono', monospace", fontSize: 11,
                color: "rgba(255,255,255,0.45)",
                padding: "5px 11px", borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.025)",
                letterSpacing: 0.3,
              }}
            >{item}</motion.span>
          ))}
        </AnimatePresence>
      </div>

      {items.length > VISIBLE && (
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            marginTop: 14, background: "none", border: "none",
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            color, letterSpacing: 1.5, textTransform: "uppercase",
            cursor: "pointer", padding: "4px 0", opacity: 0.7,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.target.style.opacity = 1}
          onMouseLeave={e => e.target.style.opacity = 0.7}
        >
          {expanded ? `− Show Less` : `+ ${items.length - VISIBLE} More`}
        </button>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   PROCESS STEPS
══════════════════════════════════════════ */
const PROCESS = [
  { step: "01", title: "Discovery", desc: "Deep-dive into your goals, users, and constraints. I ask the questions others skip.", color: "#14B8A6" },
  { step: "02", title: "Design",    desc: "Wireframes, component systems, and motion principles — all before a line of code.", color: "#A78BFA" },
  { step: "03", title: "Build",     desc: "Clean, documented code. Regular check-ins. No surprises at the finish line.", color: "#F78C6C" },
  { step: "04", title: "Launch",    desc: "Deploy, test, optimise. 90+ Lighthouse scores and CI/CD pipelines as standard.", color: "#4ADE80" },
  { step: "05", title: "Support",   desc: "Post-launch care, feature iterations, and technical guidance whenever you need it.", color: "#60A5FA" },
];

function ProcessStep({ step, title, desc, color, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
      style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
    >
      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          border: `1px solid ${color}38`,
          background: `${color}0C`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Mono', monospace", fontSize: 10,
          color, letterSpacing: 1,
        }}>{step}</div>
        {index < total - 1 && (
          <div style={{ width: 1, flex: 1, minHeight: 32, background: "rgba(255,255,255,0.05)", margin: "6px 0" }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: index < total - 1 ? 28 : 0 }}>
        <h4 style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: 16, fontWeight: 600,
          color: "rgba(255,255,255,0.78)", marginBottom: 6, letterSpacing: "-0.2px",
        }}>{title}</h4>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, color: "rgba(255,255,255,0.3)",
          lineHeight: 1.85, fontWeight: 300,
        }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   STAT COUNTER
══════════════════════════════════════════ */
const STATS = [
  { value: "10+", label: "Projects Delivered" },
  { value: "2+",  label: "Years Experience"   },
  { value: "4",   label: "Core Specialisms"   },
  { value: "∞",   label: "Coffee Consumed"    },
];

function StatPill({ value, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.09 }}
      whileHover={{ y: -3, borderColor: "rgba(20,184,166,0.28)" }}
      style={{
        padding: "16px 20px", borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        textAlign: "center", flex: "1 1 100px", cursor: "default",
        transition: "border-color 0.3s",
      }}
    >
      <div style={{
        fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700,
        color: "#14B8A6", letterSpacing: -1,
        fontFamily: "'Clash Display', sans-serif",
      }}>{value}</div>
      <div style={{
        fontSize: 10, color: "rgba(255,255,255,0.25)",
        marginTop: 6, textTransform: "uppercase",
        letterSpacing: 2, fontFamily: "'DM Mono', monospace",
      }}>{label}</div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   WHO I WORK WITH
══════════════════════════════════════════ */
const CLIENTS = [
  { icon: "◉", title: "Boutique Agencies", desc: "Expand your capacity without expanding your headcount. I slot into your workflow seamlessly." },
  { icon: "◈", title: "Independent Designers", desc: "You own the vision. I'll handle every line of code to bring it to life exactly as imagined." },
  { icon: "⬡", title: "Early-Stage Startups", desc: "Move fast without breaking things. Production-ready MVPs that scale from day one." },
  { icon: "◇", title: "Established Brands", desc: "Rebuilds, performance overhauls, and new digital experiences for companies that need to level up." },
];

function ClientCard({ icon, title, desc, index }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -3 }}
      style={{
        padding: "22px 20px", borderRadius: 12, cursor: "default",
        border: `1px solid ${hov ? "rgba(20,184,166,0.22)" : "rgba(255,255,255,0.06)"}`,
        background: hov ? "rgba(20,184,166,0.04)" : "rgba(255,255,255,0.015)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <motion.div
        animate={{ scale: hov ? 1.15 : 1, rotate: hov ? 8 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ fontSize: 22, marginBottom: 14, display: "inline-block", color: "#14B8A6", opacity: 0.7 }}
      >{icon}</motion.div>
      <h4 style={{
        fontFamily: "'Clash Display', sans-serif",
        fontSize: 15, fontWeight: 600,
        color: "rgba(255,255,255,0.8)", marginBottom: 8, letterSpacing: "-0.2px",
      }}>{title}</h4>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, color: "rgba(255,255,255,0.28)",
        lineHeight: 1.8, fontWeight: 300,
      }}>{desc}</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function Services() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const scx = useSpring(cx, { stiffness: 500, damping: 32 });
  const scy = useSpring(cy, { stiffness: 500, damping: 32 });
  const [bigCursor, setBigCursor] = useState(false);

  return (
    <div
      style={{ minHeight: "100vh", background: "#06060A", color: "#fff", overflowX: "hidden", cursor: "none" }}
      onMouseMove={e => { cx.set(e.clientX); cy.set(e.clientY); }}
      onMouseOver={e => setBigCursor(!!e.target.closest("button,a,[data-hover]"))}
      onMouseOut={() => setBigCursor(false)}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .scanlines {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.022) 3px,rgba(0,0,0,0.022) 4px);
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #06060A; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.22); border-radius: 2px; }

        .svc-wrap { max-width: 1300px; margin: 0 auto; padding: 0 6%; position: relative; z-index: 2; }

        .offers-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        .tech-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
        .process-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .clients-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        .stats-row { display: flex; gap: 12px; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .offers-grid { grid-template-columns: 1fr; }
          .tech-grid { grid-template-columns: 1fr; }
          .process-layout { grid-template-columns: 1fr; gap: 40px; }
          .clients-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 520px) {
          .clients-grid { grid-template-columns: 1fr; }
          .offers-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Scroll progress */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(to right, #14B8A6, #A78BFA 60%, #F78C6C)",
        transformOrigin: "0%", scaleX, zIndex: 9998,
        boxShadow: "0 0 10px rgba(20,184,166,0.4)",
      }} />

      {/* Cursor dot */}
      <motion.div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9999,
        width: bigCursor ? 34 : 8, height: bigCursor ? 34 : 8, borderRadius: "50%",
        background: bigCursor ? "transparent" : "#14B8A6",
        border: bigCursor ? "1.5px solid #14B8A6" : "none",
        translateX: "-50%", translateY: "-50%", left: scx, top: scy,
        transition: "width 0.25s, height 0.25s, background 0.25s, border 0.25s",
      }} />

      <div className="noise" />
      <div className="scanlines" />

      {/* Ambient background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 65%)",
          filter: "blur(80px)", top: -200, right: -150,
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
          filter: "blur(90px)", bottom: "20%", left: -100,
        }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.02 }}>
          <defs>
            <pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <div className="svc-wrap" style={{ paddingTop: "clamp(110px, 14vw, 160px)", paddingBottom: 0 }}>

        <FadeUp delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "7px 14px", borderRadius: 6,
              border: "1px solid rgba(20,184,166,0.18)",
              background: "rgba(20,184,166,0.05)",
            }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6" }}>~/services</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.22)" }}>—what i do</span>
            </div>
          </div>
        </FadeUp>

        <div style={{ marginBottom: 28 }}>
          <SplitHeadline words={["Full-Stack", "Developer", "&", "Designer"]} delay={0.05} />
        </div>

        <FadeUp delay={0.45} style={{ maxWidth: 680, marginBottom: 48 }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(14px, 1.8vw, 16px)",
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.95, fontWeight: 300,
          }}>
            A complete end-to-end solution — from crafting stunning, user-friendly interfaces to
            engineering robust backends. I handle every layer of the stack, delivering production-ready
            digital experiences tailored precisely to your vision, whether you're an agency, a designer,
            or building something entirely new.
          </p>
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={0.55} style={{ marginBottom: 80 }}>
          <div className="stats-row">
            {STATS.map((s, i) => <StatPill key={s.label} {...s} index={i} />)}
          </div>
        </FadeUp>
      </div>

      {/* ═══════════════ SCROLL STRIPS ═══════════════ */}
      <div style={{ position: "relative", zIndex: 2, marginBottom: 0, overflow: "hidden" }}>
        <ScrollStrip text="Full-Stack · Design · MERN · APIs · Three.js · GSAP · CMS ·" direction={1} />
        <ScrollStrip text="React · Node · MongoDB · Docker · Sanity · Stripe · WebGL ·" direction={-1} />
      </div>

      <DrawLine delay={0} />

      {/* ═══════════════ WHAT I OFFER ═══════════════ */}
      <div className="svc-wrap" style={{ paddingBottom: 0 }}>
        <FadeUp>
          <SectionLabel>What I Offer</SectionLabel>
        </FadeUp>

        <div style={{ marginBottom: 40 }}>
          <SplitHeadline words={["Core", "Services"]} delay={0.05} />
        </div>

        <div className="offers-grid" style={{ marginBottom: 80 }}>
          {OFFERS.map((o, i) => <OfferCard key={o.num} {...o} index={i} />)}
        </div>
      </div>

      <DrawLine />

      {/* ═══════════════ PROCESS ═══════════════ */}
      <div className="svc-wrap" style={{ paddingBottom: 0 }}>
        <FadeUp>
          <SectionLabel>How I Work</SectionLabel>
        </FadeUp>

        <div className="process-layout">
          {/* Left — headline + intro */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <SplitHeadline words={["My", "Process"]} delay={0.05} />
            </div>
            <FadeUp delay={0.2}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: "rgba(255,255,255,0.32)",
                lineHeight: 1.95, fontWeight: 300, maxWidth: 400,
              }}>
                No black boxes. Every project moves through a transparent, structured workflow designed
                to eliminate surprises and keep you in control at every stage.
              </p>
            </FadeUp>

            {/* Philosophy quote block */}
            <FadeUp delay={0.35} style={{ marginTop: 40 }}>
              <div style={{
                padding: "20px 22px", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "radial-gradient(ellipse at 0% 50%, rgba(20,184,166,0.05) 0%, transparent 70%)",
                }} />
                <p style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(14px, 1.8vw, 17px)", fontWeight: 600,
                  color: "rgba(255,255,255,0.58)", lineHeight: 1.6, letterSpacing: "-0.2px",
                  marginBottom: 12,
                }}>
                  ❝ Clean code is not written by following rules. It is written by someone who cares enough to make it clean. ❞
                </p>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: 2 }}>
                  — Robert C. Martin
                </span>
              </div>
            </FadeUp>
          </div>

          {/* Right — steps */}
          <div style={{ paddingTop: 8 }}>
            {PROCESS.map((p, i) => (
              <ProcessStep key={p.step} {...p} index={i} total={PROCESS.length} />
            ))}
          </div>
        </div>
      </div>

      <DrawLine />

      {/* ═══════════════ TECH STACK ═══════════════ */}
      <div className="svc-wrap" style={{ paddingBottom: 0 }}>
        <FadeUp>
          <SectionLabel>Technology Stack</SectionLabel>
        </FadeUp>
        <div style={{ marginBottom: 40 }}>
          <SplitHeadline words={["Tools", "of", "the", "Trade"]} delay={0.05} />
        </div>
        <div className="tech-grid" style={{ marginBottom: 80 }}>
          {STACK.map((s, i) => <TechCategory key={s.category} {...s} index={i} />)}
        </div>
      </div>

      <DrawLine />

      {/* ═══════════════ WHO I WORK WITH ═══════════════ */}
      <div className="svc-wrap" style={{ paddingBottom: 0 }}>
        <FadeUp>
          <SectionLabel>Ideal Clients</SectionLabel>
        </FadeUp>
        <div style={{ marginBottom: 40 }}>
          <SplitHeadline words={["Who", "I", "Work", "With"]} delay={0.05} />
        </div>
        <div className="clients-grid" style={{ marginBottom: 80 }}>
          {CLIENTS.map((c, i) => <ClientCard key={c.title} {...c} index={i} />)}
        </div>
      </div>

      <DrawLine />

      {/* ═══════════════ CTA ═══════════════ */}
      <div className="svc-wrap" style={{ paddingBottom: 140 }}>
        <FadeUp>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>

            <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "8px 18px", borderRadius: 6,
                border: "1px solid rgba(20,184,166,0.2)",
                background: "rgba(20,184,166,0.04)",
              }}>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }}
                />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 2 }}>
                  open to new projects
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
              <SplitHeadline words={["Let's", "Build", "Something"]} delay={0.05} center />
            </div>

            <FadeUp delay={0.3}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, color: "rgba(255,255,255,0.28)",
                lineHeight: 1.85, fontWeight: 300, marginBottom: 32,
                textAlign: "center",
              }}>
                Have a project in mind? Whether it's a full product build, a design handoff, or a
                technical consultation — let's talk and turn your idea into a production-ready reality.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/contact" data-hover style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(20,184,166,0.2)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "13px 30px", borderRadius: 10, cursor: "none",
                      background: "rgba(20,184,166,0.09)",
                      border: "1px solid rgba(20,184,166,0.3)",
                      fontFamily: "'DM Mono', monospace", fontSize: 12,
                      color: "#14B8A6", letterSpacing: 2, textTransform: "uppercase",
                    }}
                  >
                    Get in touch ↗
                  </motion.div>
                </Link>

                <Link to="/works" data-hover style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "13px 30px", borderRadius: 10, cursor: "none",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "'DM Mono', monospace", fontSize: 12,
                      color: "rgba(255,255,255,0.38)", letterSpacing: 2, textTransform: "uppercase",
                    }}
                  >
                    View Works →
                  </motion.div>
                </Link>
              </div>
            </FadeUp>

          </div>
        </FadeUp>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "12px 6%", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(6,6,10,0.88)", backdropFilter: "blur(20px)", zIndex: 10,
        flexWrap: "wrap", gap: 8,
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(9px, 1.5vw, 11px)", color: "rgba(255,255,255,0.2)" }}>
          © 2026 Fahim Mubasshir Sajid
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }}
          />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(9px, 1.5vw, 11px)", color: "rgba(255,255,255,0.2)" }}>
            open to opportunities
          </span>
        </div>
      </div>
    </div>
  );
}