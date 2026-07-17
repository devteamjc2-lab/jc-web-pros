import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* LOGO */}
        <div style={styles.logo}>
          <span style={styles.logoIcon}>JC</span>
          <span style={styles.logoText}>WEB PROS</span>
        </div>

        {/* DESKTOP NAV */}
        <nav style={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} style={styles.navLink}
              onMouseEnter={e => e.target.style.color = "#e8501a"}
              onMouseLeave={e => e.target.style.color = "#333"}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" style={styles.ctaBtn}>GET A QUOTE</a>
        </nav>

        {/* HAMBURGER */}
        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span style={styles.bar}></span>
          <span style={styles.bar}></span>
          <span style={styles.bar}></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" style={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            GET A QUOTE
          </a>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#ffffff",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    cursor: "pointer",
  },
  logoIcon: {
    width: "40px",
    height: "40px",
    background: "#e8501a",
    color: "#fff",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "16px",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#222",
    letterSpacing: "1px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
  },
  navLink: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    textDecoration: "none",
    letterSpacing: "0.5px",
    transition: "color 0.2s",
    textTransform: "uppercase",
  },
  ctaBtn: {
    padding: "10px 22px",
    background: "#e8501a",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "13px",
    fontWeight: "700",
    textDecoration: "none",
    letterSpacing: "0.5px",
    transition: "background 0.2s",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  bar: {
    width: "25px",
    height: "3px",
    background: "#333",
    borderRadius: "2px",
    display: "block",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    padding: "16px 24px",
    borderTop: "1px solid #eee",
    gap: "12px",
  },
  mobileLink: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    textDecoration: "none",
    padding: "8px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  mobileCta: {
    padding: "12px 20px",
    background: "#e8501a",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "700",
    textDecoration: "none",
    textAlign: "center",
    marginTop: "4px",
  },
};