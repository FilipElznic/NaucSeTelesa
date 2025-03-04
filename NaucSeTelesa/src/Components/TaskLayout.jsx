import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { CiCircleInfo } from "react-icons/ci";
import { useGlobalData } from "../Global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHome } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaShuffle } from "react-icons/fa6";
import Footer from "./Footer";

function TaskLayout() {
  const [tasks, setTasks] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { userData, refreshUserData } = useGlobalData();

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
        className: "!bg-black !text-white !border border-white/20 !shadow-lg",
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

  // Prevents rendering before userData is available
  if (!userData) {
    return <div className="text-white text-center mt-10">Načítání...</div>;
  }

  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  return (
    <>
      <div className="bg-black min-h-screen flex flex-col items-center p-2 sm:p-5 md:px-10 text-white">
        <ToastContainer
          toastClassName={() =>
            "bg-black !text-white !border-2 !border-white/10 !rounded-lg !shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
          }
          bodyClassName="!bg-black !text-white"
          progressClassName={({ defaultClassName }) =>
            `${defaultClassName} !bg-gradient-to-r from-transparent to-white/10`
          }
        />
        <div className="w-full h-full bg-black md:p-5 rounded-3xl">
          <div className="w-full flex flex-col gap-4 p-3 md:p-6 bg-white/9 backdrop-blur-lg rounded-3xl">
            <div className="w-full h-24 usergradient rounded-full usergradient-glow">
              <div className="h-full flex flex-row justify-between items-center">
                <div className="flex-row w-full h-full  md:p-10 flex items-center gap-10 ">
                  <span
                    className="flex flex-row cursor-pointer items-center gap-2 lg:text-3xl text-2xl ml-4"
                    onClick={() => (window.location.href = "/")}
                  >
                    <FaHome />
                    <p className="hidden sm:block">Domů</p>
                  </span>
                  <span
                    className="flex flex-row cursor-pointer items-center gap-2 lg:text-3xl text-2xl"
                    onClick={() => (window.location.href = "/ukoly")}
                  >
                    <IoMdRefresh />
                    <p className="hidden sm:block">Obnovit</p>
                  </span>
                  <span
                    className="flex flex-row cursor-pointer items-center gap-2 lg:text-3xl text-2xl"
                    onClick={() => setTasks(shuffleArray(tasks))}
                  >
                    <FaShuffle />
                    <p className="hidden sm:block">Zamíchat</p>
                  </span>
                </div>

                <span
                  className="flex flex-row cursor-pointer items-center gap-2   text-3xl mr-5"
                  onClick={() => (window.location.href = "/")}
                >
                  <p className="hidden sm:block text-2xl lg:text-3xl">Zavřít</p>
                  <IoClose className="  lg:mr-10" />
                </span>
              </div>
            </div>

            {tasks.map((task) => {
              const selectedAnswer = selectedAnswers[task.id];
              const correctAnswer = task.correctanswer;

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
                        <CiCircleInfo className="cursor-pointer" />
                        <div className="absolute bottom-full left-44 mb-2 w-80 p-2 text-sm text-white bg-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                          <p>
                            V každém úkolu je uvedena otázka spolu s krátkým
                            vysvětlením nebo nápovědou. Uživatel má na výběr ze
                            tří možností, přičemž pouze jedna odpověď je
                            správná. Cílem je zakliknout správnou odpověď.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Answer Choices */}

                  <div className="w-full min-h-[30vh] usergradient lg:min-h-[70vh]  lg:w-1/5  rounded-3xl usergradient-glow flex items-center ">
                    <div className="h-full w-full flex justify-evenly flex-row lg:flex-col items-center">
                      {["answera", "answerb", "answerc"].map((option) => {
                        const answerText = task[option];
                        const isCorrect = answerText === correctAnswer;
                        const isSelected = answerText === selectedAnswer;

                        return (
                          <button
                            key={option}
                            className={`w-20 h-20 sm:w-40 sm:h-32 md:w-40 md:h-28 rounded-3xl flex justify-center items-center m-1 sm:m-4 usergradient-glow transition-colors ${
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
                            <p className="text-xl md:text-2xl">{answerText}</p>
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
      <Footer />
    </>
  );
}

export default TaskLayout;
