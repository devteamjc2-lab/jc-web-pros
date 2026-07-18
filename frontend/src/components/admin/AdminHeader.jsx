import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={styles.logo}>H</div>
        <div>
          <p style={styles.brandLabel}>HORIZON ADMIN</p>
          <p style={styles.brandSub}>Control center</p>
        </div>
      </div>

      <nav style={styles.nav}>
        <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
        <Link to="/admin/dashboard" style={styles.navLink}>Analytics</Link>
        <Link to="/admin/dashboard" style={styles.navLink}>Users</Link>
        <Link to="/admin/dashboard" style={styles.navLink}>Settings</Link>
      </nav>

      <div style={styles.profile}>
        <span style={styles.avatar}>A</span>
        <div>
          <p style={styles.profileName}>Admin User</p>
          <p style={styles.profileRole}>Super Admin</p>
        </div>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "280px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "32px",
    padding: "28px 22px",
    background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
    color: "#fff",
    position: "sticky",
    top: 0,
    boxShadow: "0 18px 50px rgba(15, 23, 42, 0.18)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  logo: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    background: "#6366f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "20px",
  },
  brandLabel: {
    margin: 0,
    fontSize: "14px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    opacity: 0.85,
  },
  brandSub: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#d1d5db",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  navLink: {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "14px",
    padding: "14px 16px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.04)",
    transition: "all 0.2s ease",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(255,255,255,0.12)",
    marginTop: "auto",
  },
  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "999px",
    background: "#4f46e5",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
    color: "#fff",
  },
  profileName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 700,
  },
  profileRole: {
    margin: 0,
    fontSize: "12px",
    color: "#9ca3af",
  },
};

export default AdminHeader;
