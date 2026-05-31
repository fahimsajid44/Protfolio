import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCopy, FaCheck, FaExternalLinkAlt } from "react-icons/fa";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

/* ─── Info card ─── */
function InfoCard({ icon: Icon, label, value, href, color = "#14B8A6", delay }) {
  const [copied, setCopied] = useState(false);
  const [hov, setHov] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        padding: "20px", borderRadius: 12,
        border: `1px solid ${hov ? color + "35" : "rgba(255,255,255,0.07)"}`,
        background: hov ? `${color}06` : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 9, flexShrink: 0,
          background: `${color}12`, border: `1px solid ${color}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={15} style={{ color }} />
        </div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: 2, textTransform: "uppercase" }}>{label}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" data-hover style={{
            fontFamily: "'DM Mono', monospace", fontSize: 12.5,
            color: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
            textDecoration: "none", transition: "color 0.3s", cursor: "none",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, minWidth: 0,
          }}>{value}</a>
        ) : (
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: 12.5,
            color: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
            transition: "color 0.3s", overflow: "hidden", textOverflow: "ellipsis",
            whiteSpace: "nowrap", flex: 1, minWidth: 0, margin: 0,
          }}>{value}</p>
        )}
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <motion.button
            data-hover whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={handleCopy} title="Copy"
            style={{
              width: 30, height: 30, borderRadius: 6,
              border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.08)"}`,
              background: copied ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.03)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "none", transition: "all 0.3s",
            }}
          >
            {copied ? <FaCheck size={9} style={{ color: "#4ADE80" }} /> : <FaCopy size={9} style={{ color: "rgba(255,255,255,0.3)" }} />}
          </motion.button>
          {href && (
            <motion.a href={href} target="_blank" rel="noreferrer" data-hover
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} title="Open"
              style={{
                width: 30, height: 30, borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "none", textDecoration: "none", transition: "all 0.3s",
              }}
            >
              <FaExternalLinkAlt size={8} style={{ color: "rgba(255,255,255,0.3)" }} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Socials data ─── */
const SOCIALS = [
  { icon: FaGithub,    label: "GitHub",    handle: "@fahimsajid44",         url: "https://github.com/fahimsajid44",                      desc: "Open-source projects & contributions",  color: "#e0e0e0" },
  { icon: FaLinkedin,  label: "LinkedIn",  handle: "Fahim Mubasshir Sajid", url: "https://www.linkedin.com/in/fahim-mubasshir-sajid",     desc: "Professional network & career updates", color: "#0A66C2" },
  { icon: FaInstagram, label: "Instagram", handle: "@fahim_sajid404",       url: "https://www.instagram.com/fahim_sajid404/",             desc: "Behind-the-scenes & dev life",          color: "#E1306C" },
];

/* ─── Social card ─── */
function SocialCard({ icon: Icon, label, handle, url, desc, color, index }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={url} target="_blank" rel="noreferrer" data-hover
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -4 }}
      style={{
        display: "block", textDecoration: "none", cursor: "none",
        padding: "24px 22px", borderRadius: 12,
        border: `1px solid ${hov ? color + "40" : "rgba(255,255,255,0.07)"}`,
        background: hov ? `${color}08` : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s, background 0.3s",
        position: "relative", overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", top: -50, right: -50,
          width: 140, height: 140, borderRadius: "50%",
          background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
          filter: "blur(20px)", pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: hov ? 1.08 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          width: 48, height: 48, borderRadius: 11, marginBottom: 16,
          background: `${color}12`, border: `1px solid ${color}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <Icon size={20} style={{ color: hov ? color : `${color}88`, transition: "color 0.3s" }} />
      </motion.div>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>{label}</p>
      <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 14.5, fontWeight: 600, color: hov ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.65)", marginBottom: 6, letterSpacing: "-0.2px", transition: "color 0.3s" }}>{handle}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.26)", lineHeight: 1.6, fontWeight: 300 }}>{desc}</p>
      <motion.div
        animate={{ x: hov ? 0 : -6, opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", top: 24, right: 22, color }}
      >
        <FaExternalLinkAlt size={10} />
      </motion.div>
    </motion.a>
  );
}

/* ─── Availability section ─── */
function AvailabilitySection() {
  return (
    <div className="availability-grid">
      {/* Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: "28px", borderRadius: 12, border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.04)" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 9, height: 9, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#4ADE80", letterSpacing: 1.5, textTransform: "uppercase" }}>Open to Opportunities</span>
        </div>
        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.85, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
          Available for freelance projects, full-time positions, and collaborative work. Let's build something great together.
        </p>
      </motion.div>

      {/* Response time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: "28px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
      >
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Response Time</p>
        {[
          { type: "Email",     time: "< 24 hours", bar: 0.9, color: "#14B8A6" },
          { type: "LinkedIn",  time: "< 48 hours", bar: 0.7, color: "#0A66C2" },
          { type: "Instagram", time: "< 3 days",   bar: 0.5, color: "#E1306C" },
        ].map(({ type, time, bar, color }, i) => (
          <div key={type} style={{ marginBottom: i < 2 ? 16 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{type}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color }}>~{time}</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${bar * 100}%` }}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: "100%", borderRadius: 2, background: color, opacity: 0.75 }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Timezone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: "28px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
      >
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Timezone</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 34, fontWeight: 700, color: "#14B8A6", letterSpacing: "-1px" }}>GMT+6</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.22)" }}>Bangladesh Standard Time</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.28)", fontWeight: 300, lineHeight: 1.6 }}>Best time to reach: 10:00 AM – 8:00 PM BST</p>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════
   Main Contact Page
════════════════════════════ */
export default function Contact() {
  const mouseXN = useMotionValue(0.5);
  const mouseYN = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mouseXN, [0, 1], [-50, 50]), { stiffness: 40, damping: 18 });
  const glowY = useSpring(useTransform(mouseYN, [0, 1], [-50, 50]), { stiffness: 40, damping: 18 });
  const tiltX = useSpring(useTransform(mouseYN, [0, 1], [5, -5]), { stiffness: 50, damping: 18 });
  const tiltY = useSpring(useTransform(mouseXN, [0, 1], [-5, 5]), { stiffness: 50, damping: 18 });

  useEffect(() => {
    const fn = (e) => { mouseXN.set(e.clientX / window.innerWidth); mouseYN.set(e.clientY / window.innerHeight); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#06060A", color: "white", fontFamily: "'Clash Display', sans-serif", position: "relative", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #06060A; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.3); border-radius: 2px; }
        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px; }
        .scanlines { position: fixed; inset: 0; pointer-events: none; z-index: 1; background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px); }

        .info-grid         { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .social-grid       { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .availability-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

        @media (max-width: 960px) {
          .info-grid         { grid-template-columns: 1fr 1fr; }
          .social-grid       { grid-template-columns: 1fr 1fr; }
          .availability-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .info-grid         { grid-template-columns: 1fr; }
          .social-grid       { grid-template-columns: 1fr; }
          .availability-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="noise" />
      <div className="scanlines" />
      <CursorDot />
      <CursorSpotlight />

      {/* ── Background ── */}
      <motion.div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}>
        <motion.div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 65%)", filter: "blur(80px)", top: -150, left: -200, x: glowX, y: glowY }} />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(225,48,108,0.06) 0%, transparent 70%)", filter: "blur(90px)", bottom: 50, right: -100 }}
        />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.028 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </motion.div>

      {/* ── Page content ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 6% 90px", position: "relative", zIndex: 2 }}>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "7px 14px", borderRadius: 6, marginBottom: 22,
            border: "1px solid rgba(20,184,166,0.18)", background: "rgba(20,184,166,0.05)",
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6" }}>~/contact</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.22)" }}>--reach-out</span>
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} style={{ color: "#14B8A6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>▋</motion.span>
          </div>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 700, letterSpacing: "0px", lineHeight: 0.94, marginBottom: 18 }}>
            Let's <span style={{ color: "#14B8A6" }}>Connect</span>
          </h1>
          <p style={{ fontSize: "clamp(13px, 1.8vw, 15.5px)", color: "rgba(255,255,255,0.38)", lineHeight: 1.9, maxWidth: 520, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Whether you have a project in mind, a job opportunity, or just want to say hello —
            my inbox is always open. I typically respond within 24 hours.
          </p>
        </motion.div>

        {/* 01 Direct contact */}
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>01 / direct contact</SectionLabel>
          <div className="info-grid">
            <InfoCard icon={FaEnvelope}     label="Email"            value="fahim.mubasshir.sajid@gmail.com" href="mailto:fahim.mubasshir.sajid@gmail.com" color="#14B8A6" delay={0.1} />
            <InfoCard icon={FaPhone}        label="Phone / WhatsApp" value="+880 1731-047260"                                                               color="#4ADE80" delay={0.2} />
            <InfoCard icon={FaMapMarkerAlt} label="Location"         value="Sylhet, Bangladesh"                                                             color="#F78C6C" delay={0.3} />
          </div>
        </div>

        {/* 02 Social profiles */}
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>02 / social profiles</SectionLabel>
          <div className="social-grid">
            {SOCIALS.map((s, i) => <SocialCard key={s.label} {...s} index={i} />)}
          </div>
        </div>

        {/* 03 Availability */}
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>03 / availability</SectionLabel>
          <AvailabilitySection />
        </div>

      </div>

      {/* Bottom bar */}
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
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>open to opportunities</span>
        </div>
      </motion.div>
    </div>
  );
}