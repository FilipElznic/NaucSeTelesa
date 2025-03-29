import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Help from "./Components/Help";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-zinc-800 p-4 rounded-3xl cursor-pointer transition-all duration-300 hover:bg-zinc-700"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{question}</h3>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && <p className="text-zinc-300 mt-2 animate-fade-in">{answer}</p>}
    </div>
  );
};

const HelpPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      from_email: email,
      message: message,
    };

    emailjs
      .send(
        "service_2kw7nvx",
        "template_voakx5c",
        formData,
        "38mGiICJtaMmF4ga3"
      )
      .then(
        (result) => {
          toast.success("Vaše zpráva byla úspěšně odeslána!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          // Reset form fields
          setEmail("");
          setMessage("");
        },
        (error) => {
          toast.error("Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      );
  };

  return (
    <div className="bg-gradient-to-br from-black via-zinc-950  to-black ">
      <Navbar />
      <Help />
      <Footer />
    </div>
  );
};

export default HelpPage;
