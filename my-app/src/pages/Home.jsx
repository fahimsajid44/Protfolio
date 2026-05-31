import {
  motion,
  useMotionValue, useSpring, useTransform,
  useScroll, useInView,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from "react-icons/si";

/* ══════════════════════════════════════════
   CURSOR
══════════════════════════════════════════ */
function CursorSpotlight() {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  useEffect(() => {
    const fn = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);
  return (
    <motion.div style={{
      position: "fixed", pointerEvents: "none", zIndex: 0,
      width: 640, height: 640, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(20,184,166,0.055) 0%, transparent 70%)",
      translateX: "-50%", translateY: "-50%", left: sx, top: sy,
    }} />
  );
}

function CursorDot() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 32 });
  const sy = useSpring(y, { stiffness: 500, damping: 32 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const mv = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const ov = (e) => { if (e.target.closest("button,a,[data-hover]")) setBig(true); };
    const ou = () => setBig(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", ov);
    window.addEventListener("mouseout", ou);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", ov);
      window.removeEventListener("mouseout", ou);
    };
  }, [x, y]);
  return (
    <motion.div style={{
      position: "fixed", pointerEvents: "none", zIndex: 9999,
      width: big ? 34 : 8, height: big ? 34 : 8, borderRadius: "50%",
      background: big ? "transparent" : "#14B8A6",
      border: big ? "1.5px solid #14B8A6" : "none",
      translateX: "-50%", translateY: "-50%", left: sx, top: sy,
      transition: "width 0.25s, height 0.25s, background 0.25s, border 0.25s",
    }} />
  );
}

/* ══════════════════════════════════════════
   TYPING ROLE
══════════════════════════════════════════ */
const ROLES = ["MERN Stack Developer", "Full Stack Engineer", "React Specialist", "Node.js Developer", "API Architect"];
function TypingRole() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    const target = ROLES[idx];
    if (pause) { const t = setTimeout(() => { setPause(false); setDel(true); }, 1800); return () => clearTimeout(t); }
    if (!del) {
      if (text.length < target.length) { const t = setTimeout(() => setText(target.slice(0, text.length + 1)), 65); return () => clearTimeout(t); }
      else setPause(true);
    } else {
      if (text.length > 0) { const t = setTimeout(() => setText(text.slice(0, -1)), 38); return () => clearTimeout(t); }
      else { setDel(false); setIdx(i => (i + 1) % ROLES.length); }
    }
  }, [text, del, pause, idx]);
  return (
    <span style={{ color: "#14B8A6" }}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
        style={{ display: "inline-block", width: 2, height: "0.9em", background: "#14B8A6", marginLeft: 2, verticalAlign: "text-bottom" }}
      />
    </span>
  );
}

/* ══════════════════════════════════════════
   STACK BADGES
══════════════════════════════════════════ */
const STACK = [
  { icon: SiMongodb,   label: "MongoDB",  color: "#4DB33D" },
  { icon: SiExpress,   label: "Express",  color: "#aaaaaa" },
  { icon: SiReact,     label: "React",    color: "#61DAFB" },
  { icon: SiNodedotjs, label: "Node.js",  color: "#8CC84B" },
];
function StackBadge({ icon: Icon, label, color, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      data-hover
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 + index * 0.1, duration: 0.5, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -3, scale: 1.05 }}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 14px", borderRadius: 8, cursor: "default",
        border: `1px solid ${hov ? color + "55" : "rgba(255,255,255,0.07)"}`,
        background: hov ? color + "10" : "rgba(255,255,255,0.025)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <Icon size={14} style={{ color: hov ? color : "rgba(255,255,255,0.35)", transition: "color 0.3s", flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: hov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", transition: "color 0.3s", whiteSpace: "nowrap" }}>{label}</span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   STAT CARD (hero)
══════════════════════════════════════════ */
function StatCard({ value, label, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1 + i * 0.1, duration: 0.5, ease: [0.22,1,0.36,1] }}
      whileHover={{ y: -3, borderColor: "rgba(20,184,166,0.28)" }}
      data-hover
      style={{
        padding: "14px 16px", borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        cursor: "default", transition: "border-color 0.3s",
        flex: "1 1 70px", minWidth: 70,
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 700, color: "#14B8A6", letterSpacing: -1, fontFamily: "'Clash Display', sans-serif" }}>{value}</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginTop: 5, textTransform: "uppercase", letterSpacing: 2, fontFamily: "'DM Mono', monospace" }}>{label}</div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   FLOATING CODE
══════════════════════════════════════════ */
function FloatingCode() {
  const rows = [
    [["const ", "#C792EA"], ["developer", "#82AAFF"], [" = {", "#89DDFF"]],
    [["  name: ", "#89DDFF"], ["'Fahim Mubasshir Sajid'", "#C3E88D"], [",", "#89DDFF"]],
    [["  stack: ", "#89DDFF"], ["'MERN'", "#C3E88D"], [",", "#89DDFF"]],
    [["  focus: ", "#89DDFF"], ["'Full Stack'", "#C3E88D"], [",", "#89DDFF"]],
    [["  location: ", "#89DDFF"], ["'Sylhet, Bangladesh'", "#C3E88D"], [",", "#89DDFF"]],
    [["  status: ", "#89DDFF"], ["'🟢 Available'", "#C3E88D"], [",", "#89DDFF"]],
    [["}", "#89DDFF"]],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.22,1,0.36,1] }}
      style={{
        background: "rgba(10,10,15,0.9)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12,
        padding: "16px 20px", fontFamily: "'DM Mono', monospace", fontSize: 12,
        lineHeight: 1.95, width: "100%", overflowX: "auto",
      }}
    >
      <div style={{ display: "flex", gap: 6, marginBottom: 14, alignItems: "center" }}>
        {["#FF5F57","#FFBD2E","#28CA41"].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0 }} />
        ))}
        <span style={{ marginLeft: 8, fontSize: 10, color: "rgba(255,255,255,0.2)" }}>developer.js</span>
      </div>
      {rows.map((row, ri) => (
        <motion.div key={ri} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + ri * 0.08 }} style={{ display: "flex", flexWrap: "wrap" }}>
          {row.map(([t, c], ci) => <span key={ci} style={{ color: c }}>{t}</span>)}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   ORBIT RING
══════════════════════════════════════════ */
function OrbitRing() {
  return (
    <div style={{ position: "relative", width: 260, height: 260, margin: "0 auto" }}>
      {[100, 65].map((r, i) => (
        <motion.div key={r}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", width: r * 2, height: r * 2, borderRadius: "50%",
            border: "1px solid rgba(20,184,166,0.1)",
            top: "50%", left: "50%", marginTop: -r, marginLeft: -r,
          }}
        >
          {STACK.filter((_, j) => j % 2 === i).map(({ icon: Icon, color }, j) => {
            const angle = (j / 2) * Math.PI * 2;
            return (
              <motion.div key={j} data-hover
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + j * 0.15 }}
                whileHover={{ scale: 1.3 }}
                style={{
                  position: "absolute", width: 38, height: 38, borderRadius: 9,
                  border: `1px solid ${color}30`, background: `${color}0D`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  top: "50%", left: "50%",
                  marginTop: -19 + Math.sin(angle) * r,
                  marginLeft: -19 + Math.cos(angle) * r,
                  cursor: "none",
                }}
              >
                <Icon size={16} style={{ color }} />
              </motion.div>
            );
          })}
        </motion.div>
      ))}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        {[1, 0.6, 0.3].map((o, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [o, 0, o] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
            style={{
              position: "absolute", width: 48, height: 48, borderRadius: "50%",
              border: "1px solid rgba(20,184,166,0.4)",
              top: "50%", left: "50%", marginTop: -24, marginLeft: -24,
            }}
          />
        ))}
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 1,
        }}>MERN</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SECTION LABEL
══════════════════════════════════════════ */
function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
      <div style={{ width: 28, height: 1, background: "#14B8A6", opacity: 0.5, flexShrink: 0 }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   CINEMATIC SCROLL ANIMATION PRIMITIVES
══════════════════════════════════════════ */

function MaskReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={isInView ? { y: "0%" } : {}}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function SplitReveal({ text, tag = "h2", style = {}, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");
  const Tag = tag;
  return (
    <Tag ref={ref} style={{ ...style, display: "flex", flexWrap: "wrap", gap: "0.28em", alignItems: "baseline" }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%", opacity: 0, rotateX: -50 }}
            animate={isInView ? { y: "0%", opacity: 1, rotateX: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.055 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function GlitchReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
      animate={isInView ? {
        opacity: [0, 1, 0.5, 1],
        x: [-16, 2, -1, 0],
        filter: ["blur(6px)", "blur(0px)", "blur(1px)", "blur(0px)"],
      } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay, times: [0, 0.5, 0.75, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxDrift({ speed = 0.15, children, style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [70 * speed, -70 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  return (
    <div ref={ref} style={style}>
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SKILLS MARQUEE
══════════════════════════════════════════ */
const SKILLS_A = ["React.js", "Node.js", "MongoDB", "Express.js", "TypeScript", "REST APIs", "GraphQL", "Docker", "Git"];
const SKILLS_B = ["Tailwind CSS", "Mongoose", "JWT Auth", "Socket.io", "Redux", "Vercel", "Railway", "Prisma", "Next.js"];

function MarqueeRow({ items, reverse = false, speed = 28 }) {
  return (
    <div style={{ overflow: "hidden", position: "relative", marginBottom: 10 }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120,
        background: "linear-gradient(to right, #06060A, transparent)", zIndex: 1, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 120,
        background: "linear-gradient(to left, #06060A, transparent)", zIndex: 1, pointerEvents: "none",
      }} />
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 10, width: "max-content" }}
      >
        {[...items, ...items].map((s, i) => (
          <div key={i} style={{
            padding: "7px 16px", borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            color: "rgba(255,255,255,0.28)", whiteSpace: "nowrap", letterSpacing: 0.5,
          }}>{s}</div>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FREELANCE OUTRO
══════════════════════════════════════════ */
function FreelanceOutro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ width: "100%", overflow: "hidden", paddingBottom: 120, position: "relative" }}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
          marginTop: "clamp(28px, 4vw, 56px)", padding: "0 16px",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "8px 18px", borderRadius: 6,
          border: "1px solid rgba(20,184,166,0.2)",
          background: "rgba(20,184,166,0.04)",
        }}>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }}
          />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(10px, 1.5vw, 12px)", color: "rgba(255,255,255,0.35)", letterSpacing: 2 }}>
            open to new projects
          </span>
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(13px, 2vw, 16px)",
          color: "rgba(255,255,255,0.22)",
          textAlign: "center", maxWidth: 420, lineHeight: 1.7, fontWeight: 300,
        }}>
          Have a project in mind? Let's talk and turn your idea into a production-ready product.
        </p>

        <Link to="/contact" data-hover style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(20,184,166,0.22)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "clamp(10px, 2vw, 14px) clamp(22px, 4vw, 36px)",
              borderRadius: 8, cursor: "none",
              background: "rgba(20,184,166,0.08)",
              border: "1px solid rgba(20,184,166,0.3)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "clamp(11px, 1.5vw, 13px)",
              color: "#14B8A6", letterSpacing: 2, textTransform: "uppercase",
            }}
          >
            Get in touch ↗
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function Home() {
  const mouseXN = useMotionValue(0.5);
  const mouseYN = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mouseXN, [0,1], [-50,50]), { stiffness: 40, damping: 18 });
  const glowY = useSpring(useTransform(mouseYN, [0,1], [-50,50]), { stiffness: 40, damping: 18 });
  const tiltX = useSpring(useTransform(mouseYN, [0,1], [5,-5]), { stiffness: 50, damping: 18 });
  const tiltY = useSpring(useTransform(mouseXN, [0,1], [-5,5]), { stiffness: 50, damping: 18 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const fn = (e) => { mouseXN.set(e.clientX / window.innerWidth); mouseYN.set(e.clientY / window.innerHeight); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mouseXN, mouseYN]);

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = {
    hidden:  { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.75, ease: [0.22,1,0.36,1] } },
  };

  return (
    <div style={{ minHeight: "100vh", background: "#06060A", color: "white", fontFamily: "'Clash Display', sans-serif", position: "relative", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px; }
        .scanlines { position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.025) 3px,rgba(0,0,0,0.025) 4px); }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #06060A; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.22); border-radius: 2px; }

        .hero-grid {
          min-height: 100vh; display: grid;
          grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center; padding: 100px 6% 80px;
          max-width: 1300px; margin: 0 auto;
        }
        .hero-right { display: flex; flex-direction: column; gap: 28px; align-items: stretch; }
        .orbit-wrapper { display: flex; justify-content: center; }
        .section-wrap { max-width: 1300px; margin: 0 auto; padding: 0 6% 40px; position: relative; z-index: 2; }
        .stats-row-hero { display: flex; gap: 10px; flex-wrap: wrap; }
        .stack-row { display: flex; gap: 8px; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; min-height: unset; padding-top: 110px; padding-bottom: 60px; gap: 40px; }
        }
        @media (max-width: 600px) {
          .hero-grid { padding-top: 90px; padding-bottom: 48px; gap: 32px; }
          .orbit-wrapper { display: none; }
        }
      `}</style>

      {/* ── Scroll progress bar ── */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(to right, #14B8A6, #A78BFA 60%, #F78C6C)",
        transformOrigin: "0%", scaleX, zIndex: 9998,
        boxShadow: "0 0 10px rgba(20,184,166,0.5)",
      }} />

      <div className="noise" />
      <div className="scanlines" />
      <CursorDot />
      <CursorSpotlight />

      {/* ── Animated background ── */}
      <motion.div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}>
        <motion.div style={{
          position: "absolute", width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 65%)",
          filter: "blur(80px)", top: -300, left: -200, x: glowX, y: glowY,
        }} />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.06, 0.10, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
            filter: "blur(90px)", bottom: -150, right: -100,
          }}
        />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </motion.div>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <div className="hero-grid" style={{ position: "relative", zIndex: 2 }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "7px 14px", borderRadius: 6,
              border: "1px solid rgba(20,184,166,0.18)", background: "rgba(20,184,166,0.05)",
            }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6" }}>~/portfolio</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.22)" }}>git:(main) ✓</span>
              <motion.span animate={{ opacity: [1,0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                style={{ color: "#14B8A6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>▋</motion.span>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>
            Hello, I'm
          </motion.p>

          <motion.h1 variants={itemVariants} style={{ fontSize: "clamp(36px, 6vw, 82px)", lineHeight: 0.94, fontWeight: 700, letterSpacing: "0px", marginBottom: 18 }}>
            Fahim<br />Mubasshir<br />Sajid
          </motion.h1>

          <motion.div variants={itemVariants} style={{ fontSize: "clamp(15px, 2.2vw, 22px)", fontWeight: 500, marginBottom: 24, letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.22)" }}>{"<"}</span>
            <TypingRole />
            <span style={{ color: "rgba(255,255,255,0.22)" }}>{"/>"}</span>
          </motion.div>

          <motion.p variants={itemVariants} style={{ color: "rgba(255,255,255,0.42)", fontSize: "clamp(13px, 1.5vw, 15px)", lineHeight: 1.9, maxWidth: 520, marginBottom: 32, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            I build scalable, production-ready web applications using the complete MERN stack —
            from pixel-perfect React UIs and RESTful APIs to optimised MongoDB schemas
            and secure Node.js back-ends. Based in Dhaka, Bangladesh, open to remote work worldwide.
          </motion.p>

          <motion.div variants={itemVariants} className="stats-row-hero" style={{ marginBottom: 32 }}>
            {[["10+","Projects"],["2+","Years Exp"],["10+","REST APIs"]].map(([v,l], i) => (
              <StatCard key={l} value={v} label={l} i={i} />
            ))}
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>Core Stack</p>
            <div className="stack-row">
              {STACK.map((s, i) => <StackBadge key={s.label} {...s} index={i} />)}
            </div>
          </motion.div>
        </motion.div>

        <div className="hero-right">
          <div className="orbit-wrapper"><OrbitRing /></div>
          <FloatingCode />
        </div>
      </div>

      {/* ═══════════════════ SCROLL SECTIONS ═══════════════════ */}
      <div className="section-wrap" style={{ position: "relative", zIndex: 2 }}>

        {/* ── Technologies ── */}
        <div style={{ marginBottom: 80 }}>
          <GlitchReveal>
            <SectionLabel>Technologies</SectionLabel>
          </GlitchReveal>
          <ParallaxDrift speed={0.08}>
            <MarqueeRow items={SKILLS_A} speed={30} />
            <MarqueeRow items={SKILLS_B} reverse speed={24} />
          </ParallaxDrift>
        </div>

        {/* ── Parallax philosophy quote ── */}
        <ParallaxDrift speed={0.18} style={{ marginBottom: 80 }}>
          <div style={{
            padding: "clamp(32px, 6vw, 72px) clamp(20px, 5vw, 48px)", borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(255,255,255,0.02)",
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.05) 0%, transparent 65%)",
            }} />
            <MaskReveal>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 3, textTransform: "uppercase", marginBottom: 30 }}>
                Philosophy
              </div>
            </MaskReveal>
            <SplitReveal
              text={"❝Clean code is not written by following rules. It is written by someone who cares enough to make it clean.❞"}
              tag="blockquote"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(17px, 2.6vw, 26px)", fontWeight: 600,
                color: "rgba(255,255,255,0.66)", lineHeight: 1.5,
                letterSpacing: "-0.4px", maxWidth: 740, margin: "0 auto 28px",
              }}
              delay={0.1}
            />
            <MaskReveal delay={0.65}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: 2 }}>— Robert C. Martin</p>
            </MaskReveal>
          </div>
        </ParallaxDrift>

        {/* ── Freelance outro with router link ── */}
        <FreelanceOutro />

      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "12px 6%", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(6,6,10,0.88)", backdropFilter: "blur(20px)", zIndex: 10,
          flexWrap: "wrap", gap: 8,
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(9px, 1.5vw, 11px)", color: "rgba(255,255,255,0.2)" }}>© 2026 Fahim Mubasshir Sajid</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.div animate={{ scale: [1,1.5,1], opacity: [1,0.4,1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(9px, 1.5vw, 11px)", color: "rgba(255,255,255,0.2)" }}>open to opportunities</span>
        </div>
      </motion.div>
    </div>
  );
}