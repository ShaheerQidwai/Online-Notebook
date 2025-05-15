import React from "react";
import "../App.css";
import { Link, useLocation } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import AuthContext from "../../store/notes/User/AuthContext";
import { useContext } from "react";

const Sider = () => {
  const { logout, MyDetails } = useContext(AuthContext);

  let location = useLocation();
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sider"
      style={{ width: "200px" }}
    >
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/home"
            className={`nav-link text-white ${
              location.pathname === "/home" ? "custom-active " : ""
            }`}
            aria-current="page"
          >
            <svg className="bi me-2" width="16" height="16">
              <GoHome></GoHome>
            </svg>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/CreateNote"
            className={`nav-link text-white ${
              location.pathname === "/CreateNote" ? "custom-active" : ""
            }`}
          >
            <svg className="bi me-2 text-white" width="16" height="16">
              <FaRegEdit></FaRegEdit>
            </svg>
            Create Note
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown mx-3">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <strong>{MyDetails}</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" href="#" onClick={logout}>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sider;
