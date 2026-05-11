import { supabase } from "../supabaseClient";
import { debounce } from "./debounce";

export const updatePage = debounce(async (page) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) return; // Silent return for unauthenticated updates

  const { error } = await supabase
    .from("pages")
    .update({
      title: page.title,
      nodes: page.nodes,
      cover: page.cover,
      updated_at: new Date().toISOString(),
    })
    .eq("id", page.id)
    .eq("created_by", userData.user.id); // Security measure

  if (error) {
    console.error("Error updating page:", error);
  }
}, 500);
