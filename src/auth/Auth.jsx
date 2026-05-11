import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuthSession } from "./AuthSessionContext";
import styles from "../utils.module.css";

export const Auth = ({ initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { session } = useAuthSession();

  if (session) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Registration successful! You are now logged in.");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authBox}>
      <h1 className={styles.authTitle}>{isLogin ? "Login to Memoir" : "Register for Memoir"}</h1>
        <p className={styles.authDesc}>
          {isLogin ? "Welcome back! Please enter your details." : "Create your account."}
        </p>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <input
            className={styles.authInput}
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.authInput}
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button className={styles.authButton} type="submit" disabled={loading}>
            {loading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setIsLogin(!isLogin); setMessage(""); }}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </p>
      {message && <p className={styles.authMessage}>{message}</p>}
    </div>
  );
};
