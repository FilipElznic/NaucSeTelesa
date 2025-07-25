import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useGlobalData } from "../Global"; // Import global context
import "../App.css";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const { userData } = useGlobalData();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .order("xp", { ascending: false }); // Sort by XP in descending order

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data.slice(0, 10)); // Only store top 10 users
      }
    };

    fetchUsers();
  }, [userData]);

  return (
    <div className="usergradient rounded-3xl w-full  text-white p-4 font-sans">
      <div className="min-w-3xl mx-auto">
        <div className="grid grid-cols-3 gap-4 p-4 bg-transparent rounded-lg shadow-lg">
          <div className="text-lg font-semibold text-purple-400">Place</div>
          <div className="text-lg font-semibold text-purple-400">User</div>
          <div className="text-lg text-right font-semibold text-purple-400">
            Level
          </div>
        </div>

        {/* Scrollable leaderboard container with hidden scrollbar */}
        <div className="h-96 overflow-y-auto no-scrollbar ">
          {users.length == 0 ? (
            <h1 className="text-center text-lg font-semibold text-purple-400">
              Loading leaderboard...
            </h1>
          ) : (
            users.map((user, index) => (
              <div
                key={user.id}
                className={`grid grid-cols-3 gap-4 p-4 rounded-lg shadow-lg mt-2 transition-all duration-300 
      ${
        user.id === userData.id
          ? "userlvl2 text-white font-bold"
          : "bg-zinc-800 hover:bg-gray-700"
      }
    `}
              >
                <div className="text-lg font-medium">{`#${index + 1}`}</div>
                <div className="text-lg font-medium">
                  {user.name && user.surname
                    ? `${user.name} ${user.surname}`
                    : "Neznámý uživatel"}
                </div>
                <div className="text-lg font-medium text-right">
                  {Math.floor(user.xp / 100)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
