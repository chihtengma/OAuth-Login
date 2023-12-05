import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./page/home";
import Login from "./page/login";
import Nav from "./components/Nav";

const App = () => {
   return (
      <div>
         <Nav />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </div>
   );
};

export default App;
