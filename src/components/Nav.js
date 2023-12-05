import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Nav = () => {
   const navigate = useNavigate();

   const handleLogout = async () => {
      await axios.get("https://localhost:3000/auth/logout");

      navigate("/login");
      try {
      } catch (err) {
         console.error("Logout failed:", err);
      }
   };

   return (
      <div className="topnav">
         <a href="login" onClick={handleLogout}>
            Log Out
         </a>
         <a href="/">Home</a>
      </div>
   );
};

export default Nav;
