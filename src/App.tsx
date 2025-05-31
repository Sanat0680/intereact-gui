import { BrowserRouter } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./common/AuthProvider";
import { ThemeProvider } from "./common/themeContext";
import { AppRoutes } from "./router";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            theme="colored"
            transition={Flip}
          />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
