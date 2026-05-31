import {
  motion,
  useMotionValue, useSpring, useTransform,
  useScroll, useInView,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiFramer, SiNextdotjs, SiSocketdotio, SiStripe } from "react-icons/si";

/* ══════════════════════════════════════════
   CURSOR
══════════════════════════════════════════ */
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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

function CursorSpotlight() {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  useEffect(() => {
    const fn = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <motion.div style={{
      position: "fixed", pointerEvents: "none", zIndex: 0,
      width: 640, height: 640, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(20,184,166,0.055) 0%, transparent 70%)",
      translateX: "-50%", translateY: "-50%", left: sx, top: sy,
    }} />
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

/* ══════════════════════════════════════════
   TECH ICON MAP
══════════════════════════════════════════ */
const TECH_ICONS = {
  "MERN Stack":    { icon: SiMongodb,     color: "#4DB33D" },
  "React":         { icon: SiReact,       color: "#61DAFB" },
  "Node.js":       { icon: SiNodedotjs,   color: "#8CC84B" },
  "MongoDB":       { icon: SiMongodb,     color: "#4DB33D" },
  "Express":       { icon: SiExpress,     color: "#aaaaaa" },
  "Tailwind CSS":  { icon: SiTailwindcss, color: "#38BDF8" },
  "Framer Motion": { icon: SiFramer,      color: "#dddddd" },
  "Next.js":       { icon: SiNextdotjs,   color: "#ffffff" },
  "Socket.io":     { icon: SiSocketdotio, color: "#ffffff" },
  "Stripe":        { icon: SiStripe,      color: "#635BFF" },
};

/* ══════════════════════════════════════════
   PROJECT DATA
══════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "01",
    name: "Ticket Nen BD",
    tagline: "Buy. Sell. Experience.",
    desc: "A full-featured ticket buying and selling platform with admin monitoring, organizer event promotion, ticket pricing control, and performance tracking.",
    tags: ["MERN Stack", "Tailwind CSS", "Framer Motion"],
    year: "2025",
    status: "Private Demo",
    color: "#14B8A6",
    links: {
      live:       "https://ticketnenbd.netlify.app/",
      clientRepo: "https://github.com/fahimsajid44/ticket-nen-client.git",
      serverRepo: "https://github.com/fahimsajid44/ticket-nen-server.git",
      demo:       "https://drive.google.com/file/d/1Zgmar9m4_Zf4GxuQDkKhEjOZ-BteUT50/view?usp=sharing",
    },
  },
  {
    id: "02",
    name: "Kather Ghor",
    tagline: "Commerce. Simplified.",
    desc: "An online furniture marketplace that enables users to buy and sell furniture, manage product listings, promote featured items, and track sales performance through an intuitive and professional platform.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    year: "2024",
    status: "Live",
    color: "#A78BFA",
    links: {
      live:       "https://katherghor.netlify.app/",
      clientRepo: "https://github.com/fahimsajid44/kather-ghor/tree/main/kather-ghor/client-side",
      serverRepo: "https://github.com/fahimsajid44/kather-ghor/tree/main/kather-ghor/server-side",
      demo:       "",
    },
  },
  {
    id: "03",
    name: "Find Basha",
    tagline: "Real-time. Collaborative.",
    desc: "A comprehensive rental and housing platform that allows users to search for properties, publish rental listings, manage advertisements, and seamlessly connect landlords with potential tenants.",
    tags: ["React", "Express", "Socket.io", "MongoDB"],
    year: "2024",
    status: "Live",
    color: "#F78C6C",
    links: {
      live:       "https://findbasha.netlify.app/",
      clientRepo: "https://github.com/fahimsajid44/Find-Basha.git",
      serverRepo: "https://github.com/fahimsajid44/Find-Basha.git",
      demo:       "",
    },
  },
  {
    id: "04",
    name: "Tutor Demand",
    tagline: "Connect. Learn. Succeed.",
    desc: "A smart tutor-finding platform that helps students discover qualified tutors based on location, subject, and availability. Tutor Demand features secure authentication, tutor management, booking functionality, and a demo payment system within a clean and user-friendly interface.",
    tags: ["JAVA", "FireBase"],
    year: "2024",
    status: "Source Code",
    color: "#38BDF8",
    links: {
      live:       "https://your-devmetrics-url.netlify.app/",
      clientRepo: "https://github.com/fahimsajid44/TutorDemand.git",
      serverRepo: "https://github.com/fahimsajid44/TutorDemand.git",
      demo:       "",
    },
  },
];

/* ══════════════════════════════════════════
   HERO RIGHT — Floating Framer Motion Visual
══════════════════════════════════════════ */
function HeroFloatingVisual({ mouseXN, mouseYN }) {
  const rotX = useSpring(useTransform(mouseYN, [0, 1], [8, -8]),  { stiffness: 50, damping: 20 });
  const rotY = useSpring(useTransform(mouseXN, [0, 1], [-8, 8]),  { stiffness: 50, damping: 20 });

  const orbs = [
    { color: "#14B8A6", size: 130, x: "50%",  y: "50%",  dur: 7,  delay: 0   },
    { color: "#A78BFA", size: 88,  x: "22%",  y: "24%",  dur: 9,  delay: 1.2 },
    { color: "#F78C6C", size: 64,  x: "76%",  y: "20%",  dur: 11, delay: 0.6 },
    { color: "#38BDF8", size: 52,  x: "14%",  y: "72%",  dur: 8,  delay: 2   },
    { color: "#4ADE80", size: 46,  x: "82%",  y: "74%",  dur: 10, delay: 1.5 },
  ];

  const stackCards = [
    { label: "React",         val: "18.3",   color: "#61DAFB", icon: SiReact,    deg: -7,  tx: -38, ty: 14  },
    { label: "Node.js",       val: "20 LTS", color: "#8CC84B", icon: SiNodedotjs,deg: 4,   tx: 34,  ty: -14 },
    { label: "MongoDB",       val: "Atlas",  color: "#4DB33D", icon: SiMongodb,  deg: -2,  tx: -10, ty: -36 },
    { label: "Framer Motion", val: "11.x",   color: "#dddddd", icon: SiFramer,   deg: 6,   tx: 36,  ty: 28  },
  ];

  const rings = [190, 145, 100];

  return (
    <motion.div
      style={{
        position: "relative", width: "100%", height: "100%",
        rotateX: rotX, rotateY: rotY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Concentric animated rings */}
      {rings.map((r, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 18 + i * 7, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: r, height: r,
            marginTop: -r / 2, marginLeft: -r / 2,
            borderRadius: "50%",
            border: `1px solid rgba(20,184,166,${0.2 - i * 0.05})`,
          }}
        >
          {/* Dot riding the ring */}
          <div style={{
            position: "absolute", top: -4, left: "50%", marginLeft: -4,
            width: 8, height: 8, borderRadius: "50%",
            background: ["#14B8A6", "#A78BFA", "#F78C6C"][i],
            boxShadow: `0 0 10px 2px ${["#14B8A6", "#A78BFA", "#F78C6C"][i]}60`,
          }} />
        </motion.div>
      ))}

      {/* Glowing orb blobs */}
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          animate={{
            y:       [0, -18, 0, 14, 0],
            x:       [0, 10,  0, -8, 0],
            scale:   [1, 1.12, 0.95, 1.08, 1],
            opacity: [0.5, 0.72, 0.5, 0.68, 0.5],
          }}
          transition={{ duration: o.dur, repeat: Infinity, delay: o.delay, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: o.x, top: o.y,
            transform: "translate(-50%,-50%)",
            width: o.size, height: o.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color}55 0%, ${o.color}00 70%)`,
            filter: "blur(16px)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Floating tech badge cards */}
      {stackCards.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: `translate(-50%,-50%) translate(${c.tx}px,${c.ty}px) rotate(${c.deg}deg)`,
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 14px", borderRadius: 10,
              background: "rgba(6,6,10,0.85)",
              border: `1px solid ${c.color}38`,
              backdropFilter: "blur(14px)",
              boxShadow: `0 4px 32px ${c.color}18`,
              whiteSpace: "nowrap",
              zIndex: 10 + i,
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: `${c.color}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Icon size={13} style={{ color: c.color }} />
            </div>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, color: "rgba(255,255,255,0.45)", letterSpacing: 1 }}>{c.label}</p>
              <p style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 13, fontWeight: 600, color: c.color, letterSpacing: "-0.3px" }}>{c.val}</p>
            </div>
          </motion.div>
        );
      })}

      {/* Centre nucleus */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: ["0 0 20px #14B8A622", "0 0 44px #14B8A644", "0 0 20px #14B8A622"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: 54, height: 54,
          marginTop: -27, marginLeft: -27,
          borderRadius: "50%",
          background: "radial-gradient(circle, #14B8A640 0%, #14B8A610 60%, transparent 100%)",
          border: "1.5px solid rgba(20,184,166,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 20,
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, color: "#14B8A6" }}>⌘</span>
      </motion.div>

      {/* Floating label chips */}
      {[
        { label: "10+ Projects", top: "7%",  left: "2%",  delay: 1.0 },
        { label: "2+ Years",     top: "84%", left: "58%", delay: 1.4 },
        { label: "MERN Stack",   top: "90%", left: "2%",  delay: 1.8 },
      ].map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { delay: m.delay, duration: 0.5 },
            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 },
          }}
          style={{
            position: "absolute", top: m.top, left: m.left,
            padding: "4px 10px", borderRadius: 5,
            background: "rgba(20,184,166,0.07)",
            border: "1px solid rgba(20,184,166,0.22)",
            fontFamily: "'DM Mono', monospace", fontSize: 9,
            color: "rgba(20,184,166,0.72)", letterSpacing: 1.5,
            textTransform: "uppercase", whiteSpace: "nowrap",
          }}
        >
          {m.label}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   LINK BUTTON
══════════════════════════════════════════ */
function LinkBtn({ href, label, icon, color = "#14B8A6", ghost = false }) {
  if (!href || href === "#" || href === "") return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-hover style={{ textDecoration: "none" }}>
      <motion.div
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "8px 16px", borderRadius: 7, cursor: "none",
          background: ghost ? "transparent" : `${color}12`,
          border: `1px solid ${ghost ? "rgba(255,255,255,0.08)" : color + "35"}`,
          fontFamily: "'DM Mono', monospace",
          fontSize: 11, color: ghost ? "rgba(255,255,255,0.4)" : color,
          letterSpacing: 1.5, textTransform: "uppercase",
          whiteSpace: "nowrap",
          transition: "border-color 0.3s, background 0.3s, color 0.3s",
        }}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </motion.div>
    </a>
  );
}

/* ══════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════ */
function ProjectCard({ project, index }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { color } = project;

  const hasDemo       = project.links.demo       && project.links.demo       !== "#" && project.links.demo       !== "";
  const hasClientRepo = project.links.clientRepo && project.links.clientRepo !== "#" && project.links.clientRepo !== "";
  const hasServerRepo = project.links.serverRepo && project.links.serverRepo !== "#" && project.links.serverRepo !== "";
  const hasLive       = project.links.live       && project.links.live       !== "#" && project.links.live       !== "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      data-hover
      style={{
        position: "relative", borderRadius: 18, overflow: "hidden",
        border: `1px solid ${hov ? color + "45" : "rgba(255,255,255,0.07)"}`,
        background: hov ? `${color}06` : "rgba(255,255,255,0.02)",
        transition: "border-color 0.4s, background 0.4s",
        padding: "clamp(22px, 3.5vw, 42px)",
      }}
    >
      {/* Glow blob */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.5 }}
        transition={{ duration: 0.55 }}
        style={{
          position: "absolute", top: -100, right: -100, width: 380, height: 380,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
          filter: "blur(36px)", pointerEvents: "none",
        }}
      />

      {/* Ghost number */}
      <div style={{
        position: "absolute", right: "clamp(14px, 3vw, 38px)", bottom: "clamp(8px, 2vw, 18px)",
        fontFamily: "'Clash Display', sans-serif",
        fontSize: "clamp(70px, 12vw, 156px)", fontWeight: 700,
        color: hov ? `${color}14` : "rgba(255,255,255,0.022)",
        lineHeight: 1, transition: "color 0.5s", userSelect: "none", pointerEvents: "none",
      }}>{project.id}</div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Top meta */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9, color,
              letterSpacing: 3, textTransform: "uppercase",
              padding: "3px 9px", borderRadius: 4,
              background: `${color}12`, border: `1px solid ${color}22`,
            }}>{project.year}</span>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9,
              color: "rgba(255,255,255,0.2)", letterSpacing: 2, textTransform: "uppercase",
            }}>{project.status}</span>
          </div>
          <motion.span
            animate={{ x: hov ? 0 : -10, opacity: hov ? 1 : 0 }}
            transition={{ duration: 0.22 }}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, color }}
          >↗</motion.span>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 700,
          letterSpacing: "-0.5px", marginBottom: 5,
          color: hov ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.82)",
          transition: "color 0.3s", lineHeight: 1.05,
        }}>{project.name}</h2>

        {/* Tagline */}
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(10px, 1.2vw, 13px)",
          color, letterSpacing: 2, marginBottom: 16, opacity: 0.65,
        }}>{project.tagline}</p>

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(12.5px, 1.4vw, 14.5px)",
          color: "rgba(255,255,255,0.36)", lineHeight: 1.85,
          fontWeight: 300, maxWidth: 700, marginBottom: 26,
        }}>{project.desc}</p>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 26 }}>
          {project.tags.map(t => {
            const tech = TECH_ICONS[t];
            const Icon = tech?.icon;
            return (
              <span key={t} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontFamily: "'DM Mono', monospace", fontSize: 9.5,
                color: tech?.color || color, letterSpacing: 1.2,
                padding: "4px 10px", borderRadius: 5,
                background: `${tech?.color || color}0D`,
                border: `1px solid ${tech?.color || color}22`,
                textTransform: "uppercase",
              }}>
                {Icon && <Icon size={10} />}
                {t}
              </span>
            );
          })}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {hasLive       && <LinkBtn href={project.links.live}       label="Live Preview" icon="🌐" color={color} />}
          {hasDemo       && <LinkBtn href={project.links.demo}       label="Demo Video"   icon="▶"  color="#A78BFA" />}
          {hasClientRepo && <LinkBtn href={project.links.clientRepo} label="Client Repo"  icon="⌥"  ghost />}
          {hasServerRepo && <LinkBtn href={project.links.serverRepo} label="Server Repo"  icon="⌥"  ghost />}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   STATS ROW
══════════════════════════════════════════ */
function StatItem({ value, label, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{
        padding: "clamp(20px, 3vw, 34px) clamp(16px, 2.5vw, 26px)",
        background: "rgba(255,255,255,0.02)",
        borderRight: !isLast ? "1px solid rgba(255,255,255,0.06)" : "none",
        textAlign: "center",
      }}
    >
      <div style={{
        fontFamily: "'Clash Display', sans-serif",
        fontSize: "clamp(24px, 3.5vw, 46px)", fontWeight: 700,
        color: "#14B8A6", letterSpacing: "-1px", marginBottom: 8,
      }}>{value}</div>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "clamp(8px, 1vw, 10px)",
        color: "rgba(255,255,255,0.24)", letterSpacing: 2, textTransform: "uppercase",
      }}>{label}</div>
    </motion.div>
  );
}

function StatsRow() {
  const stats = [
    { value: "10+",  label: "Total Projects"   },
    { value: "2+",   label: "Years Experience" },
    { value: "10+",  label: "REST APIs Built"  },
    { value: "100%", label: "Passion"          },
  ];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      gap: 1, borderRadius: 14, overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.06)",
      marginBottom: 80,
    }}>
      {stats.map((s, i) => (
        <StatItem key={s.label} value={s.value} label={s.label} index={i} isLast={i === stats.length - 1} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function HeroSection({ mouseXN, mouseYN }) {
  const c = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
  const it = {
    hidden:  { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div
      className="hero-grid"
      style={{
        maxWidth: 1300, margin: "0 auto",
        padding: "clamp(100px, 12vh, 140px) 6% clamp(52px, 7vh, 90px)",
        position: "relative", zIndex: 2,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px, 5vw, 80px)",
        alignItems: "center",
      }}
    >
      {/* ── Left: text content ── */}
      <motion.div variants={c} initial="hidden" animate="visible">
        <motion.div variants={it} style={{ marginBottom: 22 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "7px 14px", borderRadius: 6,
            border: "1px solid rgba(20,184,166,0.18)", background: "rgba(20,184,166,0.05)",
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6" }}>~/portfolio</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.22)" }}>/works</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              style={{ color: "#14B8A6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}
            >▋</motion.span>
          </div>
        </motion.div>

        <motion.p variants={it} style={{
          fontSize: "clamp(10px, 1.2vw, 12px)", color: "rgba(255,255,255,0.28)",
          letterSpacing: 3, textTransform: "uppercase",
          fontFamily: "'DM Mono', monospace", marginBottom: 16,
        }}>
          Selected Works
        </motion.p>

        <motion.h1 variants={it} style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: "clamp(38px, 6vw, 76px)",
          fontWeight: 700,
          letterSpacing: "0px",
          lineHeight: 0.94,
          marginBottom: 18,
        }}>
          Things I've{" "}
          <span style={{ color: "#14B8A6" }}>Built</span>
        </motion.h1>

        <motion.p variants={it} style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(13px, 1.8vw, 15.5px)",
          color: "rgba(255,255,255,0.38)",
          lineHeight: 1.9, maxWidth: 480, fontWeight: 300, marginBottom: 32,
        }}>
          From side projects to production deployments — a curated showcase of full-stack
          applications built with the MERN stack, shipped with care.
        </motion.p>

        <motion.div variants={it} style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {[
            { value: "4",    label: "featured projects" },
            { value: "2+",   label: "years building"    },
            { value: "MERN", label: "core stack"        },
          ].map(({ value, label }) => (
            <div key={label}>
              <p style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 28, fontWeight: 700, color: "#14B8A6", letterSpacing: "-1px", lineHeight: 1 }}>{value}</p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 5 }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Right: animated floating visual ── */}
      <motion.div
        className="hero-visual-col"
        initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", height: "clamp(300px, 40vw, 460px)" }}
      >
        <HeroFloatingVisual mouseXN={mouseXN} mouseYN={mouseYN} />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function Works() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const mouseXN = useMotionValue(0.5);
  const mouseYN = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mouseXN, [0, 1], [-50, 50]), { stiffness: 40, damping: 18 });
  const glowY = useSpring(useTransform(mouseYN, [0, 1], [-50, 50]), { stiffness: 40, damping: 18 });

  useEffect(() => {
    const fn = (e) => {
      mouseXN.set(e.clientX / window.innerWidth);
      mouseYN.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      minHeight: "100vh", background: "#06060A", color: "white",
      fontFamily: "'Clash Display', sans-serif",
      position: "relative", overflowX: "hidden", cursor: "none",
    }}>
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
          background: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.025) 3px,rgba(0,0,0,0.025) 4px);
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #06060A; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.22); border-radius: 2px; }

        .works-wrap {
          max-width: 1300px; margin: 0 auto;
          padding: 0 6% 140px;
          position: relative; z-index: 2;
        }

        @media (max-width: 760px) {
          .stats-strip { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual-col { display: none !important; }
        }
      `}</style>

      {/* Scroll progress bar */}
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

      {/* Animated background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <motion.div style={{
          position: "absolute", width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 65%)",
          filter: "blur(80px)", top: -200, right: -200, x: glowX, y: glowY,
        }} />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.05, 0.09, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)",
            filter: "blur(90px)", bottom: -100, left: -100,
          }}
        />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.022 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      {/* Hero */}
      <HeroSection mouseXN={mouseXN} mouseYN={mouseYN} />

      <div className="works-wrap">

        {/* Stats */}
        <GlitchReveal>
          <SectionLabel>By the Numbers</SectionLabel>
        </GlitchReveal>
        <StatsRow />

        {/* Projects */}
        <GlitchReveal>
          <SectionLabel>Featured Projects</SectionLabel>
        </GlitchReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "12px 6%",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(6,6,10,0.88)", backdropFilter: "blur(20px)",
          zIndex: 10, flexWrap: "wrap", gap: 8,
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(9px, 1.5vw, 11px)", color: "rgba(255,255,255,0.2)" }}>
          © 2026 Fahim Mubasshir Sajid
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }}
          />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(9px, 1.5vw, 11px)", color: "rgba(255,255,255,0.2)" }}>
            open to opportunities
          </span>
        </div>
      </motion.div>
    </div>
  );
}