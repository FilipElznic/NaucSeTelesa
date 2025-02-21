import emailjs from "emailjs-com";
import Spline from "@splinetool/react-spline";

function Help() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2kw7nvx",
        "template_voakx5c",
        e.target,
        "38mGiICJtaMmF4ga3"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Email sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send email.");
        }
      );

    e.target.reset();
  };
  return (
    <>
      <div
        className="flex flex-col sm:flex-row w-full min-h-screen bg-black text-white p-5"
        id="Contact"
      >
        <div className="flex flex-col items-center justify-center sm:w-1/2 text-center relative mb-8 sm:mb-0">
          {/* Add the pink dot and line */}
          <div className="contact relative">
            <h1 className="text-4xl sm:text-5xl font-bold mb-8 mt-8 text-pink-500">
              Contact
            </h1>
            <form onSubmit={sendEmail} className="w-full max-w-md">
              <div className="mb-6">
                <label className="block text-lg mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg mb-2">Message:</label>
                <textarea
                  name="message"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="5"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 text-lg font-semibold bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow-lg transition-all"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center sm:w-1/2 h-80 sm:h-auto">
          <div className="w-full h-full">
            <Spline
              scene="https://prod.spline.design/0lrgZxstxvvirq3I/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Help;
