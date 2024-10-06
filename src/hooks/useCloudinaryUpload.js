import { useState } from "react";
import axios from "axios";

const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const postToCloudinary = async (file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_PRESET_UPLOAD);

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );

      setUploading(false);
      return data.secure_url;
    } catch (err) {
      setUploading(false);
      setError(err);
      console.error("Error uploading file: ", err);
      return null;
    }
  };

  return { postToCloudinary, uploading, error };
};

export default useCloudinaryUpload;
