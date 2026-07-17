export default function Footer() {
  const services = [
    "SEO", "ORM", "SMM", "PPC", "Content Writing",
    "Web Design & Development", "Citation Development",
    "Website Audit", "Reseller White Label",
  ];

  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <footer style={styles.footer}>
      {/* TOP FOOTER */}
      <div style={styles.topFooter}>
        <div style={styles.container}>

          {/* ABOUT */}
          <div style={styles.col}>
            <div style={styles.logoWrap}>
              <span style={styles.logoIcon}>JC</span>
              <span style={styles.logoText}>WEB PROS</span>
            </div>
            <p style={styles.aboutText}>
              JC Web Pros is India's top digital marketing agency offering SEO, PPC, SMM, web design and more to help businesses grow online globally.
            </p>
            <div style={styles.socialRow}>
              {["f", "in", "tw", "yt"].map((s) => (
                <a key={s} href="#" style={styles.socialBtn}>{s}</a>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Our Services</h4>
            <div style={styles.divider}></div>
            <ul style={styles.linkList}>
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" style={styles.footerLink}>
                    <span style={styles.arrow}>›</span> {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Quick Links</h4>
            <div style={styles.divider}></div>
            <ul style={styles.linkList}>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={styles.footerLink}>
                    <span style={styles.arrow}>›</span> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Contact Us</h4>
            <div style={styles.divider}></div>
            <div style={styles.contactList}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <span style={styles.contactText}>123 Business Avenue, India</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📞</span>
                <span style={styles.contactText}>+91 98765 43210</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>✉️</span>
                <span style={styles.contactText}>info@jcwebpros.com</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>🕐</span>
                <span style={styles.contactText}>Mon–Sat: 9AM – 6PM IST</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomInner}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} JC Web Pros. All Rights Reserved.
          </p>
          <div style={styles.bottomLinks}>
            <a href="#" style={styles.bottomLink}>Privacy Policy</a>
            <span style={styles.dot}>•</span>
            <a href="#" style={styles.bottomLink}>Terms of Service</a>
            <span style={styles.dot}>•</span>
            <a href="#" style={styles.bottomLink}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#1a1a2e",
    color: "#ccc",
    fontFamily: "'Segoe UI', sans-serif",
  },
  topFooter: {
    padding: "60px 0 40px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr",
    gap: "40px",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  logoIcon: {
    width: "38px",
    height: "38px",
    background: "#e8501a",
    color: "#fff",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "15px",
  },
  logoText: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#fff",
    letterSpacing: "1px",
  },
  aboutText: {
    fontSize: "13px",
    lineHeight: "1.8",
    color: "#aaa",
    marginBottom: "20px",
  },
  socialRow: {
    display: "flex",
    gap: "10px",
  },
  socialBtn: {
    width: "34px",
    height: "34px",
    background: "#e8501a",
    color: "#fff",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "700",
    textDecoration: "none",
    textTransform: "uppercase",
  },
  colTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "12px",
    letterSpacing: "0.5px",
  },
  divider: {
    width: "40px",
    height: "3px",
    background: "#e8501a",
    marginBottom: "18px",
    borderRadius: "2px",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  footerLink: {
    fontSize: "13px",
    color: "#aaa",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "color 0.2s",
  },
  arrow: {
    color: "#e8501a",
    fontWeight: "700",
    fontSize: "16px",
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  contactIcon: {
    fontSize: "14px",
    flexShrink: 0,
    marginTop: "2px",
  },
  contactText: {
    fontSize: "13px",
    color: "#aaa",
    lineHeight: "1.5",
  },
  bottomBar: {
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "18px 0",
  },
  bottomInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
  },
  copyright: {
    fontSize: "13px",
    color: "#888",
    margin: 0,
  },
  bottomLinks: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  bottomLink: {
    fontSize: "13px",
    color: "#888",
    textDecoration: "none",
  },
  dot: {
    color: "#555",
    fontSize: "12px",
  },
};