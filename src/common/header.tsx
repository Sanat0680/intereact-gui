import React, { useEffect, useState } from "react";
import { FaMoon, FaPowerOff, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg"; // Adjust the path as needed
import type { User } from "../model/user";
import { useTheme } from "./themeContext";

interface HeaderProps {
  headerText: string;
}

const Header: React.FC<HeaderProps> = ({ headerText }) => {
  const [username, setUsername] = useState<string>("Guest");
  const [email, setEmail] = useState<string>(""); // Additional data example
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedUserJson = localStorage.getItem("user");
    console.log("Stored User JSON:", storedUserJson); // Debugging line
    if (storedUserJson) {
      try {
        const storedUser: User = JSON.parse(storedUserJson);
        setUsername(storedUser.username || "Guest");
        setEmail(storedUser.email || "");
      } catch {
        setUsername("Guest");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove the correct key
    navigate("/loginpage");
  };

  return (
    <header className="flex items-center justify-between p-3 mb-4 rounded-md shadow-md body text-foreground">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
        <div>
          <h1 className="text-xl font-semibold">
            {headerText}, {username} 👋
          </h1>
          {email && <p className="text-sm opacity-80">{email}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition rounded-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <FaPowerOff />
          Logout
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 text-sm transition rounded-full border-destructive hover:bg-text hover:text-foreground"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
