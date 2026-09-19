import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "User" });
 
    const getAllUsers = async () => {
    try {
        const response = await fetch("https://jc-web-pros.onrender.com/api/users/get-all-users", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
     const data = await response.json();
    console.log("Response:", data);
    if (data.success) {
        console.log("Users:", data.users);
        setUsers(data.users);
    } else {
        setErrors({
        apiError: data.message,
        });
    }

        } catch (error) {
        console.error("API Error:", error);
        setErrors({
            apiError: "Something went wrong",
        });
  }
}
 useEffect(() => {
    document.title = "Users | Admin";

    getAllUsers();
  }, []);
const setUsersList = (newUsers) => {
  setUsers(newUsers);
};
  const createUser = async (event) => {
    event.preventDefault();
    const admin = JSON.parse(localStorage.getItem("user") || "null");
    setIsSaving(true);
    setErrors({});
    try {
      const response = await fetch("https://jc-web-pros.onrender.com/api/users/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, adminId: admin?.id }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to add user");
      setUsers((currentUsers) => [...currentUsers, data.user]);
      setForm({ name: "", email: "", password: "", role: "User" });
      setIsModalOpen(false);
    } catch (error) {
      setErrors({ apiError: error.message });
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.subtitle}>User Management</p>
          <h1 style={styles.title}>Users</h1>
        </div>
        <button style={styles.button} onClick={() => setIsModalOpen(true)}>Add User</button>
      </section>
      {errors.apiError && <p style={styles.error}>{errors.apiError}</p>}
      {isModalOpen && (
        <div style={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <form style={styles.modal} onSubmit={createUser} onClick={(event) => event.stopPropagation()}>
            <h2 style={styles.modalTitle}>Add User</h2>
            <input style={styles.input} placeholder="Name" value={form.name} required onChange={(event) => setForm({ ...form, name: event.target.value })} />
            <input style={styles.input} type="email" placeholder="Email" value={form.email} required onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <input style={styles.input} type="password" placeholder="Password" value={form.password} required minLength={6} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            <select style={styles.input} value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <div style={styles.modalActions}>
              <button type="button" style={styles.cancelButton} onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" style={styles.button} disabled={isSaving}>{isSaving ? "Saving..." : "Create User"}</button>
            </div>
          </form>
        </div>
      )}

      <section style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}><span style={styles.status}>{user.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

const styles = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px 48px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
    flexWrap: "wrap",
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
    margin: "8px 0 0",
    fontSize: "28px",
    color: "#111827",
  },
  button: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px 10px",
    borderBottom: "1px solid #e5e7eb",
    color: "#6b7280",
    fontSize: "13px",
    textTransform: "uppercase",
  },
  td: {
    padding: "14px 10px",
    borderBottom: "1px solid #f3f4f6",
    color: "#374151",
  },
  status: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#ecfdf5",
    color: "#047857",
    fontSize: "12px",
    fontWeight: 700,
  },
  error: {
    color: "#b91c1c",
    margin: "0 auto 16px",
    maxWidth: "1200px",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    display: "grid",
    placeItems: "center",
    padding: "20px",
    background: "rgba(15, 23, 42, 0.45)",
    zIndex: 20,
  },
  modal: {
    width: "min(460px, 100%)",
    display: "grid",
    gap: "14px",
    padding: "26px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.2)",
  },
  modalTitle: { margin: 0, color: "#111827" },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "14px",
  },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "6px" },
  cancelButton: {
    padding: "12px 18px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    background: "#fff",
    cursor: "pointer",
  },
};

export default Users;
