import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_2kw7nvx",
        "template_your_template_id", // You'll need to create a template in EmailJS
        {
          from_email: email,
          message: message,
        },
        {
          publicKey: "38mGiICJtaMmF4ga3",
          privateKey: "KBvc8u1UH-SCVM88Z5gA0",
        }
      );

      // Show success toast
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
      setSubmitted(true);
    } catch (error) {
      // Show error toast
      toast.error("Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 md:p-12 lg:p-16 flex flex-col items-center">
      <ToastContainer />

      <div className="flex w-full justify-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center mb-12 pb-6">
          <span className="userlvl">Centrum pomoci</span>
        </h1>
      </div>

      {/* Kontaktní formulář */}
      <div className="flex flex-col w-5/6">
        <section
          className="bg-zinc-900 p-8 rounded-3xl 
            shadow-[0_0_30px_rgba(255,255,255,0.2)] 
            transition-all duration-300 
            hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
            mb-8"
        >
          <h2 className="text-4xl text-center font-semibold mb-6">
            Kontaktujte nás
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="email" className="block mb-2">
                Váš email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-800 text-white p-3 rounded-3xl 
                  focus:outline-none focus:ring-2 focus:ring-white/30 
                  transition-all duration-300"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="message" className="block mb-2">
                Vaše zpráva
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="6"
                className="w-full bg-zinc-800 text-white p-3 rounded-3xl 
                  focus:outline-none focus:ring-2 focus:ring-white/30 
                  transition-all duration-300"
              ></textarea>
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white 
                  py-3 rounded-3xl transition-all duration-300 
                  hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                Odeslat zprávu
              </button>
            </div>
          </form>
        </section>
      </div>

      <div className="flex md:flex-row flex-col w-5/6 mx-auto mt-8">
        {/* Často kladené otázky */}
        <div
          className="bg-zinc-900 p-8 rounded-3xl 
            shadow-[0_0_30px_rgba(255,255,255,0.2)] 
           w-full
            transition-all duration-300 
            hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
            mt-5 mr-4 mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Často kladené otázky</h2>
          <div className="space-y-4">
            <FAQItem
              question="Jak začít používat naši službu?"
              answer="Registrace je jednoduchá. Stačí vyplnit základní údaje na úvodní stránce a můžete začít ihned využívat všechny funkce."
            />
            <FAQItem
              question="Jak obnovit zapomenuté heslo?"
              answer="Na přihlašovací stránce klikněte na odkaz 'Zapomenuté heslo' a postupujte podle pokynů pro reset hesla."
            />
            <FAQItem
              question="Jak kontaktovat podporu?"
              answer="Můžete nás kontaktovat pomocí formuláře nebo prostřednictvím emailu support@example.com."
            />
          </div>
        </div>
        <div
          className="bg-zinc-900 p-8 rounded-3xl 
            shadow-[0_0_30px_rgba(255,255,255,0.2)] 
           w-full
            transition-all duration-300 
            hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
            mt-5 mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Často kladené otázky</h2>
          <div className="space-y-4">
            <FAQItem
              question="Jak začít používat naši službu?"
              answer="Registrace je jednoduchá. Stačí vyplnit základní údaje na úvodní stránce a můžete začít ihned využívat všechny funkce."
            />
            <FAQItem
              question="Jak obnovit zapomenuté heslo?"
              answer="Na přihlašovací stránce klikněte na odkaz 'Zapomenuté heslo' a postupujte podle pokynů pro reset hesla."
            />
            <FAQItem
              question="Jak kontaktovat podporu?"
              answer="Můžete nás kontaktovat pomocí formuláře nebo prostřednictvím emailu support@example.com."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
