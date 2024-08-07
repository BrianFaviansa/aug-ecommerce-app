import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-8 py-9 mb-20 min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
