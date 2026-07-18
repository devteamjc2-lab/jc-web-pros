const AdminFooter = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <p style={styles.text}>© {new Date().getFullYear()} Horizon Admin. All rights reserved.</p>
        <p style={styles.version}>v1.0.0</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    padding: "18px 28px",
    background: "#111827",
    color: "#9ca3af",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  text: {
    margin: 0,
    fontSize: "13px",
  },
  version: {
    margin: 0,
    fontSize: "13px",
    opacity: 0.8,
  },
};

export default AdminFooter;
