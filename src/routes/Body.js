import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Fade,
  Backdrop,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { Bookmark, List, Settings } from "./index";
import { Sidebar } from "../components";
import { setEntry } from "../reducers/entry";
import { closeModal } from "../reducers/modal";
import { getDayFromDate, getStringFromDay } from "../utils";
import { auth, store } from "../firebase";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "80%",
    height: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #ffc800",
    borderRadius: "0.5rem",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    width: "100%",
    maxWidth: "20rem",
    overflow: "hidden",
    whiteSspace: "nowrap",
    textOverflow: "ellipsis",
  },
  dateCreated: {
    color: "lightgray",
  },
  bodyContainer: {
    width: "100%",
    flex: 1,
    marginTop: "1rem",
    overflow: "auto",
    wordWrap: "break-word",
  },
  bottomContainer: {
    display: "flex",
  },
  iconContainer: {
    marginRight: "1rem",
    "&:last-child": {
      marginRight: 0,
    },
  },
}));

const Body = props => {
  const { className } = props;
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const classes = useStyles();

  //Selectors
  const open = useSelector(state => state.modal);
  const entry = useSelector(state => state.entry);

  //Methods
  const onDelete = e => {
    if (window.confirm(`Are you sure you want to delete ${entry.title}?`)) {
      store
        .collection("users")
        .doc(user.uid)
        .collection("entries")
        .doc(entry.id)
        .delete()
        .then(() => {
          alert(`${entry.title} has been deleted.`);
          dispatch(closeModal());
          dispatch(setEntry(null));
        });
    }
  };
  return (
    <div className={className}>
      <Switch>
        <Route exact path="/bookmark" component={Bookmark} />
        <Route exact path="/list" component={List} />
        <Route exact path="/settings" component={Settings} />
        <Redirect from="*" to="/bookmark" />
      </Switch>
      <Sidebar />
      {entry && (
        <Modal
          open={open}
          onClose={() => dispatch(closeModal())}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div className={classes.headerContainer}>
                <h2 id="transition-modal-title" className={classes.modalTitle}>
                  {entry.title}
                </h2>
                <span className={classes.dateCreated}>
                  {getStringFromDay(getDayFromDate(entry.dateCreated.toDate()))}
                </span>
              </div>
              <div className={classes.bodyContainer}>
                <p id="transition-modal-description">{entry.content}</p>
              </div>
              <div className={classes.bottomContainer}>
                {/* <div className={classes.iconContainer}>
                  <IconButton onClick={onEdit}>
                    <Edit />
                  </IconButton>
                </div> */}
                <div className={classes.iconContainer}>
                  <IconButton onClick={onDelete}>
                    <Delete />
                  </IconButton>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default styled(Body)`
  position: relative;
  height: 100%;
`;
