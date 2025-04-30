import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useGlobalData } from "../Global";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfilePic() {
  const { authUser, userData } = useGlobalData();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false); // Track if a file is selected

  // If the user already has a profile picture, fetch the public URL
  if (userData?.img && !profilePictureUrl) {
    const { data: publicUrlData, error } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(userData.img);

    if (error) {
      console.error("Error fetching public URL:", error);
      toast.error("Nepodařilo se načíst profilový obrázek.");
    } else {
      setProfilePictureUrl(publicUrlData.publicUrl);
    }
  }

  // Upload the profile picture
  async function uploadProfilePicture() {
    if (!selectedFile) {
      toast.error("Nebyl vybrán žádný soubor.");
      return;
    }

    if (!authUser) {
      toast.error("Uživatel není přihlášen.");
      return;
    }

    const filePath = `user-${authUser.id}/${authUser.id}-${uuidv4()}.png`;

    // Step 1: If user already has a profile picture, delete the old one
    if (userData.img) {
      const { error: deleteError } = await supabase.storage
        .from("profile-pictures")
        .remove([userData.img]);

      if (deleteError) {
        console.error("Error deleting old file:", deleteError.message);
        toast.warning(
          "Nepodařilo se odstranit starý obrázek, ale pokračuji v nahrávání nového."
        );
      }
    }

    // Step 2: Upload the new profile picture
    const { data, error: uploadError } = await supabase.storage
      .from("profile-pictures") // Ensure bucket name is correct
      .upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: true, // Prevent overwriting existing files with the same name
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      toast.error("Chyba při nahrávání obrázku.");
      return;
    }

    // Step 3: Update the database with the new image path
    const { error: dbError } = await supabase
      .from("user")
      .update({ img: filePath })
      .eq("authid", authUser.id);

    if (dbError) {
      console.error("Error updating user profile:", dbError.message);
      toast.error("Chyba při aktualizaci profilu uživatele.");
      return;
    }

    // Fetch the new image public URL
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("profile-pictures") // Ensure bucket name is correct
      .getPublicUrl(filePath);

    if (urlError) {
      console.error("Error fetching public URL:", urlError);
      toast.warning("Obrázek byl nahrán, ale nelze ho zobrazit.");
    } else {
      setProfilePictureUrl(publicUrlData.publicUrl);
      setIsFileSelected(false); // Reset the state after upload
      toast.success("Profilový obrázek byl úspěšně aktualizován!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {!isFileSelected && profilePictureUrl ? (
        <img
          src={profilePictureUrl}
          alt="Profile Picture"
          className="rounded-full w-32 h-32 mb-6 shadow-lg border-4 border-blue-500 hover:border-purple-600 transition-all object-cover"
        />
      ) : isFileSelected && selectedFile ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 w-64">
          <DocumentIcon className="text-gray-500 w-10  h-10 mb-4" />
          <span className="text-gray-700 text-sm">{selectedFile.name}</span>
        </div>
      ) : (
        <p className="mb-6 text-gray-400 italic">
          Přidejte si prosím profilový obrázek.
        </p>
      )}

      <div className="w-full flex flex-row justify-center">
        <label className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg relative m-2">
          Vybrat obrázek
          <input
            type="file"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              setIsFileSelected(true); // Show file details when a file is selected
            }}
            accept="image/jpeg, image/png" // Restrict the file types to JPG, JPEG, PNG
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>

        {isFileSelected && (
          <button
            onClick={uploadProfilePicture}
            className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-6 rounded-lg m-2"
          >
            Uložit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePic;
