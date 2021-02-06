import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import HighlightImage from "../images/highlight.png";
import { auth, store, provider } from "../firebase";
import { setUser } from "../reducers/user";

const Welcome = props => {
  const { className } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const onGoogleSignIn = e => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        store.collection("users").doc(result.user.uid).set({
          PhotoURL: result.user.photoURL,
          name: result.user.displayName,
        });
        dispatch(setUser(result.user));
      })
      .catch(err => alert(err.message));
  };
  return (
    <section className={`${className}`}>
      <div className="login__container">
        <img
          className={`highlight__img smooth-image image-${
            imageLoaded ? "visible" : "hidden"
          }`}
          onLoad={() => setImageLoaded(true)}
          src={HighlightImage}
          alt="highlight"
          draggable={false}
        />
        <h1>
          Record your high<span className="yellow">lights</span> before you
          forget!
        </h1>
        <span className="google__signIn btn" onClick={onGoogleSignIn}>
          Sign in with Google
        </span>
      </div>
    </section>
  );
};

export default styled(Welcome)`
  .yellow {
    color: #ffc800;
  }
  .login__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .highlight__img {
      display: block;
      width: 80%;
      max-width: 40rem;
    }
    .google__signIn {
      margin-top: 2rem;
      font-weight: bold;
      padding: 0.8rem 1rem;
      background-color: #4285f4;
      color: white;
      border-radius: 0.5rem;
    }
  }
`;
