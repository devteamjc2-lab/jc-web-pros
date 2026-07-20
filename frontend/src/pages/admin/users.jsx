import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
 
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
  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.subtitle}>User Management</p>
          <h1 style={styles.title}>Users</h1>
        </div>
        <button style={styles.button}>Add User</button>
      </section>

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
};

export default Users;
