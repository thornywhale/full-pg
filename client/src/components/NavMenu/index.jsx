import React from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/todo">to do</NavLink>
        </li>
        <li>
          <NavLink to="/users">users</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
