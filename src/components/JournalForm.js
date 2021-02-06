import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import isEmpty from "is-empty";
import { Button } from "@material-ui/core";
import { auth, store } from "../firebase";
import { getDayOffset, getDayFromDate, getStringFromDay } from "../utils";
import isEqual from "is-equal";
import { utils } from "react-modern-calendar-datepicker";

const JournalForm = props => {
  const { className } = props;
  const user = auth.currentUser;
  // States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openContent, setOpenContent] = useState(false);

  // Refs
  const titleInput = useRef();
  const contentArea = useRef();

  // Selectors
  const entryDay = useSelector(state => state.day);

  // Methods
  const onTitleEnter = e => {
    e.preventDefault();
    if (!isEmpty(title)) {
      setOpenContent(true);
      titleInput.current.blur();
      setTimeout(() => contentArea.current.focus(), 300);
    }
  };
  const onSave = e => {
    // const entryDate = new Date();
    // const offset = getDayOffset(getDayFromDate(entryDate), day);
    // entryDate.setDate(entryDate.getDate() + offset);
    // dispatch(setEntryDate(entryDate));

    e.preventDefault();
    const entryDate = new Date();
    const offset = getDayOffset(getDayFromDate(entryDate), entryDay);
    entryDate.setDate(entryDate.getDate() + offset);
    store.collection("users").doc(user.uid).collection("entries").add({
      title,
      content,
      bookmarked: false,
      dateCreated: entryDate,
    });
    setTitle("");
    setContent("");
    setOpenContent(false);
    alert("Your entry is saved!");
  };
  const keyHandler = e => {
    const tabKey = 9;
    if (e.keyCode === tabKey) {
      setContent(content + "       ");
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    }
  };

  return (
    <div className={className}>
      <form className="journal__titleForm" onSubmit={onTitleEnter}>
        <input
          type="text"
          placeholder={`Write something from ${
            isEqual(utils().getToday(), entryDay)
              ? "today"
              : getStringFromDay(entryDay)
          }...`}
          value={title}
          ref={titleInput}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
      <form
        className={`journal__contentContainer ${openContent && "openContent"}`}
        onSubmit={onSave}
      >
        <textarea
          className="journal__content"
          ref={contentArea}
          onKeyDown={keyHandler}
          value={content}
          onChange={e => setContent(e.target.value)}
          spellCheck="false"
        />
        <Button className="save__button" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default styled(JournalForm)`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
  .journal__titleForm {
    input {
      width: 100%;
      height: 2rem;
      font-weight: bold;
      padding: 0 0.5rem;
      border: 1px solid lightgray;
      border-radius: 0.5rem;
      &:focus {
        outline: none;
        border: 1px solid gray;
      }
    }
  }
  .journal__contentContainer {
    transition: all 300ms ease-out;
    overflow: hidden;
    height: 0;
    opacity: 0;
    .journal__content {
      flex: 1;
      width: 100%;
      padding: 0.5rem;
      resize: none;
      line-height: 1.2em;
      border: 1px solid lightgray;
      border-radius: 0.5rem;
      &:focus {
        outline: none;
        border: 1px solid gray;
      }
    }
    .save__button {
      color: #705800;
      margin-top: 1rem;
      border-radius: 0.5rem;
      width: 100%;
      height: 2rem;
      background-color: #ffc800;
      font-weight: bold;
      transition: all 300ms ease-in-out;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .openContent {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    height: 15rem;
    opacity: 1;
  }
`;
