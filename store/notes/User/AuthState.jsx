import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import noteContext from "../NoteContext";
import { useContext } from "react";

const AuthState = (props) => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const { notes, setNotes } = useContext(noteContext);
  const [token, settoken] = useState("");
  const [MyDetails, setMyDetails] = useState("");

  const register = async (userData) => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    if (json.token) {
      localStorage.setItem("auth-token", json.token);
      settoken(json.token);
    }
    return json;
  };

  const login = async (userData) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    if (json.token) {
      localStorage.setItem("auth-token", json.token);
      settoken(json.token);
    }

    const res = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "auth-token": json.token,
      },
    });
    const details = await res.json();
    if (details) {
      setMyDetails(details.name);
    }

    return json;
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setNotes([]);

    settoken("");
    navigate("/login");
    setMyDetails("");
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, token, MyDetails }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
