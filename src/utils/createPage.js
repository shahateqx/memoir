import { supabase } from "../supabaseClient";

export const createPage = async (slug, title, nodes = [], cover = null) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("pages")
    .insert([
      {
        slug,
        title,
        nodes,
        cover,
        created_by: userData.user.id,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};
