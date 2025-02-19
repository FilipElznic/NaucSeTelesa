import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useGlobalData } from "../Global";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers by task ID
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
    // Prevent multiple submissions
    if (selectedAnswers[taskId]) return;

    const task = tasks.find((t) => t.id === taskId);
    const isCorrect = task.correctanswer === answer;

    // Update selected answer
    setSelectedAnswers((prev) => ({ ...prev, [taskId]: answer }));

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
      } else {
        console.log("Task successfully added to finishedtasks.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen  text-white flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 py-5">
          Task Page
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {tasks.map((task) => {
            const selectedAnswer = selectedAnswers[task.id];
            const correctAnswer = task.correctanswer;

            return (
              <li
                key={task.id}
                className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <h2 className="text-xl font-bold mb-4 text-purple-400">
                  {task.name}
                </h2>
                <p className="text-gray-300 mb-2">{task.description}</p>
                <div className="text-sm text-gray-400 space-y-2">
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
                            : "bg-gray-700 hover:bg-gray-600"
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
      </div>

      <Footer />
    </>
  );
}

export default TaskPage;
