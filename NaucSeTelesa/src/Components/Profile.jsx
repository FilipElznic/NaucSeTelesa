import ProfilePic from "./ProfilePic";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useGlobalData } from "../Global"; // Import global context
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function Profile() {
  const { userData, loading } = useGlobalData();
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

  const [fetching, setFetching] = useState(true); // State to manage data fetching

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (userData?.id) {
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
        }
      }
      setFetching(false);
    };

    fetchUserData();
  }, [userData]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEditToggle = (field) => {
    setEditing({ ...editing, [field]: !editing[field] });
  };

  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase
        .from("user")
        .update({
          name: formData.name,
          surname: formData.surname,
          nickname: formData.nickname,
        })
        .eq("id", userData?.id);

      if (error) {
        console.error("Error updating profile:", error.message);
        toast.error("Chyba při ukládání změn profilu.");
      } else {
        toast.success("Profil byl úspěšně aktualizován!");
        setEditing({ name: false, surname: false, nickname: false }); // Reset editing states
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Neočekávaná chyba při ukládání změn.");
    }
  };

  if (loading || fetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bgplanet text-white px-4">
        <div
          className="bg-black text-white p-6 rounded-lg w-full sm:w-3/5 md:w-2/5 lg:w-1/3 bg-opacity-40 border-2 border-gray-700 backdrop-blur-sm"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold">Profil</h2>
            <IoMdClose
              className="cursor-pointer"
              onClick={() => (window.location.href = "/")}
            />
          </div>
          <ProfilePic />

          <div className="w-full flex flex-col justify-center text-center">
            {["name", "surname", "nickname"].map((field) => (
              <div className="my-4" key={field}>
                <label>
                  {field === "name"
                    ? "Jméno"
                    : field === "surname"
                    ? "Příjmení"
                    : "Přezdívka"}
                  <div className="flex justify-evenly items-center mt-2">
                    <input
                      type="text"
                      value={formData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-3/5 lg:w-2/3 p-2 rounded-3xl bg-opacity-10 bg-gray-600 border-2 text-white mr-2"
                      readOnly={!editing[field]}
                    />
                    <FaRegEdit
                      className="cursor-pointer"
                      onClick={() => handleEditToggle(field)}
                    />
                  </div>
                </label>
              </div>
            ))}
            <button
              className="w-full p-2 rounded-md userlvl2 text-white mt-4"
              onClick={handleSaveChanges}
            >
              Uložit změny
            </button>
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
