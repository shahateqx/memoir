import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuthSession } from "../auth/AuthSessionContext";
import { ProfileViewer } from "./ProfileViewer";
import { createPage } from "../utils/createPage";
import startPageScaffold from "../state/startPageScaffold.json";
import { nanoid } from "nanoid";
import cx from "classnames";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { session } = useAuthSession();
  const [pages, setPages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const { id: currentSlug } = useParams();

  useEffect(() => {
    if (!session?.user) return;

    const fetchPages = async () => {
      const { data } = await supabase
        .from("pages")
        .select("id, slug, title")
        .eq("created_by", session.user.id)
        .order("created_at", { ascending: true });
      
      if (data) setPages(data);
    };

    fetchPages();

    const subscription = supabase
      .channel('pages_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pages', filter: `created_by=eq.${session.user.id}` }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setPages(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setPages(prev => prev.map(p => p.id === payload.new.id ? payload.new : p));
        } else if (payload.eventType === 'DELETE') {
          setPages(prev => prev.filter(p => p.id !== payload.old.id));
        }
      })
      .subscribe();

    const handleTitleUpdate = (e) => {
      const { slug, title } = e.detail;
      setPages(prev => prev.map(p => p.slug === slug ? { ...p, title } : p));
    };

    window.addEventListener('page-title-updated', handleTitleUpdate);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('page-title-updated', handleTitleUpdate);
    };
  }, [session]);

  const handleAddPage = async () => {
    try {
      const newSlug = nanoid();
      const newPage = await createPage(newSlug, "Untitled", startPageScaffold);
      setPages(prev => [...prev, newPage]); // Manually update in case realtime is off
      navigate(`/${newPage.slug}`);
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  const handleDeletePage = async (e, id, slug) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const { error } = await supabase.from("pages").delete().eq("id", id);
      if (error) throw error;
      
      // Remove from local state just in case realtime is slow
      setPages(prev => prev.filter(p => p.id !== id));
      
      if (currentSlug === slug) {
        navigate("/");
      }
    } catch (err) {
      console.error("Error deleting page:", err);
    }
  };

  const filteredPages = pages.filter(page => 
    (page.title || "Untitled").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoInfo}>
          <div className={styles.logoBox}>M</div>
          <span className={styles.workspaceName}>Memoir</span>
        </div>
      </div>
      
      <div className={styles.actions}>
        {isSearchActive ? (
          <input 
            type="text" 
            autoFocus 
            className={styles.searchInput} 
            placeholder="Search pages..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => !searchQuery && setIsSearchActive(false)}
          />
        ) : (
          <div className={styles.actionItem} onClick={() => setIsSearchActive(true)}>
            🔍 Search
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>PRIVATE</div>
        <div className={styles.pageList}>
          {filteredPages.map((page) => (
            <Link 
              key={page.id} 
              to={`/${page.slug}`} 
              className={cx(styles.pageLink, { [styles.active]: currentSlug === page.slug })}
            >
              <div className={styles.pageLinkText}>📄 {page.title || "Untitled"}</div>
              <button 
                className={styles.deletePageBtn} 
                onClick={(e) => handleDeletePage(e, page.id, page.slug)}
                title="Delete page"
              >
                ×
              </button>
            </Link>
          ))}
        </div>
        <button className={styles.addPageBtn} onClick={handleAddPage}>
          + Add a page
        </button>
      </div>

      <div className={styles.bottomActions}>
         <ProfileViewer />
      </div>
    </div>
  );
};
