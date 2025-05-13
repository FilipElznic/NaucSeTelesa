import ProfilePic from "./ProfilePic";
import { PencilIcon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { useGlobalData } from "../Global";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function Profile() {
  const { userData, loading, setAuthUser } = useGlobalData();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    nickname: "",
  });

  const [editing, setEditing] = useState({
    name: false,
    surname: false,
    nickname: false,
  });

  const [fetching, setFetching] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData?.id) {
        setFetching(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user")
          .select("name, surname, nickname")
          .eq("id", userData.id)
          .single();

        if (error) {
          console.error("Error fetching user data:", error.message);
          toast.error("Chyba při načítání dat uživatele.");
        } else {
          setFormData({
            name: data?.name || "",
            surname: data?.surname || "",
            nickname: data?.nickname || "",
          });
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("Neočekávaná chyba při načítání dat.");
      } finally {
        setFetching(false);
      }
    };

    fetchUserData();
  }, [userData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChanges = async () => {
    if (!userData?.id) {
      toast.error("Uživatel není přihlášen.");
      return;
    }

    try {
      const { error } = await supabase
        .from("user")
        .update({
          name: formData.name,
          surname: formData.surname,
          nickname: formData.nickname,
        })
        .eq("id", userData.id);

      if (error) {
        console.error("Error updating profile:", error.message);
        toast.error("Chyba při ukládání změn profilu.");
      } else {
        toast.success("Profil byl úspěšně aktualizován!");
        setEditing({ name: false, surname: false, nickname: false });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Neočekávaná chyba při ukládání změn.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!userData?.id) {
      toast.error("Uživatel není přihlášen.");
      return;
    }

    try {
      // First, delete profile picture from storage if exists and not default
      if (userData?.img && userData.img !== "guest1.png") {
        const { error: deleteImageError } = await supabase.storage
          .from("profile-pictures")
          .remove([userData.img]);

        if (deleteImageError) {
          console.error(
            "Error deleting profile image:",
            deleteImageError.message
          );
          // Continue anyway, this is not critical
        }
      }

      // Delete user from database
      const { error: deleteUserError } = await supabase
        .from("user")
        .delete()
        .eq("id", userData.id);

      if (deleteUserError) {
        console.error("Error deleting user record:", deleteUserError.message);
        toast.error("Chyba při mazání účtu.", deleteUserError.message);
        return;
      }
      console.log(userData);
      // Sign out from Supabase Auth
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        console.error("Error signing out:", signOutError.message);
        toast.error("Účet byl smazán, ale nepodařilo se odhlásit.");
      } else {
        // Reset auth state in the app

        toast.success("Váš účet byl úspěšně smazán.");
        // Redirect to homepage after a short delay
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.error("Unexpected error during account deletion:", error);
      toast.error("Neočekávaná chyba při mazání účtu.");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  // Form fields configuration for cleaner rendering
  const fields = [
    { key: "name", label: "Jméno" },
    { key: "surname", label: "Příjmení" },
    { key: "nickname", label: "Přezdívka" },
  ];

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-white rounded-full"></div>
          <div className="h-3 w-3 bg-white rounded-full"></div>
          <div className="h-3 w-3 bg-white rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-8">
        <div className="bg-black text-white p-6 rounded-xl shadow-2xl w-full max-w-4xl usergradient">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Váš profil
            </h2>
            <XMarkIcon
              className="cursor-pointer w-6 h-6 text-white hover:text-gray-300 transition-colors"
              onClick={() => (window.location.href = "/")}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile picture section */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <ProfilePic />
            </div>

            {/* Profile details section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
              <div className="bg-gray-800 bg-opacity-30 p-5 rounded-lg shadow-inner">
                {fields.map((field) => (
                  <div className="mb-4" key={field.key}>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      {field.label}
                      <div className="flex items-center mt-2">
                        <input
                          type="text"
                          value={formData[field.key]}
                          onChange={(e) =>
                            handleInputChange(field.key, e.target.value)
                          }
                          className={`w-full p-2 rounded-lg bg-gray-700 bg-opacity-50 border text-white transition-all focus:outline-none focus:ring-2 ${
                            editing[field.key]
                              ? "border-blue-500 ring-blue-500"
                              : "border-gray-600"
                          }`}
                          readOnly={!editing[field.key]}
                        />
                        <PencilIcon
                          className="cursor-pointer w-5 h-5 text-white hover:text-blue-400 transition-colors ml-2 flex-shrink-0"
                          onClick={() => handleEditToggle(field.key)}
                        />
                      </div>
                    </label>
                  </div>
                ))}

                <button
                  className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium mt-4 hover:opacity-90 transition-all transform hover:scale-105"
                  onClick={handleSaveChanges}
                >
                  Uložit změny
                </button>
              </div>

              {/* Delete account section */}
              <div className="mt-6">
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full p-3 rounded-lg bg-red-500 bg-opacity-80 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Smazat účet
                  </button>
                ) : (
                  <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg border border-red-500">
                    <p className="text-sm mb-3 text-center">
                      Opravdu chcete smazat svůj účet? Tato akce je nevratná.
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleDeleteAccount}
                        className="w-1/2 p-2 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                      >
                        Ano, smazat
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="w-1/2 p-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                      >
                        Zrušit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Profile;
