import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home",     path: "/",         num: "01" },
    { name: "Works",    path: "/works",    num: "02" },
    { name: "Services", path: "/services", num: "03" },
    { name: "Journal",  path: "/journal",  num: "04" },
    { name: "About",    path: "/about",    num: "05" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const onScroll = () => setMenuOpen(false);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [menuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  const currentPage = navItems.find(i =>
    i.path === "/"
      ? window.location.pathname === "/"
      : window.location.pathname.startsWith(i.path)
  )?.name ?? "Menu";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

        .navbar-fixed {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
        }

        /* ══════════════════════════════
           DESKTOP NAVBAR
        ══════════════════════════════ */
        .nav-container {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 5px 7px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: background 0.3s, border-color 0.3s;
          white-space: nowrap;
          width: max-content;
          max-width: calc(100vw - 32px);
        }

        .nav-container.scrolled {
          background: rgba(6,6,10,0.9);
          border-color: rgba(255,255,255,0.06);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px 6px 9px;
          margin-right: 3px;
          border-right: 1px solid rgba(255,255,255,0.07);
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #14B8A6;
          animation: navDotPulse 2s infinite;
          flex-shrink: 0;
        }

        @keyframes navDotPulse {
          0%, 100% { opacity: 1;    transform: scale(1);   }
          50%       { opacity: 0.4; transform: scale(1.6); }
        }

        .nav-logo-text {
          font-family: 'Clash Display', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1px;
          padding: 0 4px;
        }

        .nav-links a {
          position: relative;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.36);
          padding: 6px 11px;
          border-radius: 8px;
          text-decoration: none;
          letter-spacing: 0.2px;
          border: 1px solid transparent;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }

        .nav-links a:hover {
          color: rgba(255,255,255,0.82);
          background: rgba(255,255,255,0.05);
        }

        .nav-links a.active {
          color: #14B8A6;
          background: rgba(20,184,166,0.09);
          border-color: rgba(20,184,166,0.18);
        }

        .nav-links a.active::before {
          content: '';
          position: absolute;
          top: 4px;
          right: 4px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #14B8A6;
          opacity: 0.8;
        }

        .nav-cta {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          font-weight: 500;
          color: #14B8A6;
          padding: 6px 13px;
          border-radius: 8px;
          border: 1px solid rgba(20,184,166,0.28);
          background: rgba(20,184,166,0.07);
          text-decoration: none;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-left: 3px;
          flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
        }

        .nav-cta:hover {
          background: rgba(20,184,166,0.14);
          border-color: rgba(20,184,166,0.48);
          box-shadow: 0 0 16px rgba(20,184,166,0.1);
        }

        @media (max-width: 860px) and (min-width: 769px) {
          .nav-links a  { padding: 6px 9px; font-size: 10.5px; }
          .nav-cta      { padding: 6px 10px; font-size: 10px; letter-spacing: 0.8px; }
          .nav-logo     { padding: 6px 12px 6px 8px; }
        }

        /* ══════════════════════════════
           MOBILE TRIGGER — centered pill
        ══════════════════════════════ */
        .nav-mobile-trigger {
          display: none;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 10px 14px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          cursor: pointer;
          width: calc(100vw - 32px);
          max-width: 400px;
          transition: background 0.3s, border-color 0.3s;
        }

        .nav-mobile-trigger.scrolled {
          background: rgba(6,6,10,0.92);
        }

        .nav-mobile-trigger.menu-open {
          border-color: rgba(20,184,166,0.2);
          background: rgba(6,6,10,0.95);
        }

        .nav-mobile-left {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .nav-mobile-logo {
          font-family: 'Clash Display', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          letter-spacing: -0.3px;
        }

        .nav-mobile-sep {
          width: 1px;
          height: 13px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .nav-mobile-page {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #14B8A6;
          letter-spacing: 0.3px;
        }

        .nav-hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 2px;
        }

        .nav-hamburger em {
          display: block;
          height: 1.5px;
          background: rgba(255,255,255,0.45);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease, background 0.3s ease;
          font-style: normal;
        }

        .nav-hamburger em:nth-child(1) { width: 18px; }
        .nav-hamburger em:nth-child(2) { width: 18px; }
        .nav-hamburger em:nth-child(3) { width: 11px; transition-delay: 0.04s; }

        .nav-hamburger.open em:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
          background: #14B8A6;
        }
        .nav-hamburger.open em:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger.open em:nth-child(3) {
          width: 18px;
          transform: rotate(-45deg) translate(4px, -4px);
          background: #14B8A6;
          transition-delay: 0s;
        }

        /* ══════════════════════════════
           FULL-SCREEN OVERLAY (mobile)
           Opens from CENTER via scale
        ══════════════════════════════ */
        .nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          /* pointer-events handled by framer */
        }

        .nav-overlay-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(4,4,8,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        /* The menu panel itself — centered */
        .nav-menu-panel {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 360px;
          background: rgba(9,9,14,0.98);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 10px;
          box-shadow:
            0 0 0 1px rgba(20,184,166,0.06),
            0 32px 80px rgba(0,0,0,0.7);
          overflow: hidden;
        }

        /* Top bar inside panel */
        .nav-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 6px;
        }

        .nav-panel-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-panel-brand-text {
          font-family: 'Clash Display', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          letter-spacing: -0.3px;
        }

        .nav-panel-close {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          font-size: 16px;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          line-height: 1;
          font-family: sans-serif;
        }

        .nav-panel-close:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.14);
        }

        /* Nav items */
        .nav-mobile-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 13px;
          border-radius: 10px;
          text-decoration: none;
          border: 1px solid transparent;
          transition: background 0.18s, border-color 0.18s;
          margin-bottom: 1px;
        }

        .nav-mobile-item:hover {
          background: rgba(255,255,255,0.03);
        }

        .nav-mobile-item.active {
          background: rgba(20,184,166,0.07);
          border-color: rgba(20,184,166,0.15);
        }

        .nav-mobile-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-mobile-item-num {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.12);
          letter-spacing: 1.5px;
          width: 16px;
          flex-shrink: 0;
        }

        .nav-mobile-item.active .nav-mobile-item-num {
          color: rgba(20,184,166,0.4);
        }

        .nav-mobile-item-name {
          font-family: 'DM Mono', monospace;
          font-size: 13.5px;
          color: rgba(255,255,255,0.42);
          letter-spacing: 0.3px;
          font-weight: 500;
        }

        .nav-mobile-item.active .nav-mobile-item-name {
          color: #14B8A6;
        }

        .nav-mobile-item-arrow {
          font-size: 13px;
          color: rgba(255,255,255,0.08);
          transition: color 0.18s, transform 0.18s;
          font-family: sans-serif;
        }

        .nav-mobile-item.active .nav-mobile-item-arrow {
          color: rgba(20,184,166,0.45);
        }

        .nav-mobile-item:hover .nav-mobile-item-arrow {
          color: rgba(255,255,255,0.28);
          transform: translateX(2px);
        }

        .nav-mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.04);
          margin: 2px 8px;
        }

        /* CTA at bottom of panel */
        .nav-mobile-cta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 13px;
          border-radius: 10px;
          background: rgba(20,184,166,0.06);
          border: 1px solid rgba(20,184,166,0.14);
          text-decoration: none;
          margin-top: 6px;
          transition: background 0.18s, border-color 0.18s;
        }

        .nav-mobile-cta-row:hover {
          background: rgba(20,184,166,0.11);
          border-color: rgba(20,184,166,0.28);
        }

        .nav-mobile-cta-sub {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(20,184,166,0.45);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .nav-mobile-cta-text {
          font-family: 'Clash Display', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #14B8A6;
          letter-spacing: -0.2px;
        }

        .nav-mobile-cta-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: rgba(20,184,166,0.1);
          border: 1px solid rgba(20,184,166,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: #14B8A6;
          flex-shrink: 0;
        }

        /* ══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .nav-container       { display: none !important; }
          .nav-mobile-trigger  { display: flex !important; }
        }

        @media (min-width: 769px) {
          .nav-mobile-trigger  { display: none !important; }
          .nav-overlay         { display: none !important; }
        }

        @media (max-width: 360px) {
          .nav-mobile-trigger {
            max-width: calc(100vw - 24px);
            padding: 9px 12px;
          }
          .nav-menu-panel {
            max-width: calc(100vw - 32px);
            border-radius: 16px;
          }
        }
      `}</style>

      {/* ══ DESKTOP ══ */}
      <div className="navbar-fixed">
        <nav className={`nav-container ${scrolled ? "scrolled" : ""}`}>
          <NavLink to="/" className="nav-logo" onClick={handleNavClick}>
            <div className="nav-logo-dot" />
            <span className="nav-logo-text">FMS</span>
          </NavLink>

          <div className="nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <NavLink to="/contact" className="nav-cta" onClick={handleNavClick}>
            Contact ↗
          </NavLink>
        </nav>
      </div>

      {/* ══ MOBILE TRIGGER ══ */}
      <button
        className={`navbar-fixed nav-mobile-trigger ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        style={{ background: "none", outline: "none" }}
      >
        <div className="nav-mobile-left">
          <div className="nav-logo-dot" />
          <span className="nav-mobile-logo">FMS</span>
          <div className="nav-mobile-sep" />
          <span className="nav-mobile-page">{currentPage}</span>
        </div>
        <div className={`nav-hamburger ${menuOpen ? "open" : ""}`} aria-hidden="true">
          <em /><em /><em />
        </div>
      </button>

      {/* ══ FULL-SCREEN CENTERED OVERLAY ══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Backdrop — click to close */}
            <motion.div
              className="nav-overlay-backdrop"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel — scales up from center */}
            <motion.div
              className="nav-menu-panel"
              initial={{ opacity: 0, scale: 0.82, y: 24 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.88,  y: 12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="nav-panel-header">
                <div className="nav-panel-brand">
                  <div className="nav-logo-dot" />
                  <span className="nav-panel-brand-text">FMS</span>
                </div>
                <button
                  className="nav-panel-close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Nav items with stagger */}
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + idx * 0.055, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      isActive ? "nav-mobile-item active" : "nav-mobile-item"
                    }
                    onClick={handleNavClick}
                  >
                    <div className="nav-mobile-item-left">
                      <span className="nav-mobile-item-num">{item.num}</span>
                      <span className="nav-mobile-item-name">{item.name}</span>
                    </div>
                    <span className="nav-mobile-item-arrow">›</span>
                  </NavLink>
                  {idx < navItems.length - 1 && (
                    <div className="nav-mobile-divider" />
                  )}
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <NavLink
                  to="/contact"
                  className="nav-mobile-cta-row"
                  onClick={handleNavClick}
                >
                  <div>
                    <div className="nav-mobile-cta-sub">Get in touch</div>
                    <div className="nav-mobile-cta-text">Contact ↗</div>
                  </div>
                  <div className="nav-mobile-cta-icon">↗</div>
                </NavLink>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;