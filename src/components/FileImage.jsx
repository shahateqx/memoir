import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Loader } from "./Loader";

export const FileImage = ({ filePath, className }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filePath) {
      if (filePath.startsWith("http")) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setImage(filePath);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
      } else {
        const { data } = supabase.storage.from("images").getPublicUrl(filePath);
        if (data?.publicUrl) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setImage(data.publicUrl);
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
      }
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    }
  }, [filePath]);

  if (loading) return <Loader />;
  if (!image) return null;

  return <img src={image} alt="File representation" className={className} />;
};
