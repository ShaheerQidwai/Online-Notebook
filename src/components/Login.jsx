import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/notes/User/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(credentials);
    if (res.token) navigate("/home");
    else alert("Login failed");
  };

  return (
    <div className="wrapper">
      <div className="title">
        <span>Login</span>
      </div>
      <div className="formDiv">
        <form action="#" onSubmit={handleSubmit}>
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
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Not a member? <Link to="/register">Signup now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
