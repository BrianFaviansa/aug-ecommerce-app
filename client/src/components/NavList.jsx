import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  {
    id: 1,
    url: "",
    text: "Home",
  },
  {
    id: 2,
    url: "about",
    text: "About",
  },
  {
    id: 3,
    url: "products",
    text: "Products",
  },
  {
    id: 4,
    url: "orders",
    text: "Orders",
  },
];

const NavList = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink className="" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavList;
