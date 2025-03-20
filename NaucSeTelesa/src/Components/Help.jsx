import React, { useState } from "react";
import {
  HelpCircle,
  Mail,
  Send,
  MessageSquare,
  User,
  ArrowLeft,
} from "lucide-react";

function Help() {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setIsSuccess(false);
    setIsError(false);

    // Simulating the form submission since emailjs-com is not available
    // In a real implementation, you would replace this with your preferred email service
    // or API call to your backend
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    console.log("Form data to be sent:", formValues);

    // Simulate API call with a timeout
    setTimeout(() => {
      // Simulate successful submission
      setIsSuccess(true);
      setIsSending(false);
      e.target.reset();

      // In a real implementation, you would handle the actual email sending here
      // For example with fetch:
      /*
      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })
      .then(response => response.json())
      .then(data => {
        setIsSuccess(true);
        setIsSending(false);
        e.target.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        setIsError(true);
        setIsSending(false);
      });
      */
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex items-center">
        <a
          href="/"
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Zpět</span>
        </a>
        <h1 className="text-2xl font-bold mx-auto pr-8">Nápověda</h1>
      </header>

      <div className="flex flex-col lg:flex-row w-full p-4 gap-8">
        {/* Left Column - Help Categories */}
        <div className="lg:w-1/4 bg-gray-900/50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Kategorie nápovědy
          </h2>

          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-all flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                <HelpCircle size={20} className="text-purple-400" />
              </div>
              <span>Často kladené otázky</span>
            </div>

            <div className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-all flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                <MessageSquare size={20} className="text-blue-400" />
              </div>
              <span>Návody k použití</span>
            </div>

            <div className="p-3 rounded-lg bg-blue-600/30 cursor-pointer transition-all flex items-center">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                <Mail size={20} className="text-pink-400" />
              </div>
              <span>Kontaktujte nás</span>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form with 3D Element */}
        <div className="lg:w-3/4 flex flex-col md:flex-row gap-8">
          {/* Contact Form */}
          <div className="w-full md:w-1/2 bg-gray-900/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              Kontaktní formulář
            </h2>

            {isSuccess ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-400">
                  Zpráva byla úspěšně odeslána! Odpovíme co nejdříve.
                </p>
              </div>
            ) : isError ? (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400">
                  Odeslání zprávy selhalo. Zkuste to prosím znovu.
                </p>
              </div>
            ) : null}

            <form onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">
                  Jméno
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full pl-10 px-4 py-3 bg-gray-800/70 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    placeholder="Vaše jméno"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-10 px-4 py-3 bg-gray-800/70 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    placeholder="vas@email.cz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">
                  Zpráva
                </label>
                <textarea
                  name="message"
                  required
                  className="w-full px-4 py-3 bg-gray-800/70 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  rows="4"
                  placeholder="Popište svůj problém nebo dotaz..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-3 px-4 flex items-center justify-center gap-2 text-base font-medium rounded-lg transition-all ${
                  isSending
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
                }`}
              >
                {isSending ? "Odesílání..." : "Odeslat zprávu"}
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* 3D Visualization */}
          <div className="w-full md:w-1/2 bg-gray-900/50 rounded-xl overflow-hidden flex items-center justify-center relative min-h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/30 to-pink-500/30 animate-pulse blur-xl"></div>
            </div>
            <div className="relative z-10 text-center">
              <img
                src="/api/placeholder/300/300"
                alt="placeholder"
                className="w-32 h-32 mx-auto mb-4 opacity-0"
              />
              <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center">
                <Mail size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Potřebujete další pomoc?
              </h3>
              <p className="text-gray-400 mb-4 max-w-xs mx-auto">
                Náš tým je připraven vám pomoci s jakýmkoli problémem.
              </p>
              <div className="px-4 py-2 rounded-full bg-white/10 inline-flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                <span className="text-sm">
                  Průměrná doba odpovědi: 24 hodin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full p-4 mt-4">
        <div className="bg-gray-900/50 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Často kladené otázky
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all cursor-pointer">
              <h3 className="font-medium">Jak se můžu přihlásit do systému?</h3>
              <p className="text-gray-400 mt-2 text-sm">
                Pro přihlášení použijte své přihlašovací údaje na hlavní
                stránce.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all cursor-pointer">
              <h3 className="font-medium">Jak mohu resetovat své heslo?</h3>
              <p className="text-gray-400 mt-2 text-sm">
                Na přihlašovací stránce klikněte na "Zapomenuté heslo" a
                postupujte podle pokynů.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all cursor-pointer">
              <h3 className="font-medium">
                Jak používat geometrické nástroje?
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                Navštivte sekci "Nechte se vnést do světa geometrie" a začněte
                objevovat tělesa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
