import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <div>
              <Link to="/login">
                <button className="btn btn-primary">Please Log In</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary">Please Sign up</button>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => actions.logout()}
              className="btn btn-primary"
            >
              LOG OUT
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
