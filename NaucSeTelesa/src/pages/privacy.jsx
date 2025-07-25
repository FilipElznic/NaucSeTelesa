import React from "react";
import "../App.css"; // Import your CSS file for styling

function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-4">
      <div className="max-w-4xl w-full">
        <h1 className="userlvl text-5xl font-bold text-center mb-12 ">
          User Data Privacy
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="usergradient rounded-xl p-8 shadow-lg">
            <h2 className="userlvl text-2xl font-semibold mb-4">
              Protecting Your Data
            </h2>
            <p className="text-gray-300 mb-4">
              Your personal data is safe with us. All data you provide is stored
              in a secure database and used only to improve your experience with
              our application.
            </p>
            <div className="flex items-center mt-6">
              <div className="bg-black p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <p className="ml-4 text-gray-300">
                Highest level data encryption
              </p>
            </div>
          </div>

          <div className="usergradient rounded-xl p-8 shadow-lg">
            <h2 className="userlvl text-2xl font-semibold mb-4">
              No Third-Party Sales
            </h2>
            <p className="text-gray-300 mb-4">
              We pledge that we will never sell or provide your data to third
              parties. Your privacy is our top priority and we respect your
              trust.
            </p>
            <div className="flex items-center mt-6">
              <div className="bg-black p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </div>
              <p className="ml-4 text-gray-300">
                No sharing with third parties
              </p>
            </div>
          </div>
        </div>

        <div className="usergradient rounded-xl p-8 shadow-lg mb-12">
          <h2 className=" text-2xl font-semibold mb-6">How we use your data</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-black p-2 rounded-full mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-100">
                  Improving user experience
                </h3>
                <p className="text-gray-300 mt-2">
                  We use anonymized data to analyze how our users use the
                  application so we can continuously improve its functionality
                  and design.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-black p-2 rounded-full mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-100">
                  Content personalization
                </h3>
                <p className="text-gray-300 mt-2">
                  We save your progress and preferences so we can offer you
                  personalized content and tailor your learning to your needs.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-black p-2 rounded-full mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-100">
                  Progress tracking
                </h3>
                <p className="text-gray-300 mt-2">
                  We store information about your learning progress so you can
                  track your growth and so we can offer you relevant next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
