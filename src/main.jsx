import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
const rootElement = document.getElementById("root");
const AppProvider = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </BrowserRouter>
  </HelmetProvider>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, AppProvider);
} else {
  createRoot(rootElement).render(AppProvider);
}
