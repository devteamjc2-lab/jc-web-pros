import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  
const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", to: "/contact" },

  ...(token
    ? [{ label: "Chat", to: "/chat" }]
    : [{ label: "Login", to: "/login" }]),
];
{token && (
  <div style={styles.profileWrapper}>
    <span
      style={styles.profileBtn}
      onClick={() => setProfileOpen(!profileOpen)}
    >
      👤 Profile
    </span>

    {profileOpen && (
      <div style={styles.dropdown}>

        <Link
          to="/profile"
          style={styles.dropdownItem}
          onClick={() => setProfileOpen(false)}
        >
          My Profile
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/dashboard"
            style={styles.dropdownItem}
            onClick={() => setProfileOpen(false)}
          >
            Dashboard
          </Link>
        )}

        <button
          style={styles.logoutBtn}
          onClick={logout}
        >
          Logout
        </button>

      </div>
    )}
  </div>
)}
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
          {navLinks.map((link) => {
            if (link.to) {
              return (
                <Link key={link.label} to={link.to} style={styles.navLink}
                  onMouseEnter={e => e.target.style.color = "#e8501a"}
                  onMouseLeave={e => e.target.style.color = "#333"}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a key={link.label} href={link.href} style={styles.navLink}
                onMouseEnter={e => e.target.style.color = "#e8501a"}
                onMouseLeave={e => e.target.style.color = "#333"}
              >
                {link.label}
              </a>
            );
          })}
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
          {navLinks.map((link) => {
            if (link.to) {
              return (
                <Link key={link.label} to={link.to} style={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a key={link.label} href={link.href} style={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
          <a href="#contact" style={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            GET A QUOTE
          </a>
        </div>
      )}
    </header>
  );
}

const styles = {
  profileWrapper: {
  position: "relative",
},

profileBtn: {
  cursor: "pointer",
  fontWeight: "600",
  color: "#333",
},

dropdown: {
  position: "absolute",
  top: "40px",
  right: 0,
  width: "180px",
  background: "#fff",
  borderRadius: "6px",
  boxShadow: "0 5px 20px rgba(0,0,0,.15)",
  overflow: "hidden",
  zIndex: 1000,
},

dropdownItem: {
  display: "block",
  padding: "12px 16px",
  textDecoration: "none",
  color: "#333",
  borderBottom: "1px solid #eee",
},

logoutBtn: {
  width: "100%",
  padding: "12px 16px",
  border: "none",
  background: "#fff",
  cursor: "pointer",
  textAlign: "left",
  color: "#d32f2f",
},

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