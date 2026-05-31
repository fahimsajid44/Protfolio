// Resume.jsx — Full-Stack CV Page with working PDF download (jsPDF)
// npm install jspdf  (jsPDF is already available via CDN in most setups)
// If using Vite/CRA: npm install jspdf

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload, FaArrowLeft, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaGithub, FaLinkedin, FaHeart,
} from "react-icons/fa";
import {
  SiReact, SiNodedotjs, SiMongodb, SiTailwindcss,
  SiMysql, SiGit, SiExpress, SiFirebase, SiAndroid,
  SiPython, SiPhp,
} from "react-icons/si";

/* ─── PDF GENERATOR ─── */
async function generateAndDownloadPDF() {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const W = 210;
  const TEAL = [20, 184, 166];
  const DARK = [6, 6, 10];
  const WHITE = [255, 255, 255];
  const GRAY = [160, 160, 165];
  const DIMGRAY = [100, 100, 108];

  let y = 0;

  /* helpers */
  const rgb = (r, g, b) => doc.setTextColor(r, g, b);
  const fill = (r, g, b) => doc.setFillColor(r, g, b);
  const draw = (r, g, b) => doc.setDrawColor(r, g, b);
  const font = (style = "normal", size = 10) => { doc.setFont("helvetica", style); doc.setFontSize(size); };
  const text = (str, x, ty, opts = {}) => doc.text(str, x, ty, opts);
  const line = (x1, y1, x2, y2) => doc.line(x1, y1, x2, y2);
  const rect = (x, rx, w, h, s = "F") => doc.rect(x, rx, w, h, s);

  /* ── DARK BACKGROUND ── */
  fill(...DARK); rect(0, 0, W, 297);

  /* ── TEAL ACCENT STRIP (left) ── */
  fill(...TEAL); rect(0, 0, 3, 297);

  /* ── HEADER BLOCK ── */
  y = 18;
  fill(14, 14, 20); rect(0, 0, W, 42);
  fill(...TEAL); rect(0, 0, W, 1.5); // top border

  font("bold", 24); rgb(...TEAL);
  text("Fahim Mubasshir Sajid", 14, y);
  y += 7;
  font("normal", 9.5); rgb(...GRAY);
  text("Full-Stack Developer  ·  CSE Graduate  ·  Sylhet, Bangladesh", 14, y);
  y += 5;
  draw(...TEAL); doc.setLineWidth(0.2);
  line(14, y, W - 14, y);
  y += 4;

  /* ── TWO-COLUMN SETUP ── */
  const LEFT_X = 14;
  const RIGHT_X = 80;
  const COL_W_L = 62;
  const COL_W_R = W - RIGHT_X - 14;

  /* ── SECTION HEADER helper ── */
  const sectionHeader = (title, sx, sy) => {
    font("bold", 6.5); rgb(...TEAL);
    text(title.toUpperCase(), sx, sy);
    doc.setLineWidth(0.15); draw(...TEAL);
    const tw = doc.getTextWidth(title.toUpperCase());
    line(sx + tw + 2, sy - 0.8, sx + COL_W_L, sy - 0.8);
    return sy + 5;
  };

  /* ── BULLET helper ── */
  const bullet = (bx, by) => {
    fill(...TEAL); doc.circle(bx, by - 1, 0.8, "F");
  };

  /* ═══════════ LEFT COLUMN ═══════════ */
  let ly = y;

  /* CONTACT */
  ly = sectionHeader("Contact", LEFT_X, ly);
  const contacts = [
    { label: "fahim.mubasshir.sajid@gmail.com" },
    { label: "(+880) 1731047260" },
    { label: "Nowagaw, Durgapur, Netrokona" },
    { label: "github.com/fahimsajid44" },
    { label: "linkedin.com/in/fahimsajid" },
  ];
  contacts.forEach(c => {
    bullet(LEFT_X + 1.5, ly);
    font("normal", 7); rgb(...GRAY);
    text(c.label, LEFT_X + 4, ly);
    ly += 4.5;
  });
  ly += 3;

  /* TECH STACK */
  ly = sectionHeader("Tech Stack", LEFT_X, ly);
  const techs = [
    "React.js", "Node.js", "Express.js", "MongoDB",
    "MySQL", "Firebase", "Tailwind CSS", "Android",
    "Python", "PHP", "Git",
  ];
  font("normal", 7); rgb(...GRAY);
  let tx = LEFT_X; let ty2 = ly;
  techs.forEach(t => {
    const tw = doc.getTextWidth(t) + 4;
    if (tx + tw > LEFT_X + COL_W_L) { tx = LEFT_X; ty2 += 5; }
    draw(...TEAL); doc.setLineWidth(0.15);
    doc.roundedRect(tx, ty2 - 3, tw, 4, 0.5, 0.5, "S");
    rgb(...TEAL); text(t, tx + 2, ty2);
    tx += tw + 2;
  });
  ly = ty2 + 7;

  /* LANGUAGES */
  ly = sectionHeader("Languages", LEFT_X, ly);
  [{ lang: "Bengali", pct: 100 }, { lang: "English (B2)", pct: 75 }].forEach(l => {
    font("normal", 7); rgb(...GRAY); text(l.lang, LEFT_X, ly);
    fill(30, 30, 36); rect(LEFT_X, ly + 1, COL_W_L, 2);
    fill(...TEAL); rect(LEFT_X, ly + 1, COL_W_L * l.pct / 100, 2);
    ly += 7;
  });
  ly += 2;

  /* STRENGTHS */
  ly = sectionHeader("Strengths", LEFT_X, ly);
  const strengths = ["Problem Solving", "Leadership", "Team Management",
    "Collaboration", "API Design", "RESTful APIs"];
  font("normal", 6.5); let sx2 = LEFT_X; let sy2 = ly;
  strengths.forEach(s => {
    const sw = doc.getTextWidth(s) + 4;
    if (sx2 + sw > LEFT_X + COL_W_L) { sx2 = LEFT_X; sy2 += 5; }
    draw(...DIMGRAY); doc.setLineWidth(0.1);
    doc.roundedRect(sx2, sy2 - 3, sw, 4, 0.5, 0.5, "S");
    rgb(...GRAY); text(s, sx2 + 2, sy2);
    sx2 += sw + 2;
  });
  ly = sy2 + 8;

  /* VOLUNTEERING */
  ly = sectionHeader("Volunteering", LEFT_X, ly);
  font("bold", 7.5); rgb(...WHITE); text("Alok Rashmi", LEFT_X, ly); ly += 4;
  font("italic", 6.5); rgb(...TEAL); text("Founding General Secretary", LEFT_X, ly); ly += 4.5;
  font("normal", 6.5); rgb(...GRAY);
  const volLines = doc.splitTextToSize(
    "Co-founded a volunteer-based social welfare organization focused on fundraising, blood donation campaigns, and aid distribution.",
    COL_W_L
  );
  volLines.forEach(vl => { text(vl, LEFT_X, ly); ly += 3.8; });

  /* ═══════════ RIGHT COLUMN ═══════════ */
  let ry = y;

  /* ABOUT ME */
  ry = sectionHeader("About Me", RIGHT_X, ry);
  draw(30, 30, 40); doc.setLineWidth(0.1);
  rect(RIGHT_X - 2, ry - 4, COL_W_R + 2, 22, "S");
  fill(14, 14, 20); rect(RIGHT_X - 2, ry - 4, COL_W_R + 2, 22);
  font("normal", 7); rgb(...GRAY);
  const aboutLines = doc.splitTextToSize(
    "Computer Science & Engineering graduate with a strong foundation in algorithms, computer networking, and system design — complemented by practical experience in full-stack web and Android development. Seeking to contribute to innovative, security-oriented technological advancements.",
    COL_W_R - 2
  );
  aboutLines.forEach(al => { text(al, RIGHT_X, ry); ry += 3.8; });
  ry += 6;

  /* EDUCATION */
  ry = sectionHeader("Education", RIGHT_X, ry);
  const educations = [
    { degree: "B.Sc. in Computer Science & Engineering", inst: "Leading University, Sylhet", year: "2025" },
    { degree: "Higher Secondary Certificate — Science", inst: "Madan Mohan College, Sylhet", year: "2020" },
    { degree: "Secondary School Certificate — Science", inst: "Police Lines High School, Sylhet", year: "2017" },
  ];
  educations.forEach(e => {
    fill(14, 14, 20); draw(30, 30, 40); doc.setLineWidth(0.1);
    rect(RIGHT_X - 2, ry - 3.5, COL_W_R + 2, 12, "FD");
    fill(...TEAL); rect(RIGHT_X - 2, ry - 3.5, 2, 12);
    font("bold", 8); rgb(...WHITE); text(e.degree, RIGHT_X + 3, ry);
    font("normal", 7); rgb(...TEAL); text(e.inst, RIGHT_X + 3, ry + 4);
    font("normal", 6.5); rgb(...DIMGRAY);
    text(e.year, RIGHT_X + COL_W_R - doc.getTextWidth(e.year), ry);
    ry += 14;
  });
  ry += 2;

  /* PROJECT */
  ry = sectionHeader("Projects", RIGHT_X, ry);
  fill(14, 14, 20); draw(30, 30, 40); doc.setLineWidth(0.1);
  rect(RIGHT_X - 2, ry - 3.5, COL_W_R + 2, 32, "FD");
  fill(...TEAL); rect(RIGHT_X - 2, ry - 3.5, 2, 32);
  font("bold", 8.5); rgb(...WHITE); text("Ticket Nen BD", RIGHT_X + 3, ry);
  font("normal", 6.5); rgb(...TEAL);
  text("MongoDB · Express.js · React.js · Node.js · JWT", RIGHT_X + 3, ry + 4.5);
  font("normal", 7); rgb(...GRAY);
  const projLines = doc.splitTextToSize(
    "Full-stack event management and e-ticketing system featuring a category-based recommendation engine driven by user behavior analysis. Integrates secure JWT authentication, a demo payment API, and thorough system modeling (UML, DFD).",
    COL_W_R - 4
  );
  let py = ry + 9;
  projLines.forEach(pl => { text(pl, RIGHT_X + 3, py); py += 3.8; });
  font("normal", 6.5); rgb(...TEAL);
  text("↗ github.com/fahimsajid44/ticket-nen-client", RIGHT_X + 3, py + 1);
  text("↗ github.com/fahimsajid44/ticket-nen-server", RIGHT_X + 3, py + 5);
  ry += 36;

  /* RECOMMENDATIONS */
  ry = sectionHeader("Recommendations", RIGHT_X, ry);
  const refs = [
    { name: "Shafkat Kibria, PhD.", role: "Associate Professor & Former Head, Dept. CSE", contact: "shafkat@lus.ac.bd · (+880) 1972601050" },
    { name: "Md. Arifuzzaman", role: "Assistant Professor, Dept. CSE, Leading University", contact: "arif_cse@lus.ac.bd · (+880) 1998740789" },
  ];
  refs.forEach(r => {
    fill(14, 14, 20); draw(30, 30, 40); doc.setLineWidth(0.1);
    rect(RIGHT_X - 2, ry - 3.5, COL_W_R + 2, 14, "FD");
    font("bold", 8); rgb(...WHITE); text(r.name, RIGHT_X + 3, ry);
    font("normal", 7); rgb(...TEAL); text(r.role, RIGHT_X + 3, ry + 4);
    font("normal", 6.5); rgb(...DIMGRAY); text(r.contact, RIGHT_X + 3, ry + 8);
    ry += 16;
  });

  /* FOOTER */
  font("normal", 6.5); rgb(...DIMGRAY);
  text("© 2026 Fahim Mubasshir Sajid · Open to Opportunities", W / 2, 290, { align: "center" });
  draw(...TEAL); doc.setLineWidth(0.3); line(14, 286, W - 14, 286);

  doc.save("Fahim_Mubasshir_Sajid_CV.pdf");
}

/* ─── Cursor Dot ─── */
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

/* ─── Cursor Spotlight ─── */
function CursorSpotlight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
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
      width: 550, height: 550, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)",
      translateX: "-50%", translateY: "-50%",
      left: sx, top: sy,
    }} />
  );
}

/* ─── Section Label ─── */
function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
      <div style={{ width: 28, height: 1, background: "#14B8A6", opacity: 0.5, flexShrink: 0 }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

/* ─── Education Entry ─── */
function EducationEntry({ degree, institution, year, location, website, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: "18px 20px", borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        marginBottom: 12, position: "relative",
      }}
    >
      <div style={{ position: "absolute", left: -1, top: 16, bottom: 16, width: 2, background: "linear-gradient(to bottom, #14B8A6, transparent)", borderRadius: 2 }} />
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "'Clash Display', sans-serif", marginBottom: 4 }}>{degree}</h3>
          <span style={{ fontSize: 12, color: "#14B8A6", fontFamily: "'DM Mono', monospace" }}>{institution}</span>
          {website && (
            <div style={{ marginTop: 4 }}>
              <a href={website} target="_blank" rel="noreferrer" data-hover
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(20,184,166,0.45)", textDecoration: "none" }}>
                {website}
              </a>
            </div>
          )}
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>{year}</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>{location}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Tech Chip ─── */
function TechChip({ icon: Icon, name, color }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -2 }}
      data-hover
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "7px 12px", borderRadius: 7, cursor: "default",
        border: `1px solid ${hov ? color + "40" : "rgba(255,255,255,0.07)"}`,
        background: hov ? color + "0a" : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <Icon size={12} style={{ color: hov ? color : "rgba(255,255,255,0.3)", transition: "color 0.3s" }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: hov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)", transition: "color 0.3s" }}>{name}</span>
    </motion.div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ title, stack, desc, githubClient, githubServer, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -3 }}
      data-hover
      style={{
        padding: "20px 22px", borderRadius: 10, cursor: "default",
        border: `1px solid ${hov ? "rgba(20,184,166,0.25)" : "rgba(255,255,255,0.06)"}`,
        background: hov ? "rgba(20,184,166,0.04)" : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s, background 0.3s",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", left: -1, top: 16, bottom: 16, width: 2, background: "linear-gradient(to bottom, #14B8A6, transparent)", borderRadius: 2 }} />
      <h4 style={{ fontSize: 14.5, fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "'Clash Display', sans-serif", marginBottom: 10 }}>{title}</h4>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.37)", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginBottom: 14 }}>{desc}</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {stack.map(s => (
          <span key={s} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(20,184,166,0.65)", padding: "3px 8px", borderRadius: 4, border: "1px solid rgba(20,184,166,0.15)", background: "rgba(20,184,166,0.04)" }}>{s}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {githubClient && (
          <a href={githubClient} target="_blank" rel="noreferrer" data-hover
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, opacity: 0.75 }}>
            <FaGithub size={11} /> client repo ↗
          </a>
        )}
        {githubServer && (
          <a href={githubServer} target="_blank" rel="noreferrer" data-hover
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, opacity: 0.75 }}>
            <FaGithub size={11} /> server repo ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Contact Row ─── */
function ContactRow({ icon: Icon, text, href, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}
    >
      <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={11} style={{ color: "#14B8A6" }} />
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" data-hover
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.38)", textDecoration: "none", wordBreak: "break-all" }}>
          {text}
        </a>
      ) : (
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.38)", wordBreak: "break-all" }}>{text}</span>
      )}
    </motion.div>
  );
}

/* ════════════════════════════
   Resume Page
════════════════════════════ */
export default function Resume() {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);

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

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generateAndDownloadPDF();
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#06060A", color: "white", fontFamily: "'Clash Display', sans-serif", position: "relative", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .resume-grid {
          display: grid;
          grid-template-columns: 290px 1fr;
          gap: 44px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .resume-grid { grid-template-columns: 1fr; gap: 28px; }
        }
        @media (max-width: 600px) {
          .resume-grid { grid-template-columns: 1fr; gap: 24px; }
        }

        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 52px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .top-nav-right {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .page-title h1 {
          font-size: clamp(30px, 5.5vw, 68px);
          font-weight: 700;
          letter-spacing: -3px;
          line-height: 0.92;
          margin-bottom: 14px;
        }

        .noise { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px; }
        .scanlines { position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #06060A; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.3); border-radius: 2px; }

        .btn-primary {
          padding: 11px 20px; border-radius: 7px; border: none;
          background: #14B8A6; color: #06060A;
          font-size: 12px; font-weight: 600; letter-spacing: 0.5px;
          cursor: none; font-family: 'DM Mono', monospace;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.3s, opacity 0.3s;
          white-space: nowrap;
        }
        .btn-primary:hover { background: #0D9488; }
        .btn-primary:disabled { opacity: 0.6; }

        .btn-ghost {
          padding: 10px 16px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.08); background: transparent;
          color: rgba(255,255,255,0.4); font-size: 12px; font-weight: 500;
          cursor: none; font-family: 'DM Mono', monospace; letter-spacing: 0.5px;
          display: inline-flex; align-items: center; gap: 7px;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
          white-space: nowrap;
        }
        .btn-ghost:hover { border-color: rgba(20,184,166,0.35); color: #14B8A6; background: rgba(20,184,166,0.05); }

        .lang-bar-track { height: 3px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; margin-top: 5px; }

        @media (max-width: 480px) {
          .btn-primary, .btn-ghost { font-size: 11px; padding: 9px 14px; }
          .top-nav { margin-bottom: 32px; }
        }
      `}</style>

      <div className="noise" />
      <div className="scanlines" />
      <CursorDot />
      <CursorSpotlight />

      {/* Animated BG */}
      <motion.div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <motion.div style={{
          position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 65%)",
          filter: "blur(80px)", top: -200, right: -200,
          x: glowX, y: glowY,
        }} />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(130,170,255,0.07) 0%, transparent 70%)",
            filter: "blur(90px)", bottom: 80, left: -80,
          }}
        />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.028 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </motion.div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(60px, 10vw, 100px) clamp(16px, 6%, 60px) 120px", position: "relative", zIndex: 2 }}>

        {/* ── Top nav ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="top-nav"
        >
          <motion.button className="btn-ghost" data-hover
            onClick={() => navigate("/about")}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          >
            <FaArrowLeft size={10} /> back to about
          </motion.button>

          <div className="top-nav-right">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 6, border: "1px solid rgba(20,184,166,0.18)", background: "rgba(20,184,166,0.05)" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6" }}>~/resume</span>
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                style={{ color: "#14B8A6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>▋</motion.span>
            </div>
            <motion.button
              className="btn-primary"
              data-hover
              onClick={handleDownload}
              disabled={downloading}
              whileHover={{ scale: downloading ? 1 : 1.04 }}
              whileTap={{ scale: downloading ? 1 : 0.97 }}
            >
              {downloading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ display: "inline-block", width: 10, height: 10, border: "2px solid #06060A", borderTopColor: "transparent", borderRadius: "50%" }}
                  />
                  generating…
                </>
              ) : (
                <><FaDownload size={10} /> download PDF</>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* ── Page title ── */}
        <motion.div
          className="page-title"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 56 }}
        >
          <h1 style={{ letterSpacing: "0px" }}>
            Curriculum <span style={{ color: "#14B8A6" }}>Vitae</span>
          </h1>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Full-Stack Developer · CSE Graduate · Sylhet, Bangladesh
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="resume-grid">

          {/* ══ LEFT SIDEBAR ══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Contact */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <SectionLabel>contact</SectionLabel>
              <ContactRow icon={FaEnvelope}     text="fahim.mubasshir.sajid@gmail.com"  href="mailto:fahim.mubasshir.sajid@gmail.com" delay={0.25} />
              <ContactRow icon={FaPhone}        text="(+880) 1731047260"                delay={0.30} />
              <ContactRow icon={FaMapMarkerAlt} text="Nowagaw, Durgapur, Netrokona, BD" delay={0.35} />
              <ContactRow icon={FaGithub}       text="github.com/fahimsajid44"          href="https://github.com/fahimsajid44"        delay={0.40} />
              <ContactRow icon={FaLinkedin}     text="linkedin.com/in/fahimsajid"       href="https://www.linkedin.com/in/fahim-mubasshir-sajid" delay={0.45} />
            </motion.div>

            {/* Tech Stack */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
              <SectionLabel>tech stack</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { icon: SiReact,       name: "React.js",   color: "#61DAFB" },
                  { icon: SiNodedotjs,   name: "Node.js",    color: "#8CC84B" },
                  { icon: SiExpress,     name: "Express.js", color: "#aaaaaa" },
                  { icon: SiMongodb,     name: "MongoDB",    color: "#4DB33D" },
                  { icon: SiMysql,       name: "MySQL",      color: "#4479A1" },
                  { icon: SiFirebase,    name: "Firebase",   color: "#FFCA28" },
                  { icon: SiTailwindcss, name: "Tailwind",   color: "#06B6D4" },
                  { icon: SiAndroid,     name: "Android",    color: "#3DDC84" },
                  { icon: SiPython,      name: "Python",     color: "#3776AB" },
                  { icon: SiPhp,         name: "PHP",        color: "#777BB4" },
                  { icon: SiGit,         name: "Git",        color: "#F05032" },
                ].map(skill => <TechChip key={skill.name} {...skill} />)}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
              <SectionLabel>languages</SectionLabel>
              {[
                { lang: "Bengali", level: "Native",           pct: 100 },
                { lang: "English", level: "Independent (B2)", pct: 75  },
              ].map(({ lang, level, pct }) => (
                <div key={lang} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{lang}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#14B8A6" }}>{level}</span>
                  </div>
                  <div className="lang-bar-track">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, rgba(20,184,166,0.4), rgba(20,184,166,0.75))" }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Strengths */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <SectionLabel>strengths</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {["Problem Solving", "Leadership", "Team Management", "Team Collaboration", "Strong Communication", "Fluent English", "API Design", "RESTful APIs"].map(s => (
                  <span key={s} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", padding: "5px 9px", borderRadius: 5, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>{s}</span>
                ))}
              </div>
            </motion.div>

            {/* Volunteering */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55, duration: 0.6 }}>
              <SectionLabel>volunteering</SectionLabel>
              <div style={{ padding: "18px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <FaHeart size={11} style={{ color: "#f87171", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.82)" }}>Alok Rashmi</span>
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#14B8A6", marginBottom: 8 }}>Founding General Secretary</div>
                <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.3)", lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                  Co-founded a volunteer-based social welfare organization focused on fundraising, blood donation campaigns, and aid distribution for underprivileged communities.
                </p>
              </div>
            </motion.div>

          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* About Me */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
              <SectionLabel>about me</SectionLabel>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.42)", lineHeight: 1.9, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, padding: "18px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>Computer Science & Engineering graduate</span> with a strong foundation in algorithms, computer networking, and system design — complemented by practical experience in <span style={{ color: "#14B8A6" }}>full-stack web and Android development</span>. Possess a growing academic interest in intelligent systems, data-driven modeling, and secure computing, with a focus on building reliable, efficient, and secure computational solutions. Seeking to contribute to innovative, security-oriented technological advancements.
              </p>
            </motion.div>

            {/* Education */}
            <div>
              <SectionLabel>education</SectionLabel>
              <EducationEntry degree="B.Sc. in Computer Science & Engineering" institution="Leading University" year="2025" location="Sylhet, Bangladesh" website="https://lus.ac.bd/" delay={0.3} />
              <EducationEntry degree="Higher Secondary Certificate — Science" institution="Madan Mohan College" year="2020" location="Sylhet, Bangladesh" website="https://www.mmc.edu.bd/en" delay={0.38} />
              <EducationEntry degree="Secondary School Certificate — Science" institution="Police Lines High School" year="2017" location="Sylhet, Bangladesh" website="https://www.sylplhs.edu.bd/" delay={0.46} />
            </div>

            {/* Projects */}
            <div>
              <SectionLabel>projects</SectionLabel>
              <ProjectCard
                title="Ticket Nen BD"
                stack={["MongoDB", "Express.js", "React.js", "Node.js", "JWT"]}
                desc="Full-stack event management and e-ticketing system featuring a category-based recommendation engine driven by user behavior analysis. Integrates secure JWT authentication, a demo payment API, and thorough system modeling (UML, DFD) to ensure scalable and secure architecture."
                githubClient="https://github.com/fahimsajid44/ticket-nen-client"
                githubServer="https://github.com/fahimsajid44/ticket-nen-server"
                delay={0.35}
              />
            </div>

            {/* Recommendations */}
            <div>
              <SectionLabel>recommendations</SectionLabel>
              {[
                { name: "Shafkat Kibria, PhD.", role: "Associate Professor & Former Head", dept: "Dept. of CSE, Leading University, Sylhet", email: "shafkat@lus.ac.bd", phone: "(+880) 1972601050" },
                { name: "Md. Arifuzzaman", role: "Assistant Professor", dept: "Dept. of CSE, Leading University, Sylhet", email: "arif_cse@lus.ac.bd", phone: "(+880) 1998740789" },
              ].map((ref, i) => (
                <motion.div
                  key={ref.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 + i * 0.1, duration: 0.6 }}
                  style={{ padding: "16px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", marginBottom: 12 }}
                >
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.82)", marginBottom: 3 }}>{ref.name}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#14B8A6", marginBottom: 3 }}>{ref.role}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.28)", marginBottom: 10 }}>{ref.dept}</div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <a href={`mailto:${ref.email}`} data-hover style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{ref.email}</a>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.22)" }}>{ref.phone}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "12px 6%", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(6,6,10,0.75)", backdropFilter: "blur(20px)", zIndex: 10,
          flexWrap: "wrap", gap: 8,
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>© 2026 Fahim Mubasshir Sajid</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>open to opportunities</span>
        </div>
      </motion.div>
    </div>
  );
}