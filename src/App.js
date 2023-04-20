import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { MDBFooter } from 'mdb-react-ui-kit';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import BoardClass from "./components/BoardClass";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showClassBoard, setShowClassBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowClassBoard(user.roles.includes("ROLE_TEACHER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          PTIT
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}

          {showClassBoard && (
            <li className="nav-item">
              <Link to={"/class"} className="nav-link">
                Class
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/class" element={<BoardClass />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
    <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://www.facebook.com/taitruongtct'>
          Chi Tai
        </a>
      </div>
    </MDBFooter>
    </>
  );
};

export default App;
