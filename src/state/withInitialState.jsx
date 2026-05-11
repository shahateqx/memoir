import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { createPage } from "../utils/createPage";
import startPageScaffold from "./startPageScaffold.json";
import { nanoid } from "nanoid";
import { Loader } from "../components/Loader";

export const withInitialState = (WrappedComponent) => {
  return (props) => {
    const [initialState, setInitialState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id: slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          if (!slug) {
            const newSlug = nanoid();
            const newPage = await createPage(newSlug, "Untitled", startPageScaffold);
            navigate(`/${newPage.slug}`, { replace: true });
            return;
          }

          const { data, error } = await supabase
            .from("pages")
            .select("*")
            .eq("slug", slug)
            .single();

          if (error) {
            if (error.code === "PGRST116") { // Not found
              setError("Page not found");
              return;
            }
            throw error;
          }

          setInitialState(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchInitialState();
    }, [slug, navigate]);

    if (error) {
      return <div>Error loading page: {error}</div>;
    }

    if (loading || !initialState) {
      return <Loader />;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
};
