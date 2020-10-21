import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-scroll";
import { auth, db, provider } from "../firebase";
import { setUser } from "../reducers/user";

const Navbar = props => {
  const { className } = props;
  const dispatch = useDispatch();
  const onSignOut = e => {
    if (window.confirm("Are you sure you want to sign out?")) {
      auth.signOut().then(() => dispatch(setUser(null)));
    }
  };
  const onGoogleSignIn = e => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch(setUser(result.user));
      })
      .catch(err => alert(err.message));
  };
  useEffect(() => {}, [auth.currentUser]);
  return (
    <nav className={className}>
      <div className="navbar__container width-limit">
        <div className="logo">SpotLight</div>
        <ul className="navbar__items">
          <li className="navbar__item">
            <Link className="link">Home</Link>
          </li>
          {auth.currentUser ? (
            <li className="navbar__item signOut">
              <span className="link" onClick={onSignOut}>
                Sign out
              </span>
            </li>
          ) : (
            <li className="navbar__item google__signIn">
              <span className="link" onClick={onGoogleSignIn}>
                Sign in with Google
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default styled(Navbar)`
  .navbar__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    margin: auto;
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
        transition: all 1s ease-in-out;
      }
      .link {
        padding: 0.8rem 1rem;
        border-bottom: 2px solid transparent;
        transition: all 300ms ease-in-out;
        &:hover {
          border-bottom: 2px solid black;
          cursor: pointer;
        }
      }
      .google__signIn {
        color: #4285f4;
        .link {
          &:hover {
            border-bottom: 2px solid #4285f4;
          }
        }
      }
      .signOut {
        color: #ffc800;
        .link {
          &:hover {
            border-bottom: 2px solid #ffc800;
          }
        }
      }
    }
  }
`;
