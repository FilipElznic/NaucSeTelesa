function TaskLayout() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-4">
      <div className="w-full flex flex-col gap-4 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl">
        {/* Top Bar */}
        <div className="w-full h-24 bg-white/10 rounded-3xl"></div>

        <div className="flex flex-col md:flex-row gap-4 w-full h-[70vh]">
          <div className="w-full h-full md:w-3/5 bg-white/10 rounded-3xl"></div>
          <div className="w-full h-full md:w-1/5 bg-white/10 rounded-3xl"></div>
        </div>

        {/* Main Content */}

        <div className="flex flex-col md:flex-row gap-4 w-full h-[70vh]">
          <div className="w-full h-full md:w-3/5 bg-white/10 rounded-3xl"></div>
          <div className="w-full h-full md:w-1/5 bg-white/10 rounded-3xl"></div>
        </div>

        {/* Middle Section */}

        <div className="flex flex-col md:flex-row gap-4 w-full h-[70vh]">
          <div className="w-full h-full md:w-3/5 bg-white/10 rounded-3xl"></div>
          <div className="w-full h-full md:w-1/5 bg-white/10 rounded-3xl"></div>
        </div>

        {/* Bottom Section */}

        <div className="flex flex-col md:flex-row gap-4 w-full h-[70vh]">
          <div className="w-full h-full md:w-3/5 bg-white/10 rounded-3xl"></div>
          <div className="w-full h-full md:w-1/5 bg-white/10 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default TaskLayout;
