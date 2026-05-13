import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaRss, FaBookOpen, FaClock, FaTag } from "react-icons/fa";

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
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <div style={{ width: 28, height: 1, background: "#14B8A6", opacity: 0.5, flexShrink: 0 }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

/* ─── Planned topic card ─── */
const PLANNED_TOPICS = [
  { icon: FaBookOpen, label: "Deep Dives",     desc: "In-depth explorations of frameworks, tools, and concepts I'm actively learning.", color: "#14B8A6", tag: "technical" },
  { icon: FaClock,    label: "Dev Diaries",    desc: "Behind-the-scenes look at projects — decisions made, mistakes learned, lessons kept.", color: "#A78BFA", tag: "process"   },
  { icon: FaTag,      label: "Quick Notes",    desc: "Short-form thoughts, tips, and discoveries that don't need a full essay.", color: "#F78C6C", tag: "misc"      },
  { icon: FaRss,      label: "Opinion Pieces", desc: "Takes on design trends, developer culture, and things I find genuinely interesting.", color: "#4ADE80", tag: "opinion"   },
];

function TopicCard({ icon: Icon, label, desc, color, tag, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      data-hover
      style={{
        padding: "26px 24px", borderRadius: 12, position: "relative", overflow: "hidden",
        border: `1px solid ${hov ? color + "35" : "rgba(255,255,255,0.07)"}`,
        background: hov ? `${color}06` : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s, background 0.3s",
        cursor: "default",
      }}
    >
      {/* Glow blob */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", top: -40, right: -40,
          width: 120, height: 120, borderRadius: "50%",
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          filter: "blur(18px)", pointerEvents: "none",
        }}
      />
      {/* Tag pill */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "3px 9px", borderRadius: 4, marginBottom: 18,
        background: `${color}12`, border: `1px solid ${color}25`,
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color, letterSpacing: 2, textTransform: "uppercase" }}>{tag}</span>
      </div>
      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 10, marginBottom: 16,
        background: `${color}12`, border: `1px solid ${color}28`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={17} style={{ color }} />
      </div>
      <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.82)", marginBottom: 10, letterSpacing: "-0.3px" }}>{label}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.3)", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
    </motion.div>
  );
}

/* ─── Ghost / skeleton post card ─── */
function GhostCard({ delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: "26px 24px", borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.015)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Shimmer line decoration */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.04), transparent)",
          pointerEvents: "none",
        }}
      />
      {/* Tag placeholder */}
      <div style={{ width: 52, height: 14, borderRadius: 3, background: "rgba(255,255,255,0.05)", marginBottom: 18 }} />
      {/* Title placeholder lines */}
      <div style={{ width: "80%", height: 14, borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 10 }} />
      <div style={{ width: "60%", height: 14, borderRadius: 3, background: "rgba(255,255,255,0.04)", marginBottom: 20 }} />
      {/* Body lines */}
      {[100, 88, 74].map((w, i) => (
        <div key={i} style={{ width: `${w}%`, height: 10, borderRadius: 3, background: "rgba(255,255,255,0.03)", marginBottom: 8 }} />
      ))}
      {/* Footer */}
      <div style={{ display: "flex", gap: 10, marginTop: 22, alignItems: "center" }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ width: 80, height: 10, borderRadius: 3, background: "rgba(255,255,255,0.04)" }} />
        <div style={{ marginLeft: "auto", width: 50, height: 10, borderRadius: 3, background: "rgba(255,255,255,0.04)" }} />
      </div>
      {/* "Coming soon" badge */}
      <div style={{
        position: "absolute", top: 18, right: 18,
        padding: "3px 9px", borderRadius: 4,
        background: "rgba(20,184,166,0.07)", border: "1px solid rgba(20,184,166,0.15)",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(20,184,166,0.55)", letterSpacing: 1.5, textTransform: "uppercase" }}>soon</span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════
   Main Journal Page
════════════════════════════ */
export default function Journal() {
  const mouseXN = useMotionValue(0.5);
  const mouseYN = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mouseXN, [0, 1], [-50, 50]), { stiffness: 40, damping: 18 });
  const glowY = useSpring(useTransform(mouseYN, [0, 1], [-50, 50]), { stiffness: 40, damping: 18 });
  const tiltX = useSpring(useTransform(mouseYN, [0, 1], [5, -5]), { stiffness: 50, damping: 18 });
  const tiltY = useSpring(useTransform(mouseXN, [0, 1], [-5, 5]), { stiffness: 50, damping: 18 });

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
        input::placeholder { color: rgba(255,255,255,0.18); font-family: 'DM Sans', sans-serif; }
        input { caret-color: #14B8A6; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #06060A; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.3); border-radius: 2px; }
        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px; }
        .scanlines { position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px); }

        .topics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .ghost-grid  { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }

        @media (max-width: 1060px) { .topics-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 960px)  { .ghost-grid  { grid-template-columns: 1fr; } }
        @media (max-width: 640px)  {
          .topics-grid { grid-template-columns: 1fr; }
          .ghost-grid  { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="noise" />
      <div className="scanlines" />
      <CursorDot />
      <CursorSpotlight />

      {/* ── Animated background ── */}
      <motion.div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}>
        <motion.div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 65%)",
          filter: "blur(80px)", top: -150, left: -200, x: glowX, y: glowY,
        }} />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
            filter: "blur(90px)", bottom: 50, right: -100,
          }}
        />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.028 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </motion.div>

      {/* ── Page Content ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 6% 100px", position: "relative", zIndex: 2 }}>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 80 }}
        >
          {/* Breadcrumb chip */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "7px 14px", borderRadius: 6, marginBottom: 22,
            border: "1px solid rgba(20,184,166,0.18)", background: "rgba(20,184,166,0.05)",
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6" }}>~/journal</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.22)" }}>--thoughts-in-progress</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              style={{ color: "#14B8A6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}
            >▋</motion.span>
          </div>

          <h1 style={{ fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 700, letterSpacing: "-3px", lineHeight: 0.94, marginBottom: 18 }}>
            The <span style={{ color: "#14B8A6" }}>Journal</span>
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15.5px)", color: "rgba(255,255,255,0.38)", lineHeight: 1.9, maxWidth: 540, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginBottom: 32 }}>
            A space for writing I actually mean — technical deep dives, dev diaries,
            and the occasional opinion I couldn't keep to myself. Nothing here yet,
            but it's coming.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { value: "0",    label: "posts published" },
              { value: "∞",   label: "drafts in my head" },
              { value: "soon", label: "ETA" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 28, fontWeight: 700, color: "#14B8A6", letterSpacing: "-1px", lineHeight: 1 }}>{value}</p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 5 }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 01 What's coming ── */}
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>01 / what's coming</SectionLabel>
          <div className="topics-grid">
            {PLANNED_TOPICS.map((t, i) => <TopicCard key={t.label} {...t} index={i} />)}
          </div>
        </div>

        {/* ── 02 Ghost posts ── */}
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>02 / reserved space</SectionLabel>
          <div className="ghost-grid">
            <GhostCard delay={0.1} />
            <GhostCard delay={0.2} />
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "11px 6%", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(6,6,10,0.78)", backdropFilter: "blur(20px)", zIndex: 10,
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>© 2026 Fahim Mubasshir Sajid</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>writing soon</span>
        </div>
      </motion.div>
    </div>
  );
}