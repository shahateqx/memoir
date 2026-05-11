import { supabase } from "../supabaseClient";
import { nanoid } from "nanoid";

export const uploadImage = async (file) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${nanoid()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
};
