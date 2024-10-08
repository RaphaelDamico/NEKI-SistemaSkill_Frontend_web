import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from "./router/index.tsx";
import { RegisterUserProvider } from "./contexts/RegisterUserContext/index.tsx";
import { AuthUserProvider } from "./contexts/AuthUserContext/index.tsx";

createRoot(document.getElementById('root')!).render(
  <RegisterUserProvider>
    <AuthUserProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <RoutesApp />
      </BrowserRouter>
    </AuthUserProvider>
  </RegisterUserProvider>
)
