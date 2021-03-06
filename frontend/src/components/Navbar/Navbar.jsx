import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Navbar.module.scss";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      setAuthenticated(true);
    }
  });
  // removed [] because when user login or registers the navbar component doesnt re-render but we need the authenticated state to change so we re-render navbar

  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <header className={styles.navbar}>
      <Logo />
      {authenticated ? (
        <div className={styles.rightNav}>
          <div className={styles.navLinks}>
            <div
              className={styles.rightNavItem}
              onClick={() => navigate("/apis")}
            >
              My APIs
            </div>
          </div>
          <div
            className={styles.rightNavBtn}
            onClick={() => navigate("/api/create")}
          >
            + Add API
          </div>
          <div className={styles.rightNavBtn} onClick={handleLogout}>
            Logout
          </div>
        </div>
      ) : (
        <div className={styles.rightNav}>
         
          <div
            className={styles.rightNavBtn}
            onClick={() => navigate("/login")}
          >
            Login/Signup
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
