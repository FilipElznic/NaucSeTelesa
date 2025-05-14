import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { useGlobalData } from "../Global";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const STORAGE_BUCKET = "profile-pictures";

function ProfilePic() {
  const { authUser, userData } = useGlobalData();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Fetch the profile picture URL
  useEffect(() => {
    if (userData?.img) {
      fetchProfilePictureUrl(userData.img);
    }
  }, [userData?.img]);

  // Create a function to fetch the profile picture URL
  const fetchProfilePictureUrl = useCallback(async (imagePath) => {
    try {
      const { data, error } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(imagePath);

      if (error) {
        console.error("Error fetching public URL:", error);
        toast.error("Nepodařilo se načíst profilový obrázek.");
      } else if (data?.publicUrl) {
        setProfilePictureUrl(data.publicUrl);
      }
    } catch (error) {
      console.error("Unexpected error fetching URL:", error);
    }
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error("Nepodporovaný formát souboru. Použijte JPG, PNG nebo WebP.");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `Soubor je příliš velký. Maximální velikost je ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB.`
      );
      return;
    }

    setSelectedFile(file);
    setIsFileSelected(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);
  };

  // Compress image before upload
  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Determine new dimensions (max 800px width or height)
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;

          if (width > height && width > maxDimension) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw image on canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to Blob
          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
              );
            },
            "image/jpeg",
            0.7
          ); // 0.7 quality gives good compression
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  // Delete profile picture

  // Upload profile picture
  const uploadProfilePicture = async () => {
    if (!selectedFile || !authUser) {
      toast.error("Nebyl vybrán žádný soubor nebo uživatel není přihlášen.");
      return;
    }

    try {
      setIsUploading(true);

      // Compress the image before upload
      const compressedFile = await compressImage(selectedFile);

      // Generate unique file path
      const filePath = `user-${authUser.id}/${uuidv4()}.jpg`;

      // Delete old profile picture if exists
      if (userData?.img) {
        const { error: deleteError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .remove([userData.img]);

        if (deleteError) {
          console.error("Error deleting old file:", deleteError.message);
          toast.warning(
            "Nepodařilo se odstranit starý obrázek, ale pokračuji v nahrávání nového."
          );
        }
      }

      // Upload the new profile picture
      const { data, error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, compressedFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("Error uploading file:", uploadError.message);
        toast.error("Chyba při nahrávání obrázku.");
        return;
      }

      // Update the database with the new image path
      const { error: dbError } = await supabase
        .from("user")
        .update({ img: filePath })
        .eq("id", userData.id);

      if (dbError) {
        console.error("Error updating user profile:", dbError.message);
        toast.error("Chyba při aktualizaci profilu uživatele.");

        // Clean up the uploaded file if we can't update the database
        await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
        return;
      }

      // Fetch the new image public URL
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Error fetching public URL:", urlError);
        toast.warning("Obrázek byl nahrán, ale nelze ho zobrazit.");
      } else {
        setProfilePictureUrl(publicUrlData.publicUrl);
        toast.success("Profilový obrázek byl úspěšně aktualizován!");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Neočekávaná chyba při nahrávání obrázku.");
    } finally {
      setIsFileSelected(false);
      setPreviewUrl(null);
      setSelectedFile(null);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full justify-center">
      {/* Profile Image Display */}
      {!isFileSelected && profilePictureUrl ? (
        <div className="relative">
          <img
            src={profilePictureUrl}
            alt="Profile"
            className="rounded-full w-52 h-52 mb-6 shadow-lg border-4 border-blue-500 hover:border-purple-600 transition-all object-cover"
          />
        </div>
      ) : isFileSelected && previewUrl ? (
        <div className="mb-6">
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded-full w-32 h-32 shadow-lg border-4 border-blue-500 object-cover"
          />
        </div>
      ) : (
        <div className="mb-6 flex flex-col items-center text-gray-400">
          <PhotoIcon className="w-20 h-20 mb-2" />
          <p className="italic">Přidejte si prosím profilový obrázek.</p>
        </div>
      )}

      {/* Upload Controls */}
      <div className="w-full flex flex-row justify-center">
        <label className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg relative m-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50">
          {isUploading ? "Nahrávání..." : "Vybrat obrázek"}
          <input
            type="file"
            onChange={handleFileChange}
            accept={ACCEPTED_FILE_TYPES.join(", ")}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
        </label>

        {isFileSelected && (
          <button
            onClick={uploadProfilePicture}
            disabled={isUploading}
            className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg m-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isUploading ? "Nahrávání..." : "Uložit"}
          </button>
        )}
      </div>

      {/* Image requirements info */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        <p>Podporované formáty: JPG, PNG, WebP</p>
        <p>Maximální velikost: {MAX_FILE_SIZE / (1024 * 1024)}MB</p>
      </div>
    </div>
  );
}

export default ProfilePic;
