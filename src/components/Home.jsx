import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuthSession } from "../auth/AuthSessionContext";
import { createPage } from "../utils/createPage";
import startPageScaffold from "../state/startPageScaffold.json";
import { nanoid } from "nanoid";
import { Loader } from "./Loader";

export const Home = () => {
  const { session } = useAuthSession();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrCreateDefaultPage = async () => {
      if (!session) return;
      
      const { data } = await supabase
        .from("pages")
        .select("slug")
        .eq("created_by", session.user.id)
        .order("updated_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        navigate(`/${data[0].slug}`, { replace: true });
      } else {
        const newSlug = nanoid();
        const newPage = await createPage(newSlug, "Getting Started", startPageScaffold);
        navigate(`/${newPage.slug}`, { replace: true });
      }
    };

    fetchOrCreateDefaultPage();
  }, [session, navigate]);

  return <Loader />;
};
