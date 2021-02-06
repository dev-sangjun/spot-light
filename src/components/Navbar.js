import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { auth, store, provider } from "../firebase";
import { setUser } from "../reducers/user";

const Navbar = props => {
  const { className } = props;
  const dispatch = useDispatch();
  const onSignOut = e => {
    if (window.confirm("Are you sure you want to sign out?")) {
      auth.signOut().then(() => dispatch(setUser(null)));
    }
  };
  useEffect(() => {}, []);
  return (
    <nav className={className}>
      <div className="navbar__container width-limit">
        <div className="logo">SpotLight</div>
        <ul className="navbar__items">
          <li className="navbar__item signOut">
            <span className="signOut btn" onClick={onSignOut}>
              Sign out
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default styled(Navbar)`
  background-color: white;
  position: relative;
  z-index: 1;
  .navbar__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    padding: 0 4.5rem;
    margin: auto;
    user-select: none;
    .logo {
      font-size: 2em;
      font-weight: bold;
    }
    .navbar__items {
      list-style: none;
      display: flex;
      .navbar__item {
        font-size: 1em;
        font-weight: bold;
        border-bottom: 2px solid transparent;
      }
      .signOut {
        padding: 0.8rem 1rem;
        background-color: #ffc800;
        color: white;
        border-radius: 0.5rem;
      }
    }
  }
  @media (max-width: 640px) {
    .navbar__container {
      padding: 0 1rem;
    }
  }
`;
