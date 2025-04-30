import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <App />
  //</StrictMode>
);

if (window.loadingFallbackTimeout) {
  clearTimeout(window.loadingFallbackTimeout);
}

// Call the global function to hide the animation
if (typeof window.hideLoadingAnimation === "function") {
  window.hideLoadingAnimation();
}
