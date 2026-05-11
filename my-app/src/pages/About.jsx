import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaCode, FaServer, FaDatabase } from "react-icons/fa";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiTypescript, SiDocker, SiGit, SiRedux, SiPostman, SiFirebase, SiVercel } from "react-icons/si";

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
  }, []);
  return (
    <motion.div style={{
      position: "fixed", pointerEvents: "none", zIndex: 0,
      width: 550, height: 550, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)",
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
  }, []);
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

/* ─── Section label ─── */
function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
      <div style={{ width: 28, height: 1, background: "#14B8A6", opacity: 0.5, flexShrink: 0 }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

/* ─── Terminal about block ─── */
function TerminalAbout() {
  const lines = [
    { label: "name",         value: "Fahim Mubasshir Sajid",    color: "#C3E88D" },
    { label: "age",          value: "25",                        color: "#F78C6C" },
    { label: "location",     value: "Sylhet, Bangladesh",     color: "#C3E88D" },
    { label: "education",    value: "Computer Science & Eng.",   color: "#C3E88D" },
    { label: "experience",   value: "2+ Years",                  color: "#F78C6C" },
    { label: "specialty",    value: "MERN Stack Development",    color: "#C3E88D" },
    { label: "availability", value: "Open to Opportunities ✅",  color: "#4ADE80" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22,1,0.36,1] }}
      style={{
        background: "rgba(10,10,15,0.88)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12,
        padding: "18px 20px", fontFamily: "'DM Mono', monospace", fontSize: 12,
        lineHeight: 2, overflowX: "auto",
      }}
    >
      <div style={{ display: "flex", gap: 6, marginBottom: 16, alignItems: "center" }}>
        {["#FF5F57","#FFBD2E","#28CA41"].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0 }} />
        ))}
        <span style={{ marginLeft: 8, fontSize: 10, color: "rgba(255,255,255,0.2)" }}>about.json</span>
      </div>
      <div style={{ color: "#89DDFF" }}>{"{"}</div>
      {lines.map(({ label, value, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + i * 0.08 }}
          style={{ paddingLeft: 16, display: "flex", gap: 6, flexWrap: "wrap" }}
        >
          <span style={{ color: "#82AAFF" }}>"{label}"</span>
          <span style={{ color: "#89DDFF" }}>:</span>
          <span style={{ color }}>" {value}"</span>
          {i < lines.length - 1 && <span style={{ color: "#89DDFF" }}>,</span>}
        </motion.div>
      ))}
      <div style={{ color: "#89DDFF" }}>{"}"}</div>
    </motion.div>
  );
}

/* ─── Avatar ─── */
function AvatarBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.22,1,0.36,1] }}
      style={{ position: "relative", width: 180, height: 180, margin: "0 auto 28px" }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", inset: -10, borderRadius: "50%", border: "1.5px dashed rgba(20,184,166,0.25)" }}
      />
      {[1, 0.5].map((o, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.08, 1], opacity: [o * 0.3, 0, o * 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1.2 }}
          style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1px solid rgba(20,184,166,0.35)" }}
        />
      ))}
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(20,184,166,0.04) 100%)",
        border: "1.5px solid rgba(20,184,166,0.22)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 56, userSelect: "none",
      }}>
        👨‍💻
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        style={{
          position: "absolute", bottom: 6, right: 0,
          background: "rgba(6,6,10,0.9)", border: "1px solid rgba(74,222,128,0.3)",
          borderRadius: 20, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6,
        }}
      >
        <motion.div
          animate={{ scale: [1,1.5,1], opacity: [1,0.4,1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }}
        />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#4ADE80" }}>Available</span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Skills ─── */
const SKILLS = [
  {
    icon: FaCode, label: "Frontend", color: "#61DAFB",
    items: [
      { icon: SiReact,      name: "React.js",     level: 92, color: "#61DAFB" },
      { icon: SiTypescript, name: "TypeScript",   level: 78, color: "#3178C6" },
      { icon: SiRedux,      name: "Redux",        level: 80, color: "#764ABC" },
      { icon: SiTailwindcss,name: "Tailwind CSS", level: 90, color: "#06B6D4" },
    ],
  },
  {
    icon: FaServer, label: "Backend", color: "#8CC84B",
    items: [
      { icon: SiNodedotjs, name: "Node.js",    level: 88, color: "#8CC84B" },
      { icon: SiExpress,   name: "Express.js", level: 85, color: "#aaaaaa" },
      { icon: SiFirebase,  name: "Firebase",   level: 72, color: "#FFCA28" },
      { icon: SiPostman,   name: "REST APIs",  level: 90, color: "#FF6C37" },
    ],
  },
  {
    icon: FaDatabase, label: "Database & DevOps", color: "#4DB33D",
    items: [
      { icon: SiMongodb, name: "MongoDB",    level: 85, color: "#4DB33D" },
      { icon: SiDocker,  name: "Docker",     level: 60, color: "#2496ED" },
      { icon: SiGit,     name: "Git/GitHub", level: 88, color: "#F05032" },
      { icon: SiVercel,  name: "Vercel",     level: 82, color: "#ffffff" },
    ],
  },
];

function SkillBar({ name, level, color, icon: Icon, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      data-hover style={{ marginBottom: 14, cursor: "default" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Icon size={12} style={{ color: hov ? color : "rgba(255,255,255,0.3)", transition: "color 0.3s", flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11.5, color: hov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)", transition: "color 0.3s" }}>{name}</span>
        </div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: hov ? color : "rgba(255,255,255,0.25)", transition: "color 0.3s", flexShrink: 0 }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay: 0.3 + 0.1 * index, duration: 0.9, ease: [0.22,1,0.36,1] }}
          style={{
            height: "100%", borderRadius: 2,
            background: hov ? `linear-gradient(90deg, ${color}aa, ${color})` : "linear-gradient(90deg, rgba(20,184,166,0.4), rgba(20,184,166,0.7))",
            transition: "background 0.3s",
          }}
        />
      </div>
    </motion.div>
  );
}

function SkillCategory({ icon: Icon, label, color, items, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22,1,0.36,1] }}
      style={{
        padding: "22px 24px", borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 7, flexShrink: 0,
          background: `${color}12`, border: `1px solid ${color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={13} style={{ color }} />
        </div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>{label}</span>
      </div>
      {items.map((skill, i) => <SkillBar key={skill.name} {...skill} index={i} />)}
    </motion.div>
  );
}

/* ─── Values ─── */
const VALUES = [
  { icon: "🎯", title: "Clean Code",        desc: "I believe great code reads like prose — clear, purposeful, and maintainable." },
  { icon: "⚡", title: "Performance First", desc: "Every millisecond counts. I optimize for speed without sacrificing readability." },
  { icon: "🧩", title: "Problem Solver",    desc: "Complex problems broken into elegant, scalable solutions is what drives me." },
  { icon: "📚", title: "Lifelong Learner",  desc: "The tech landscape evolves fast — I stay ahead through constant learning." },
];

function ValueCard({ icon, title, desc, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 * index, duration: 0.6, ease: [0.22,1,0.36,1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -3 }}
      data-hover
      style={{
        padding: "18px 20px", borderRadius: 10, cursor: "default",
        border: `1px solid ${hov ? "rgba(20,184,166,0.2)" : "rgba(255,255,255,0.06)"}`,
        background: hov ? "rgba(20,184,166,0.04)" : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
      <h4 style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 7, fontFamily: "'Clash Display', sans-serif", letterSpacing: "-0.2px" }}>{title}</h4>
      <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.3)", lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{desc}</p>
    </motion.div>
  );
}

/* ════════════════════════════
   Main About Page
════════════════════════════ */
export default function About() {
  const navigate = useNavigate(); // ← navigation hook

  const mouseXN = useMotionValue(0.5);
  const mouseYN = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mouseXN, [0,1], [-50,50]), { stiffness: 40, damping: 18 });
  const glowY = useSpring(useTransform(mouseYN, [0,1], [-50,50]), { stiffness: 40, damping: 18 });
  const tiltX = useSpring(useTransform(mouseYN, [0,1], [5,-5]), { stiffness: 50, damping: 18 });
  const tiltY = useSpring(useTransform(mouseXN, [0,1], [-5,5]), { stiffness: 50, damping: 18 });

  useEffect(() => {
    const fn = (e) => {
      mouseXN.set(e.clientX / window.innerWidth);
      mouseYN.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#06060A", color: "white", fontFamily: "'Clash Display', sans-serif", position: "relative", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .btn-primary {
          padding: 13px 24px; border-radius: 7px; border: none;
          background: #14B8A6; color: #06060A;
          font-size: 12.5px; font-weight: 600; letter-spacing: 0.5px;
          cursor: none; font-family: 'DM Mono', monospace;
          position: relative; overflow: hidden; transition: background 0.3s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-primary:hover { background: #0D9488; }

        .btn-outline {
          padding: 12px 24px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.1); background: transparent;
          color: rgba(255,255,255,0.55); font-size: 12.5px; font-weight: 500;
          cursor: none; font-family: 'DM Mono', monospace; letter-spacing: 0.5px;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
        }
        .btn-outline:hover { border-color: rgba(20,184,166,0.4); color: #14B8A6; background: rgba(20,184,166,0.05); }

        .soc { width: 37px; height: 37px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); text-decoration: none; transition: border-color 0.3s, color 0.3s, background 0.3s; cursor: none; flex-shrink: 0; }
        .soc:hover { border-color: rgba(20,184,166,0.35); color: #14B8A6; background: rgba(20,184,166,0.06); }

        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px; }
        .scanlines { position: fixed; inset: 0; pointer-events: none; z-index: 1; background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #06060A; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.3); border-radius: 2px; }

        .identity-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 48px;
          margin-bottom: 96px;
          align-items: start;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .cta-row {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        .cta-row button { flex: 1; min-width: 120px; }

        .soc-row {
          display: flex;
          gap: 8px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 960px) {
          .identity-grid { grid-template-columns: 1fr; gap: 40px; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px) {
          .identity-grid { gap: 32px; margin-bottom: 64px; }
          .skills-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 400px) {
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="noise" />
      <div className="scanlines" />
      <CursorDot />
      <CursorSpotlight />

      {/* ── Animated background ── */}
      <motion.div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400,
      }}>
        <motion.div style={{
          position: "absolute", width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 65%)",
          filter: "blur(80px)", top: -200, right: -200,
          x: glowX, y: glowY,
        }} />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(130,170,255,0.07) 0%, transparent 70%)",
            filter: "blur(90px)", bottom: 100, left: -100,
          }}
        />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.028 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </motion.div>

      {/* ── Page content ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "110px 6% 100px", position: "relative", zIndex: 2 }}>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          style={{ marginBottom: 72 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "7px 14px", borderRadius: 6, marginBottom: 24,
            border: "1px solid rgba(20,184,166,0.18)", background: "rgba(20,184,166,0.05)",
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6" }}>~/about</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.22)" }}>--me</span>
            <motion.span animate={{ opacity: [1,0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              style={{ color: "#14B8A6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>▋</motion.span>
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 78px)", fontWeight: 700, letterSpacing: "-3px", lineHeight: 0.94, marginBottom: 18 }}>
            About <span style={{ color: "#14B8A6" }}>Me</span>
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15.5px)", color: "rgba(255,255,255,0.38)", lineHeight: 1.9, maxWidth: 560, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            A passionate MERN stack developer from Bangladesh — turning ideas into
            production-grade digital experiences with clean code and sharp design.
          </p>
        </motion.div>

        {/* ── Section 01: Identity ── */}
        <div className="identity-grid">

          {/* Left column: avatar + terminal + CTAs */}
          <div>
            <AvatarBlock />
            <TerminalAbout />

            {/* ── CTA Buttons — now wired up ── */}
            <div className="cta-row">
              <motion.button
                className="btn-primary" data-hover
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/resume")}
              >
                <FaDownload size={11} /> resume.pdf
              </motion.button>
              <motion.button
                className="btn-outline" data-hover
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/contact")}
              >
                contact.me()
              </motion.button>
            </div>


          </div>

          {/* Right column: bio + values */}
          <div>
            <SectionLabel>01 / who am i</SectionLabel>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22,1,0.36,1] }}
            >
              <p style={{ fontSize: "clamp(13.5px, 1.6vw, 15.5px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.95, marginBottom: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                I'm <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>Fahim Mubasshir Sajid</span>, a full-stack developer specializing in the <span style={{ color: "#14B8A6" }}>MERN stack</span>. I love bridging the gap between beautiful UI and powerful backend systems, building applications that are not just functional — but genuinely delightful to use.
              </p>
              <p style={{ fontSize: "clamp(13.5px, 1.6vw, 15.5px)", color: "rgba(255,255,255,0.38)", lineHeight: 1.95, marginBottom: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                With 2+ years of hands-on experience, I've shipped production apps ranging from real-time dashboards and e-commerce platforms to REST APIs powering mobile clients. I write code that's clean, tested, and built to scale.
              </p>
              <p style={{ fontSize: "clamp(13.5px, 1.6vw, 15.5px)", color: "rgba(255,255,255,0.38)", lineHeight: 1.95, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                When I'm not coding, I'm exploring new technologies, contributing to open-source, or diving deep into system design concepts that make software more robust and resilient.
              </p>

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "28px 0" }} />

              <div className="values-grid">
                {VALUES.map((v, i) => <ValueCard key={v.title} {...v} index={i} />)}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Section 02: Skills ── */}
        <div style={{ marginBottom: 80 }}>
          <SectionLabel>02 / skills & stack</SectionLabel>
          <div className="skills-grid">
            {SKILLS.map((cat, i) => (
              <SkillCategory key={cat.label} {...cat} delay={0.1 + i * 0.15} />
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "12px 6%", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(6,6,10,0.75)", backdropFilter: "blur(20px)", zIndex: 10,
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>© 2026 Fahim Mubasshir Sajid</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.div animate={{ scale: [1,1.5,1], opacity: [1,0.4,1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>open to opportunities</span>
        </div>
      </motion.div>
    </div>
  );
}