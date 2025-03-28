import Leaderboard from "./Leaderboard";

function LeaderboardW() {
  return (
    <>
      <div className="flex flex-col min-h-screen m-4">
        <div className="w-full flex justify-center items-center">
          <h2
            className="text-3xl sm:text-6xl md:text-7xl xl:text-9xl font-bold md:text-start text-center md:pb-20 userlvl my-3
           "
          >
            Žebříček uživatelů
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

/*

   <div className="lg:flex lg:flex-row lg:w-full lg:justify-evenly mb-24 lg:items-center text-white">
        <div className="md:full md:flex md:flex-col md:justify-center md:items-center md:mt-20 lg:flex lg:flex-col lg:items-start lg:w-1/4 ">
        
        </div>
        <div className="md:mr-8">
        
          <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-end">
            <Leaderboard />
          </div>
        </div>
      </div>


*/
