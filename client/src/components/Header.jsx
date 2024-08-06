import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Aug-Commerce</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-6 gap-x-4">
          <Link className="btn btn-secondary btn-sm" to="/login">Login</Link>
          <Link className="btn btn-secondary btn-sm" to="/register">Register</Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
