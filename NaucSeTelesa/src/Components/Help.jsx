import React, { useState } from "react";
import {
  HelpCircle,
  Mail,
  Send,
  MessageSquare,
  User,
  ArrowLeft,
  Home,
  Lock,
  Info,
} from "lucide-react";

function Help() {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setIsSuccess(false);
    setIsError(false);

    // Simulate API call with a timeout
    setTimeout(() => {
      // Simulate successful submission
      setIsSuccess(true);
      setIsSending(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* Header */}

      {/* Main content with robot imagery */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background robot images - stylized positioning similar to login screen */}

        {/* Content container */}
        <div className="relative z-10 flex-1 flex flex-col md:flex-row w-full max-w-6xl mx-auto p-6 gap-6">
          {/* Left sidebar - Categories */}
          <div className="md:w-1/4 bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-800">
            <h2 className="text-xl font-bold mb-6 text-white">
              Kategorie nápovědy
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => setActiveTab("faq")}
                className={`w-full p-3 rounded-lg ${
                  activeTab === "faq"
                    ? "bg-blue-500/20 border border-blue-500/40"
                    : "bg-gray-800/50 hover:bg-gray-800/80"
                } 
                  transition-all flex items-center`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  <HelpCircle size={20} className="text-blue-400" />
                </div>
                <span>Často kladené otázky</span>
              </button>

              <button
                onClick={() => setActiveTab("guides")}
                className={`w-full p-3 rounded-lg ${
                  activeTab === "guides"
                    ? "bg-blue-500/20 border border-blue-500/40"
                    : "bg-gray-800/50 hover:bg-gray-800/80"
                } 
                  transition-all flex items-center`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  <MessageSquare size={20} className="text-blue-400" />
                </div>
                <span>Návody k použití</span>
              </button>

              <button
                onClick={() => setActiveTab("contact")}
                className={`w-full p-3 rounded-lg ${
                  activeTab === "contact"
                    ? "bg-blue-500/20 border border-blue-500/40"
                    : "bg-gray-800/50 hover:bg-gray-800/80"
                } 
                  transition-all flex items-center`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  <Mail size={20} className="text-blue-400" />
                </div>
                <span>Kontaktujte nás</span>
              </button>
            </div>
          </div>

          {/* Right side - Content area */}
          <div className="md:w-3/4 flex flex-col gap-6">
            {activeTab === "contact" && (
              <div className="flex flex-col lg:flex-row gap-6 h-full">
                {/* Contact Form */}
                <div className="w-full lg:w-1/2 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-white">
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

                  <form onSubmit={sendEmail} className="space-y-5">
                    <div>
                      <label className="block text-blue-300 mb-2 text-sm">
                        Jméno
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User size={18} className="text-blue-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full pl-10 px-4 py-3 bg-gray-800/70 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="Vaše jméno"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-blue-300 mb-2 text-sm">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail size={18} className="text-blue-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full pl-10 px-4 py-3 bg-gray-800/70 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="vas@email.cz"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-blue-300 mb-2 text-sm">
                        Zpráva
                      </label>
                      <textarea
                        name="message"
                        required
                        className="w-full px-4 py-3 bg-gray-800/70 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isSending ? "Odesílání..." : "Odeslat zprávu"}
                      <Send size={18} />
                    </button>
                  </form>
                </div>

                {/* Visual Element */}
                <div className="w-full lg:w-1/2 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 flex items-center justify-center">
                  <div className="text-center max-w-sm">
                    <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                      <Mail size={32} className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      Potřebujete další pomoc?
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Náš tým je připraven vám pomoci s jakýmkoli problémem.
                    </p>
                    <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 inline-flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                      <span className="text-sm text-blue-300">
                        Průměrná doba odpovědi: 24 hodin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Často kladené otázky
                </h2>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Lock size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          Jak se můžu přihlásit do systému?
                        </h3>
                        <p className="text-gray-300 mt-2">
                          Pro přihlášení použijte své přihlašovací údaje na
                          hlavní stránce. Můžete se přihlásit pomocí vašeho
                          Google účtu, Discord účtu nebo vaší registrované
                          e-mailové adresy a hesla.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Lock size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          Jak mohu resetovat své heslo?
                        </h3>
                        <p className="text-gray-300 mt-2">
                          Na přihlašovací stránce klikněte na "Zapomenuté
                          heslo?" pod přihlašovacím formulářem. Zadejte svůj
                          e-mail a postupujte podle pokynů zaslaných na vaši
                          adresu.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Info size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          Jak používat geometrické nástroje?
                        </h3>
                        <p className="text-gray-300 mt-2">
                          Navštivte sekci "Tělesa" v hlavním menu. Každý nástroj
                          obsahuje detailní instrukce a interaktivní
                          demonstrace. Pro podrobnější návody navštivte sekci
                          "Návody k použití".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "guides" && (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Návody k použití
                </h2>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Home size={20} className="text-blue-400" />
                      </div>
                      <h3 className="font-medium text-white">Začínáme</h3>
                    </div>
                    <p className="text-gray-300">
                      Kompletní průvodce pro nové uživatele systému.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Info size={20} className="text-blue-400" />
                      </div>
                      <h3 className="font-medium text-white">
                        Geometrická tělesa
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Jak pracovat s různými geometrickými tělesy v systému.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <User size={20} className="text-blue-400" />
                      </div>
                      <h3 className="font-medium text-white">Správa profilu</h3>
                    </div>
                    <p className="text-gray-300">
                      Jak nastavit a upravit váš uživatelský profil.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Lock size={20} className="text-blue-400" />
                      </div>
                      <h3 className="font-medium text-white">Bezpečnost</h3>
                    </div>
                    <p className="text-gray-300">
                      Jak zabezpečit váš účet a chránit osobní údaje.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}

export default Help;
