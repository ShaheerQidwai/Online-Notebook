import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateNote from "./components/CreateNote";
import NoteState from "../store/notes/NoteState";
import Sider from "./components/Sider";
import Login from "./components/Login";
import Register from "./components/Register";
import { useContext } from "react";
import AuthState from "../store/notes/User/AuthState";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("auth-token");
  return token ? children : <Navigate to="/login" />;
};

// Layout shown only after login
const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="d-flex mainContainer">
      <Sider className="h-100 d-inline-block" />
      {children}
    </div>
  </>
);

function App() {
  return (
    <AuthState>
      <NoteState>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/CreateNote"
            element={
              <PrivateRoute>
                <Layout>
                  <CreateNote />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* Optional: redirect root to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </NoteState>
    </AuthState>
  );
}

export default App;

//To start the mongodb server
// C:\MongoDB\bin\mongod.exe --dbpath C:\MongoDB\data\db
