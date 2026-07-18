import { BrowserRouter, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminHeader from "./components/admin/AdminHeader";
import AdminFooter from "./components/admin/AdminFooter";
import AppRoutes from "./routes/AppRoutes";

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname === "/dashboard";
  const isChatRoute = location.pathname === "/chat";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: isAdminRoute ? "#e2e8f0" : "#fff" }}>
      {isAdminRoute ? <AdminHeader /> : null}

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!isAdminRoute && !isChatRoute ? <Header /> : null}

        <main style={{ flex: 1, minHeight: "100vh", padding: isAdminRoute ? "28px 30px" : "0" }}>
          <AppRoutes />
        </main>

        {!isAdminRoute && !isChatRoute ? <Footer /> : isAdminRoute ? <AdminFooter /> : null}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;