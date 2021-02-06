import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import { auth, store } from "../firebase";
import { setUser } from "../reducers/user";
import { setIndex } from "../reducers/sidebar";

const Settings = props => {
  const { className } = props;
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const onDelete = e => {
    if (window.confirm(`Are you sure you want to delete your account?`)) {
      store
        .collection("users")
        .doc(user.uid)
        .delete()
        .then(() => {
          user
            .delete()
            .then(() => {
              alert(`Your account has been deleted.`);
              auth.signOut().then(() => dispatch(setUser(null)));
            })
            .catch(err => alert(err.message));
        });
    }
  };

  useEffect(() => {
    dispatch(setIndex(3));
  }, [dispatch]);

  return (
    <div className={`${className} width-limit`}>
      <div className="delete_buttonContainer">
        <Button onClick={onDelete}>Delete Account</Button>
      </div>
    </div>
  );
};

export default styled(Settings)`
  width: 100%;
  height: 100%;
  padding: 2rem 8rem;
  background-color: #f5f5f9;
  font-family: "Open Sans", sans-serif;
  .delete_buttonContainer {
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    background-color: white;
    .MuiButton-root {
      width: 100%;
      color: white;
      background-color: gray;
      border-radius: 0.5rem;
      transition: all 300ms ease-in-out;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  @media (max-width: 640px) {
    padding: 1rem;
  }
`;
