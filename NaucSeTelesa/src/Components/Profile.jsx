import ProfilePic from "./ProfilePic";
import {
  PencilIcon,
  XMarkIcon,
  UserIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
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
    { key: "name", label: "Jméno", icon: <UserIcon className="w-5 h-5" /> },
    {
      key: "surname",
      label: "Příjmení",
      icon: <UserIcon className="w-5 h-5" />,
    },
    {
      key: "nickname",
      label: "Přezdívka",
      icon: <UserIcon className="w-5 h-5" />,
    },
  ];

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center  text-white">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-blue-400 rounded-full"></div>
          <div className="h-3 w-3 bg-purple-400 rounded-full"></div>
          <div className="h-3 w-3 bg-blue-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-full">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Váš profil
          </h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Main content card - Made taller for PC with min-height */}
        <div className="usergradient rounded-2xl shadow-2xl overflow-hidden min-h-[700px] lg:min-h-[800px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            {/* Profile picture section - Improved spacing */}
            <div className="lg:col-span-1 flex flex-col items-center justify-between py-8 px-4 lg:px-8 h-full">
              <div className="w-full flex flex-col items-center">
                <div className="mb-10 mt-6">
                  <ProfilePic />
                </div>
              </div>

              {/* Delete account button positioned at bottom */}
              <div className="w-full flex justify-center mb-8">
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-6 py-3 text-sm rounded-lg bg-red-900/30 border border-red-600/50 text-red-400 font-medium hover:bg-red-800/40 transition-colors"
                  >
                    Smazat účet
                  </button>
                ) : (
                  <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50 max-w-xs">
                    <p className="text-sm mb-3 text-red-200">
                      Opravdu chcete smazat svůj účet? Tato akce je nevratná.
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleDeleteAccount}
                        className="w-1/2 p-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                      >
                        Ano, smazat
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="w-1/2 p-2 text-sm rounded bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                      >
                        Zrušit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Profile form section - Made wider and taller */}
            <div className="lg:col-span-2 h-full flex items-center justify-center p-4 lg:p-8">
              <div className="bg-gray-800/30 rounded-2xl shadow-inner p-6 lg:p-10 w-full h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
                  Osobní údaje
                </h3>

                <div className="space-y-8 mt-6 flex-grow">
                  {fields.map((field) => (
                    <div key={field.key} className="group">
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        {field.label}
                      </label>
                      <div className="relative w-full lg:w-3/4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          {field.icon}
                        </div>
                        <input
                          type="text"
                          value={formData[field.key]}
                          onChange={(e) =>
                            handleInputChange(field.key, e.target.value)
                          }
                          className={`block w-full pl-10 pr-10 py-4 rounded-lg bg-gray-700/50 border text-white transition-all focus:outline-none focus:ring ${
                            editing[field.key]
                              ? "border-blue-500 ring-blue-500/50"
                              : "border-gray-600"
                          }`}
                          readOnly={!editing[field.key]}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          {editing[field.key] ? (
                            <CheckIcon
                              className="w-5 h-5 text-green-400 cursor-pointer"
                              onClick={() => handleEditToggle(field.key)}
                            />
                          ) : (
                            <PencilIcon
                              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-400 transition-colors"
                              onClick={() => handleEditToggle(field.key)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save button positioned at the bottom */}
                <div className="mt-auto pt-8">
                  <button
                    className="py-4 px-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:translate-y-[-2px] shadow-lg"
                    onClick={handleSaveChanges}
                  >
                    Uložit změny
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
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
    </div>
  );
}

export default Profile;
