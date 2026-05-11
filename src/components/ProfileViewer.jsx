import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuthSession } from "../auth/AuthSessionContext";
import styles from "./ProfileViewer.module.css";

export const ProfileViewer = () => {
  const { session } = useAuthSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully!");
      setNewPassword("");
    }
    setLoading(false);
  };

  const handleDeleteAccount = () => {
    alert("Deleting an account requires a secure Supabase Edge Function with a Service Role key. For now, this is just a UI placeholder.");
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setIsOpen(false);
  };

  if (!session) return null;

  return (
    <>
      <div className={styles.profileContainer}>
        <button className={styles.profileButton} onClick={toggleDropdown}>
          <div className={styles.avatar}>
            {session.user.email[0].toUpperCase()}
          </div>
          <span className={styles.emailText}>{session.user.email}</span>
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            <div className={styles.userInfo}>{session.user.email}</div>
            <hr className={styles.divider} />
            <button className={styles.dropdownItem} onClick={toggleSettings}>
              Account Settings
            </button>
            <button className={styles.dropdownItem} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {showSettings && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={() => setShowSettings(false)}>×</button>
            <h2>Account Settings</h2>
            
            <form onSubmit={handleUpdateAccount} className={styles.form}>
              <label>Update Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
                minLength={6}
                className={styles.input}
              />
              <button type="submit" className={styles.updateButton} disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
            
            {message && <p className={styles.message}>{message}</p>}

            <hr className={styles.modalDivider} />
            
            <div className={styles.dangerZone}>
              <h3>Danger Zone</h3>
              <p>Once you delete your account, there is no going back.</p>
              <button className={styles.deleteButton} onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
