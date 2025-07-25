import Leaderboard from "./Leaderboard";

function LeaderboardW() {
  return (
    <>
      <div className="flex flex-col min-h-screen m-4  " id="zebricek">
        <div className="w-full flex justify-center items-center">
          <h2
            className="text-3xl sm:text-6xl md:text-7xl xl:text-9xl font-bold md:text-start text-center md:pb-20 userlvl my-5 p-5
           "
          >
            Leaderboard
          </h2>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex justify-center w-5/6">
            <Leaderboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaderboardW;
