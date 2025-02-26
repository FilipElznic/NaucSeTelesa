import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { CiCircleInfo, CiHeart } from "react-icons/ci";
import { useGlobalData } from "../Global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskLayout() {
  const [tasks, setTasks] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
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

    // Show toast notification
    toast(
      <div>
        <span
          className={`bg-gradient-to-r ${
            isCorrect
              ? "from-green-400 to-green-600"
              : "from-red-400 to-red-600"
          } bg-clip-text text-transparent font-bold`}
        >
          {isCorrect ? "Správná odpověď!" : "Špatná odpověď!"}
        </span>
      </div>,
      {
        className: isCorrect ? "toast-success" : "toast-error",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );

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
    <div className="bg-black min-h-screen flex flex-col items-center p-2 md:p-4 text-white">
      {/* Toast Container */}
      <ToastContainer
        toastClassName="bg-black border-2 border-white/10 rounded-lg shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
        progressClassName={({ defaultClassName }) =>
          `${defaultClassName} bg-gradient-to-r from-transparent to-white/10`
        }
      />

      <div className="w-full h-full bg-white/5 md:p-5 rounded-3xl">
        <div className="w-full flex flex-col gap-4 p-3 md:p-6 bg-white/9 backdrop-blur-lg rounded-3xl">
          <div className="w-full h-24 usergradient rounded-full usergradient-glow"></div>

          {tasks.map((task) => {
            const selectedAnswer = selectedAnswers[task.id];
            const correctAnswer = task.correctanswer;

            return (
              <div
                key={task.id}
                className="flex flex-col lg:flex-row gap-4 w-full min-h-[70vh]"
              >
                {/* Task Info */}
                <div className="w-full min-h-[40vh] md:min-h-[70vh] lg:w-3/5 usergradient rounded-3xl flex flex-col usergradient-glow">
                  <div className="w-full flex justify-between mt-4 lg:mt-16 p-5 px-5 lg:px-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl w-full md:w-3/4 userlvl3 pb-2">
                      {task.name}
                    </h1>
                    <p className="text-md md:text-lg lg:text-2xl text-zinc-300 hidden sm:block">
                      {task.xp} XP
                    </p>
                  </div>
                  <div className="w-full xl:w-3/4 p-3 lg:p-10 text-md sm:text-xl md:text-2xl text-gray-500 flex-grow">
                    {task.description}
                    <br />
                    {task.description2}
                  </div>
                  <div className="w-full flex justify-between text-xl lg:text-3xl p-10 mt-auto">
                    <CiCircleInfo />
                    <CiHeart />
                  </div>
                </div>

                {/* Answer Choices */}
                <div className="w-full h-[30vh] lg:h-[70vh] lg:w-1/5 usergradient rounded-3xl usergradient-glow">
                  <div className="h-full w-full flex justify-evenly flex-row lg:flex-col items-center">
                    {["answera", "answerb", "answerc"].map((option) => {
                      const answerText = task[option];
                      const isCorrect = answerText === correctAnswer;
                      const isSelected = answerText === selectedAnswer;

                      return (
                        <button
                          key={option}
                          className={`w-1/3 h-1/3 md:w-40 md:h-28 rounded-3xl flex justify-center items-center m-1 sm:m-4 usergradient-glow transition-colors ${
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
                          <p className="text-xl md:text-3xl">{answerText}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TaskLayout;
