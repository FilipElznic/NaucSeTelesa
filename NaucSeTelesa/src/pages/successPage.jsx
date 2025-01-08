import InfoForm from "../Components/InfoForm";
import Tailwind from "./TailwindTest";
import Features from "../Components/Features";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Imgprofile from "../components/Imgprofile";

function SuccessPage() {
  return (
    <>
      <Navbar />
      <InfoForm />
      <Tailwind />
      <Features />
      <Imgprofile />
      <Footer />
    </>
  );
}

export default SuccessPage;

/*
{authUser ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mb-6">
            <p className="mb-2">
              <strong>User ID:</strong> {authUser.id}
            </p>
            <p>
              <strong>Email:</strong> {authUser.email}
            </p>
          </div>
        ) : (
          <p>Loading authenticated user...</p>
        )}
        <button
          onClick={signOutUser}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-105 transform transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-300"
        >
          Odhlásit se
        </button>
        
<


*/
