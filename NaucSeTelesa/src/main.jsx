import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Create root and render app
createRoot(document.getElementById("root")).render(<App />);

// Clear the fallback timeout that was set in the HTML
if (window.loadingFallbackTimeout) {
  clearTimeout(window.loadingFallbackTimeout);
}
