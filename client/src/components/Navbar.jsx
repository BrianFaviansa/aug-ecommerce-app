import React from "react";
import { BsCart3 } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import NavList from "./NavList";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavList />
          </ul>
        </div>
        <Link to="/" className="hidden lg:flex btn btn-ghost text-xl">
          Aug-Commerce
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavList />
        </ul>
      </div>
      <div className="navbar-end gap-x-4">
        <NavLink
          to="/cart"
          className="btn btn-ghost btn-md btn-circle md:mr-6 lg:mr-8 pt-2"
        >
          <div className="indicator mr-2">
            <BsCart3 />
            <span className="badge badge-primary badge-sm indicator-item">
              8
            </span>
          </div>
        </NavLink>
        <Link className="btn btn-secondary btn-sm" to="/login">
          Login
        </Link>
        <Link className="btn btn-secondary btn-sm" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
