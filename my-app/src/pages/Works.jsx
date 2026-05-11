import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiRedux, SiSocketdotio, SiJsonwebtokens, SiTailwindcss, SiStripe, SiCloudinary } from "react-icons/si";

/* ─── Cursor spotlight ─── */
function CursorSpotlight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
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
      width: 550, height: 550, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(20,184,166,0.065) 0%, transparent 70%)",
      translateX: "-50%", translateY: "-50%",
      left: sx, top: sy,
    }} />
  );
}

/* ─── Custom cursor ─── */
function CursorDot() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
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
      translateX: "-50%", translateY: "-50%",
      left: sx, top: sy,
      transition: "width 0.25s, height 0.25s, background 0.25s, border 0.25s",
    }} />
  );
}

/* ─── Tech icon map ─── */
const TECH_MAP = {
  MongoDB:    { icon: SiMongodb,       color: "#4DB33D" },
  Express:    { icon: SiExpress,       color: "#aaa" },
  React:      { icon: SiReact,         color: "#61DAFB" },
  "Node.js":  { icon: SiNodedotjs,     color: "#8CC84B" },
  Redux:      { icon: SiRedux,         color: "#764ABC" },
  "Socket.io":{ icon: SiSocketdotio,   color: "#fff" },
  JWT:        { icon: SiJsonwebtokens, color: "#d63aff" },
  Tailwind:   { icon: SiTailwindcss,   color: "#38BDF8" },
  Stripe:     { icon: SiStripe,        color: "#635BFF" },
  Cloudinary: { icon: SiCloudinary,    color: "#3448C5" },
};

/* ─── Project data ─── */
const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "DevCollab",
    subtitle: "Real-time Collaboration Platform",
    desc: "A full-stack workspace for dev teams — live document editing, task boards, and integrated chat built on WebSockets. JWT auth with role-based access control.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "JWT", "Redux"],
    status: "Live",
    year: "2024",
    category: "Full Stack",
    metrics: [["12k","Users"], ["99.9%","Uptime"], ["<80ms","Latency"]],
    accent: "#14B8A6",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    num: "02",
    title: "ShopForge",
    subtitle: "E-Commerce Engine",
    desc: "End-to-end e-commerce platform with Stripe payment integration, inventory management, order tracking, and an admin dashboard with real-time analytics.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Stripe", "Cloudinary", "Tailwind"],
    status: "Live",
    year: "2024",
    category: "Full Stack",
    metrics: [["$50k","GMV"], ["3.2s","Avg Load"], ["98%","Uptime"]],
    accent: "#FB923C",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 3,
    num: "03",
    title: "AuthVault",
    subtitle: "Auth Microservice",
    desc: "Production-grade authentication microservice with OAuth2, MFA, session management, and a developer-facing SDK. Built as a standalone Node.js service.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Redux"],
    status: "Open Source",
    year: "2023",
    category: "Backend",
    metrics: [["5k","GitHub ★"], ["40+","Integrations"], ["0","Known CVEs"]],
    accent: "#A78BFA",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: 4,
    num: "04",
    title: "FeedPulse",
    subtitle: "Social Feed API",
    desc: "High-throughput REST + GraphQL API powering a social feed with algorithmic ranking, media uploads, and nested comment trees. Handles 1M+ requests/day.",
    tech: ["Node.js", "MongoDB", "Express", "Cloudinary", "JWT"],
    status: "Live",
    year: "2023",
    category: "Backend",
    metrics: [["1M+","Req/day"], ["22ms","P95"], ["4","Services"]],
    accent: "#F472B6",
    github: "#",
    live: null,
    featured: false,
  },
  {
    id: 5,
    num: "05",
    title: "TaskFlow",
    subtitle: "Project Management App",
    desc: "Kanban-style project manager with drag-and-drop, time tracking, team workspaces, and email notifications. Optimistic UI updates powered by React Query.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "Tailwind"],
    status: "Live",
    year: "2024",
    category: "Full Stack",
    metrics: [["8k","Active Users"], ["200ms","Avg RT"], ["98%","Satisfaction"]],
    accent: "#34D399",
    github: "#",
    live: "#",
    featured: false,
  },
];

/* ─── Tech pill ─── */
function TechPill({ name }) {
  const [hov, setHov] = useState(false);
  const info = TECH_MAP[name];
  if (!info) return null;
  const { icon: Icon, color } = info;
  return (
    <motion.div
      data-hover
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.08, y: -1 }}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: "4px 10px", borderRadius: 5,
        border: `1px solid ${hov ? color + "50" : "rgba(255,255,255,0.07)"}`,
        background: hov ? color + "12" : "rgba(255,255,255,0.03)",
        cursor: "none", transition: "border-color 0.25s, background 0.25s",
      }}
    >
      <Icon size={11} style={{ color: hov ? color : "rgba(255,255,255,0.3)", transition: "color 0.25s" }} />
      <span style={{ fontSize: 10.5, fontFamily: "'DM Mono', monospace", color: hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)", transition: "color 0.25s" }}>
        {name}
      </span>
    </motion.div>
  );
}

/* ─── Status badge ─── */
function StatusBadge({ status }) {
  const map = { "Live": "#4ADE80", "Open Source": "#60A5FA", "WIP": "#FBBF24" };
  const color = map[status] || "#aaa";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 10px", borderRadius: 4,
      border: `1px solid ${color}30`, background: color + "10",
    }}>
      <motion.div
        animate={{ scale: [1,1.5,1], opacity: [1,0.5,1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ width: 5, height: 5, borderRadius: "50%", background: color }}
      />
      <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color, letterSpacing: 1 }}>{status}</span>
    </div>
  );
}

/* ─── Featured project card (large) ─── */
function FeaturedCard({ project, index }) {
  const [hov, setHov] = useState(false);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotX = useSpring(useTransform(cardY, [-80, 80], [4, -4]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(cardX, [-200, 200], [-4, 4]), { stiffness: 200, damping: 20 });
  const glowX = useSpring(useTransform(cardX, [-200, 200], [20, 80]), { stiffness: 150, damping: 20 });
  const glowY = useSpring(useTransform(cardY, [-80, 80], [20, 80]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardX.set(e.clientX - rect.left - rect.width / 2);
    cardY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { cardX.set(0); cardY.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.5 + index * 0.18, duration: 0.8, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-hover
      style={{
        rotateX: rotX, rotateY: rotY,
        transformPerspective: 1000, transformStyle: "preserve-3d",
        position: "relative", borderRadius: 16,
        border: `1px solid ${hov ? project.accent + "35" : "rgba(255,255,255,0.07)"}`,
        background: "rgba(12,12,18,0.7)", backdropFilter: "blur(20px)",
        padding: "36px 40px", cursor: "none",
        transition: "border-color 0.35s",
        overflow: "hidden",
      }}
    >
      {/* Hover glow */}
      <AnimatePresence>
        {hov && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "absolute", width: 300, height: 300, borderRadius: "50%",
              background: `radial-gradient(circle, ${project.accent}18 0%, transparent 70%)`,
              filter: "blur(40px)", pointerEvents: "none",
              x: glowX, y: glowY, translateX: "-50%", translateY: "-50%",
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: project.accent, letterSpacing: 2 }}>
              {project.num}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 2, textTransform: "uppercase" }}>
              {project.category}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <motion.a
              href={project.github} className="icon-btn" data-hover
              whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.96 }}
              style={{
                width: 34, height: 34, borderRadius: 7, border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.35)", textDecoration: "none",
                transition: "border-color 0.25s, color 0.25s, background 0.25s",
                cursor: "none",
              }}
            >
              <FaGithub size={14} />
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live} className="icon-btn" data-hover
                whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.96 }}
                style={{
                  width: 34, height: 34, borderRadius: 7,
                  border: `1px solid ${project.accent}40`,
                  background: project.accent + "10",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: project.accent, textDecoration: "none",
                  transition: "border-color 0.25s, color 0.25s, background 0.25s",
                  cursor: "none",
                }}
              >
                <FaExternalLinkAlt size={12} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 10 }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-1.5px",
            lineHeight: 1, marginBottom: 6,
            background: `linear-gradient(135deg, #fff 40%, ${project.accent}90 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>{project.title}</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>
            {project.subtitle}
          </p>
        </div>

        <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 14.5, lineHeight: 1.85, marginBottom: 28, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, maxWidth: 560 }}>
          {project.desc}
        </p>

        {/* Metrics */}
        <div style={{ display: "flex", gap: 24, marginBottom: 26, flexWrap: "wrap" }}>
          {project.metrics.map(([val, lab]) => (
            <div key={lab}>
              <div style={{ fontSize: 20, fontWeight: 700, color: project.accent, letterSpacing: -0.5, fontFamily: "'Clash Display', sans-serif" }}>{val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>{lab}</div>
            </div>
          ))}
        </div>

        {/* Tech pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {project.tech.map((t) => <TechPill key={t} name={t} />)}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Regular project row ─── */
function ProjectRow({ project, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ delay: 1.0 + index * 0.12, duration: 0.65, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      data-hover
      style={{
        display: "flex", alignItems: "center",
        padding: "22px 28px", borderRadius: 10,
        border: `1px solid ${hov ? project.accent + "30" : "rgba(255,255,255,0.06)"}`,
        background: hov ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.015)",
        cursor: "none", transition: "border-color 0.3s, background 0.3s",
        flexWrap: "wrap", gap: 16,
      }}
    >
      {/* Number */}
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: project.accent, letterSpacing: 2, minWidth: 24 }}>
        {project.num}
      </span>

      {/* Title block */}
      <div style={{ flex: "1 1 160px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.5, color: hov ? "white" : "rgba(255,255,255,0.85)", transition: "color 0.25s" }}>
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: 0.5 }}>
          {project.subtitle}
        </p>
      </div>

      {/* Description */}
      <p style={{ flex: "2 1 200px", fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
        {project.desc}
      </p>

      {/* Pills */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", flex: "1 1 140px" }}>
        {project.tech.slice(0,4).map((t) => <TechPill key={t} name={t} />)}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <motion.a href={project.github} data-hover whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.96 }}
          style={{ width: 32, height: 32, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", textDecoration: "none", cursor: "none", transition: "border-color 0.25s, color 0.25s" }}>
          <FaGithub size={13} />
        </motion.a>
        {project.live && (
          <motion.a href={project.live} data-hover whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.96 }}
            style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${project.accent}35`, background: project.accent + "0D", display: "flex", alignItems: "center", justifyContent: "center", color: project.accent, textDecoration: "none", cursor: "none", transition: "all 0.25s" }}>
            <FaExternalLinkAlt size={11} />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Filter tab ─── */
function FilterTab({ label, active, onClick }) {
  return (
    <motion.button
      data-hover onClick={onClick}
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
      style={{
        padding: "7px 18px", borderRadius: 6, cursor: "none",
        border: active ? "1px solid rgba(20,184,166,0.35)" : "1px solid rgba(255,255,255,0.08)",
        background: active ? "rgba(20,184,166,0.1)" : "rgba(255,255,255,0.025)",
        color: active ? "#14B8A6" : "rgba(255,255,255,0.35)",
        fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: 0.5,
        transition: "all 0.25s",
      }}
    >{label}</motion.button>
  );
}

/* ─── Main ─── */
const FILTERS = ["All", "Full Stack", "Backend"];

export default function Works() {
  const [filter, setFilter] = useState("All");
  const mouseXN = useMotionValue(0.5);
  const mouseYN = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mouseXN, [0,1], [-60,60]), { stiffness: 40, damping: 18 });
  const glowY = useSpring(useTransform(mouseYN, [0,1], [-60,60]), { stiffness: 40, damping: 18 });
  const tiltX = useSpring(useTransform(mouseYN, [0,1], [4,-4]), { stiffness: 50, damping: 18 });
  const tiltY = useSpring(useTransform(mouseXN, [0,1], [-4,4]), { stiffness: 50, damping: 18 });

  useEffect(() => {
    const fn = (e) => { mouseXN.set(e.clientX / window.innerWidth); mouseYN.set(e.clientY / window.innerHeight); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mouseXN, mouseYN]);

  const featured = PROJECTS.filter(p => p.featured && (filter === "All" || p.category === filter));
  const regular  = PROJECTS.filter(p => !p.featured && (filter === "All" || p.category === filter));

  return (
    <div style={{ minHeight: "100vh", background: "#06060A", color: "white", fontFamily: "'Clash Display', sans-serif", position: "relative", overflow: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px; }
        .scanlines { position: fixed; inset: 0; pointer-events: none; z-index: 1; background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px); }
      `}</style>

      <div className="noise" />
      <div className="scanlines" />
      <CursorDot />
      <CursorSpotlight />

      {/* Background tilt layer */}
      <motion.div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400,
      }}>
        <motion.div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 65%)",
          filter: "blur(80px)", top: -250, left: -200,
          x: glowX, y: glowY,
        }} />
        <motion.div
          animate={{ scale: [1,1.2,1], opacity: [0.06,0.1,0.06] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", width: 550, height: 550, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)",
            filter: "blur(80px)", bottom: -150, right: -100,
          }}
        />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.028 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </motion.div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 6% 120px", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
          style={{ marginBottom: 60 }}
        >
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 14px", borderRadius: 6,
              border: "1px solid rgba(20,184,166,0.18)", background: "rgba(20,184,166,0.05)",
            }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>~/portfolio</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.15)" }}>/</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6" }}>works</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>
                Selected Works
              </p>
              <h1 style={{ fontSize: "clamp(40px, 7vw, 76px)", lineHeight: 0.95, fontWeight: 700, letterSpacing: "-2.5px" }}>
                Things I've
                <br />
                <span style={{ background: "linear-gradient(135deg, #14B8A6, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Built.
                </span>
              </h1>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, textAlign: "right", maxWidth: 280, lineHeight: 1.7 }}>
                {PROJECTS.length} projects shipping across full-stack and backend engineering.
              </p>
              {/* Filters */}
              <div style={{ display: "flex", gap: 8 }}>
                {FILTERS.map(f => (
                  <FilterTab key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22,1,0.36,1] }}
          style={{ height: 1, background: "linear-gradient(90deg, rgba(20,184,166,0.4), rgba(255,255,255,0.05), transparent)", marginBottom: 52 }}
        />

        {/* Featured grid */}
        <AnimatePresence mode="wait">
          {featured.length > 0 && (
            <motion.div key={`feat-${filter}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 20 }}>
                Featured Projects
              </motion.p>
              <div style={{
                display: "grid",
                gridTemplateColumns: featured.length === 1 ? "1fr" : "repeat(auto-fit, minmax(420px, 1fr))",
                gap: 20, marginBottom: 50,
              }}>
                {featured.map((p, i) => <FeaturedCard key={p.id} project={p} index={i} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular rows */}
        <AnimatePresence mode="wait">
          {regular.length > 0 && (
            <motion.div key={`reg-${filter}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>
                Other Projects
              </motion.p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {regular.map((p, i) => <ProjectRow key={p.id} project={p} index={i} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        <AnimatePresence>
          {featured.length === 0 && regular.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.2)" }}>
                {`// No projects found for "${filter}"`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "12px 6%", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(6,6,10,0.75)", backdropFilter: "blur(20px)", zIndex: 10,
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          © 2026 Fahim Mubasshir Sajid
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          {PROJECTS.filter(p => filter === "All" || p.category === filter).length} projects
        </span>
      </motion.div>
    </div>
  );
}