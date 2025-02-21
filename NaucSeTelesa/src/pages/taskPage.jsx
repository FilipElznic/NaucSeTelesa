import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useGlobalData } from "../Global";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [popup, setPopup] = useState(null);
  const { userData, refreshUserData } = useGlobalData();

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data);
      }
    };

    fetchTasks();
  }, []);

  const handleAnswerClick = async (taskId, answer) => {
    if (selectedAnswers[taskId]) return;

    const task = tasks.find((t) => t.id === taskId);
    const isCorrect = task.correctanswer === answer;
    setSelectedAnswers((prev) => ({ ...prev, [taskId]: answer }));

    setPopup({
      message: isCorrect ? "Správná odpověď!" : "Špatná odpověď!",
      isCorrect,
    });
    setTimeout(() => setPopup(null), 2000);

    if (isCorrect) {
      try {
        await supabase.rpc("increment_user_xp", {
          user_id: userData.id,
          xp_amount: task.xp,
        });
        await refreshUserData();
      } catch (error) {
        console.error("XP update error:", error);
      }

      const { error } = await supabase.from("finishedtasks").insert({
        iduser: userData.id,
        idtask: taskId,
      });

      if (error) {
        console.error("Error inserting into finishedtasks:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 py-5">
          Task Page
        </h1>
        <ul className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {tasks.map((task) => {
            const selectedAnswer = selectedAnswers[task.id];
            const correctAnswer = task.correctanswer;

            return (
              <li
                key={task.id}
                className="bg-zinc-800 rounded-lg p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <h2 className="text-xl font-bold mb-4 text-purple-400">
                  {task.name}
                </h2>
                <p className="text-gray-300 mb-2">{task.description}</p>
                <div className="text-sm text-white space-y-2">
                  {["answera", "answerb", "answerc"].map((option) => {
                    const answerText = task[option];
                    const isCorrect = answerText === correctAnswer;
                    const isSelected = answerText === selectedAnswer;

                    return (
                      <button
                        key={option}
                        className={`block w-full py-2 px-4 rounded-lg transition-colors ${
                          selectedAnswer
                            ? isCorrect
                              ? "bg-green-500"
                              : isSelected
                              ? "bg-red-500"
                              : "bg-gray-700 opacity-50"
                            : "bg-zinc-700 hover:bg-zinc-600"
                        }`}
                        onClick={() => handleAnswerClick(task.id, answerText)}
                        disabled={!!selectedAnswer}
                      >
                        {answerText}
                      </button>
                    );
                  })}
                </div>
                <p className="text-yellow-400 mt-4">XP: {task.xp}</p>
              </li>
            );
          })}
        </ul>
        {popup && (
          <div
            className={`fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white text-lg transition-opacity duration-500 bg-gradient-to-r ${
              popup.isCorrect
                ? "from-green-800 to-green-500 border-green-400"
                : "from-red-800 to-red-500 border-red-400"
            } border-2`}
          >
            {popup.message}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default TaskPage;
