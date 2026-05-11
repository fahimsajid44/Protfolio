import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home",     path: "/" },
    { name: "Works",    path: "/works" },
    { name: "Services", path: "/services" },
    { name: "Journal",  path: "/journal" },
    { name: "Contact",  path: "/contact" },
    { name: "About",    path: "/about" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: auto;
          max-width: calc(100vw - 32px);
        }

        /* ── Desktop pill ── */
        .navbar-pill {
          display: flex;
          gap: 6px;
          background: rgba(255,255,255,0.08);
          padding: 8px 14px;
          border-radius: 50px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 24px rgba(0,0,0,0.25);
          transition: background 0.3s;
          white-space: nowrap;
        }

        .navbar-pill a {
          text-decoration: none;
          color: rgba(255,255,255,0.7);
          padding: 8px 16px;
          border-radius: 30px;
          transition: all 0.25s;
          font-weight: 600;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.1px;
        }

        .navbar-pill a:hover {
          color: #fff;
          background: rgba(255,255,255,0.08);
        }

        .navbar-pill a.active {
          color: #000;
          background: #fff;
        }

        /* ── Hamburger button ── */
        .hamburger-btn {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50px;
          padding: 10px 18px;
          cursor: pointer;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.25);
          transition: background 0.25s;
        }

        .hamburger-btn:hover {
          background: rgba(255,255,255,0.13);
        }

        .hamburger-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.2px;
        }

        .hamburger-bars {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 18px;
        }

        .hamburger-bars span {
          display: block;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger-bars.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
        .hamburger-bars.open span:nth-child(2) { transform: scale(0); opacity: 0; }
        .hamburger-bars.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

        /* ── Mobile dropdown ── */
        .mobile-menu {
          position: fixed;
          top: 78px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100vw - 32px);
          max-width: 360px;
          background: rgba(10,10,14,0.96);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 18px;
          padding: 10px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
          z-index: 999;
          animation: menuIn 0.22s ease forwards;
        }

        @keyframes menuIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);    }
        }

        .mobile-menu a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          padding: 13px 16px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 500;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .mobile-menu a:hover {
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.05);
        }

        .mobile-menu a.active {
          color: #14B8A6;
          background: rgba(20,184,166,0.08);
          border-color: rgba(20,184,166,0.18);
          font-weight: 600;
        }

        .mobile-menu a.active::after {
          content: '●';
          font-size: 7px;
          color: #14B8A6;
          opacity: 0.8;
        }

        .mobile-menu-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 4px 8px;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 700px) {
          .navbar-pill    { display: none; }
          .hamburger-btn  { display: flex; }
        }

        @media (min-width: 701px) {
          .mobile-menu { display: none !important; }
        }

        /* Slightly tighter pill on mid screens */
        @media (max-width: 860px) and (min-width: 701px) {
          .navbar-pill a {
            padding: 7px 11px;
            font-size: 13px;
          }
        }
      `}</style>

      {/* ── Desktop pill navbar ── */}
      <nav className="navbar-wrapper">
        <div className="navbar-pill">
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
      </nav>

      {/* ── Mobile hamburger button ── */}
      <div className="navbar-wrapper" style={{ display: "none" }}>
        {/* placeholder — real button below */}
      </div>

      <button
        className="hamburger-btn"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <div className={`hamburger-bars ${menuOpen ? "open" : ""}`}>
          <span /><span /><span />
        </div>
        <span className="hamburger-label">
          {navItems.find(i =>
            i.path === "/"
              ? window.location.pathname === "/"
              : window.location.pathname.startsWith(i.path)
          )?.name ?? "Menu"}
        </span>
      </button>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item, idx) => (
            <div key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={handleNavClick}
              >
                {item.name}
              </NavLink>
              {idx < navItems.length - 1 && <div className="mobile-menu-divider" />}
            </div>
          ))}
        </div>
      )}

      {/* ── Backdrop to close on outside click ── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0,
            zIndex: 998, cursor: "default",
          }}
        />
      )}
    </>
  );
}

export default Navbar;