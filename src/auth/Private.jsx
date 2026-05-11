import { Navigate } from "react-router-dom";
import { useAuthSession } from "./AuthSessionContext";

export const Private = ({ component }) => {
  const { session, loading } = useAuthSession();

  if (loading) {
    return <div>Loading...</div>; // Could replace with Loader later
  }

  return session ? component : <Navigate to="/" />;
};
