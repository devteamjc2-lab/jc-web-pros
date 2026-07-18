import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({ name: "Admin" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({ name: "Admin" });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroHeading}>
          <p style={styles.subtitle}>Admin Dashboard</p>
          <h1 style={styles.title}>Welcome back, {user.name}</h1>
          <p style={styles.description}>
            Here are your latest site metrics and quick actions.
          </p>
        </div>

        <div style={styles.heroActions}>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
          <div style={styles.statsBadge}>
            <span style={styles.statsLabel}>Total Revenue</span>
            <strong style={styles.statsValue}>$37.5K</strong>
          </div>
        </div>
      </section>

      <section style={styles.grid}>
        <article style={styles.card}>
          <div style={styles.cardTop}>New Messages</div>
          <p style={styles.cardValue}>12</p>
          <p style={styles.cardNote}>Messages waiting for response.</p>
        </article>

        <article style={styles.card}>
          <div style={styles.cardTop}>Active Users</div>
          <p style={styles.cardValue}>34</p>
          <p style={styles.cardNote}>Users currently online.</p>
        </article>

        <article style={styles.card}>
          <div style={styles.cardTop}>Site Visits</div>
          <p style={styles.cardValue}>1.2k</p>
          <p style={styles.cardNote}>Visits in the last 24 hours.</p>
        </article>
      </section>
    </main>
  );
};

const styles = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px 48px",
    background: "#f8fafc",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    marginBottom: "28px",
    flexWrap: "wrap",
    padding: "32px 36px",
    background: "linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)",
    borderRadius: "32px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
  },
  heroHeading: {
    maxWidth: "700px",
  },
  heroActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  statsBadge: {
    display: "flex",
    flexDirection: "column",
    padding: "18px 22px",
    borderRadius: "20px",
    background: "#eef2ff",
    minWidth: "170px",
    textAlign: "right",
  },
  statsLabel: {
    margin: 0,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#4f46e5",
  },
  statsValue: {
    margin: "8px 0 0",
    fontSize: "24px",
    color: "#111827",
  },
  subtitle: {
    margin: 0,
    color: "#e8501a",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "13px",
    fontWeight: 700,
  },
  title: {
    margin: "12px 0 8px",
    fontSize: "clamp(32px, 4vw, 44px)",
    color: "#16213e",
  },
  description: {
    margin: 0,
    maxWidth: "620px",
    color: "#5f6d7a",
    lineHeight: 1.7,
  },
  logoutButton: {
    padding: "14px 24px",
    background: "#f97316",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 14px 30px rgba(249, 115, 22, 0.18)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "24px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 14px 32px rgba(17, 24, 39, 0.08)",
    border: "1px solid #e5e7eb",
  },
  cardTop: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#eef2ff",
    color: "#4338ca",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "16px",
  },
  cardTitle: {
    fontSize: "16px",
    margin: "0 0 18px",
    color: "#1a1a2e",
    fontWeight: 700,
  },
  cardValue: {
    fontSize: "42px",
    margin: 0,
    color: "#16213e",
  },
  cardNote: {
    margin: "14px 0 0",
    color: "#6b7280",
    lineHeight: 1.7,
  },
};

export default Dashboard;
