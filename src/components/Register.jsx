import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/notes/User/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(credentials);
    if (res.token) navigate("/home");
    else alert("register failed");
  };

  return (
    <div className="wrapper">
      <div className="title">
        <span>Registration</span>
      </div>
      <div className="formDiv">
        <form action="#" onSubmit={handleSubmit}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Enter full name"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
            />
          </div>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Email or Phone"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <div className="row button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
