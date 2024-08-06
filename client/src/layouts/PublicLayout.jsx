import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-8 py-20 min-h-[87.5vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
