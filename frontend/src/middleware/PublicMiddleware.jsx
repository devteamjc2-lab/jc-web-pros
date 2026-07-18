import { Navigate } from "react-router-dom";

const PublicMiddleware = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PublicMiddleware;