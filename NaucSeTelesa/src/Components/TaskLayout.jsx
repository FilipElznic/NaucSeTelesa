import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useGlobalData } from "../Global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import KnowHow from "./KnowHow";

function TaskLayout() {
  const [tasks, setTasks] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [shuffledOptions, setShuffledOptions] = useState({});
  const { userData, refreshUserData } = useGlobalData();

  const resetTasks = async () => {
    try {
      const { error } = await supabase.rpc("reset_tasks", {
        user_id: userData.id,
      });
      if (error) throw error;
      setTasks([]); // Clear tasks from state
    } catch (error) {
      console.error("Error resetting tasks:", error);
    }
    window.location.href = "/ukoly"; // Redirect to the tasks page

    toast.success("Úkoly byly úspěšně obnoveny!");
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  // Create randomized answer options for each task
  useEffect(() => {
    const options = {};
    tasks.forEach((task) => {
      // Create a shuffled order of answer options for this task
      options[task.id] = shuffleArray(["answera", "answerb", "answerc"]);
    });
    setShuffledOptions(options);
  }, [tasks]);

  useEffect(() => {
    if (!userData || !userData.id) return; // Prevents fetching if userData is not available

    const fetchTasks = async () => {
      const { data, error } = await supabase.rpc("get_unfinished_tasks", {
        user_id: userData.id,
      });

      if (error) {
        console.error("Error fetching unfinished tasks:", error);
      } else {
        setTasks(data);
      }
    };

    fetchTasks();
  }, [userData]); // Runs when userData changes

  const handleAnswerClick = async (taskId, answer) => {
    if (!userData || !userData.id) return; // Prevents action if userData is missing
    if (selectedAnswers[taskId]) return;

    const task = tasks.find((t) => t.id === taskId);
    const isCorrect = task.correctanswer === answer;
    setSelectedAnswers((prev) => ({ ...prev, [taskId]: answer }));

    // Show toast notification
    {
      isCorrect
        ? toast.success("Správná odpověď!")
        : toast.error("Špatná odpověď!");
    }

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

  // Prevents rendering before userData is available
  if (!userData) {
    return <div className="text-white text-center mt-10">Načítání...</div>;
  }

  // Function to shuffle task order
  const shuffleTasks = () => {
    setTasks(shuffleArray([...tasks]));
  };

  return (
    <>
      <div className="bg-gradient-to-br from-black via-zinc-950  to-black  min-h-screen flex flex-col items-center p-2 sm:p-5 md:px-10 text-white">
        <div className="w-full h-full bg-black md:p-5 rounded-3xl">
          <KnowHow
            title="Jak na úkoly?"
            text="Každý úkol obsahuje otázku doplněnou krátkým vysvětlením. Uživatel má na výběr ze tří možných odpovědí, z nichž pouze jedna je správná. Cílem je zvolit správnou odpověď na základě poskytnutých informací."
            img="/taskshow.png"
            alt="Jak to funguje?"
          />
          <div className="w-full flex flex-col gap-4 p-3 md:p-6 bg-white/9 backdrop-blur-lg rounded-3xl">
            <div className="w-full h-24 usergradient rounded-full usergradient-glow">
              <div className="h-full flex flex-row justify-between items-center">
                <div className="flex-row w-full h-full  md:p-10 flex items-center gap-10 ">
                  <span
                    className="flex flex-row cursor-pointer items-center gap-2 lg:text-3xl text-2xl ml-4"
                    onClick={() => (window.location.href = "/")}
                  >
                    <HomeIcon className="w-7 h-7 text-white" />
                    <p className="hidden sm:block">Domů</p>
                  </span>
                  <span
                    className="flex flex-row cursor-pointer items-center gap-2 lg:text-3xl text-2xl"
                    onClick={() => (window.location.href = "/ukoly")}
                  >
                    <ArrowPathIcon className="w-7 h-7 text-white" />
                    <p className="hidden sm:block">Obnovit</p>
                  </span>
                  <span
                    className="flex flex-row cursor-pointer items-center gap-2 lg:text-3xl text-2xl"
                    onClick={shuffleTasks}
                  >
                    <ArrowsRightLeftIcon className="w-7 h-7 text-white" />
                    <p className="hidden sm:block">Zamíchat</p>
                  </span>
                </div>

                <span
                  className="flex flex-row cursor-pointer items-center gap-2   text-3xl mr-5"
                  onClick={() => (window.location.href = "/")}
                >
                  <p className="hidden sm:block text-2xl lg:text-3xl">Zavřít</p>
                  <XMarkIcon className="w-7 h-7  lg:mr-10" />
                </span>
              </div>
            </div>

            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full bg-transparent mt-11">
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-4">
                  Žádné úkoly k zobrazení
                </h1>
                <p className="text-lg md:text-xl text-center mb-4">
                  Všechny úkoly byly dokončeny.
                </p>
                <button
                  className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() => resetTasks()}
                >
                  Obnovit úkoly
                </button>
              </div>
            )}
            {tasks.map((task) => {
              const selectedAnswer = selectedAnswers[task.id];
              const correctAnswer = task.correctanswer;
              // Use the shuffled options for this task, or default if not yet set
              const taskOptions = shuffledOptions[task.id] || [
                "answera",
                "answerb",
                "answerc",
              ];

              return (
                <div
                  key={task.id}
                  className="flex flex-col lg:flex-row gap-4 w-full min-h-[70vh] h-full "
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
                    <div className="w-full flex justify-between text-xl lg:text-3xl p-10 mt-auto relative">
                      <div className="relative group">
                        <InformationCircleIcon className="cursor-pointer w-7 h-7 text-white" />
                        <div className="absolute bottom-full left-5 md:left-40  -translate-x-1/2 mb-2 w-40 md:w-80 p-2 text-sm text-white bg-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                          <p>
                            Každý úkol obsahuje otázku doplněnou krátkým
                            vysvětlením. Uživatel má na výběr ze tří možných
                            odpovědí, z nichž pouze jedna je správná. Cílem je
                            zvolit správnou odpověď na základě poskytnutých
                            informací.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full min-h-[30vh] usergradient lg:min-h-[70vh]  lg:w-1/5  rounded-3xl usergradient-glow flex items-center ">
                    <div className="h-full w-full flex justify-evenly flex-row lg:flex-col items-center">
                      {taskOptions.map((option) => {
                        const answerText = task[option];
                        const isCorrect = answerText === correctAnswer;
                        const isSelected = answerText === selectedAnswer;

                        return (
                          <button
                            key={option}
                            className={`w-full h-28 gap-2 sm:w-40 sm:h-32 md:w-40 md:h-28 rounded-3xl flex justify-center items-center m-1 sm:m-4 usergradient-glow transition-colors ${
                              selectedAnswer
                                ? isCorrect
                                  ? "bg-green-500"
                                  : isSelected
                                  ? "bg-red-500"
                                  : "bg-gray-700 opacity-50"
                                : "bg-zinc-700 hover:bg-zinc-600"
                            }`}
                            onClick={() =>
                              handleAnswerClick(task.id, answerText)
                            }
                            disabled={!!selectedAnswer}
                          >
                            {answerText.length > 10 ? (
                              <p className="text-md md:text-xl">{answerText}</p>
                            ) : (
                              <p className="text-xl md:text-2xl">
                                {answerText}
                              </p>
                            )}
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

export default TaskLayout;
