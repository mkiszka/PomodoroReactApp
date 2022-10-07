import React from "react";
import { Routes, Route, Navigate  } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "layouts/views/auth/Login.js";
import Register from "layouts/views/auth/Register.js";

export default function Auth() {  
  return (    
    <>    
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-sky-900 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png") + ")",
            }}
          ></div>              
          <Routes>
            <Route path="login"  element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="/"
                element={<Navigate to="/auth/login" />}
              />
          </Routes>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
