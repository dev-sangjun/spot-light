import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { setEntry } from "../reducers/entry";
import { openModal } from "../reducers/modal";
import { auth, store } from "../firebase";
import { getDayFromDate, getStringFromDay } from "../utils";

const Entry = props => {
  const { className, entry, displayDate } = props;
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const onEntryClick = () => {
    dispatch(setEntry(entry));
    dispatch(openModal());
  };
  const updateBookmarked = bookmarked => {
    store
      .collection("users")
      .doc(user.uid)
      .collection("entries")
      .doc(entry.id)
      .update({
        bookmarked,
      })
      .catch(err => alert(err.messsage));
  };
  const onBookmark = e => {
    e.stopPropagation();
    updateBookmarked(true);
  };
  const onUnbookmark = e => {
    e.stopPropagation();
    updateBookmarked(false);
  };
  return (
    <li className={`${className} btn`} key={entry.id} onClick={onEntryClick}>
      <span className="entry__title">{entry.title}</span>
      <div className="entry__rightContainer">
        {displayDate && (
          <span className="dateCreated">
            {getStringFromDay(getDayFromDate(entry.dateCreated.toDate()))}
          </span>
        )}
        {entry.bookmarked ? (
          <Bookmark className="bookmark__icon" onClick={onUnbookmark} />
        ) : (
          <BookmarkBorder className="bookmark__icon" onClick={onBookmark} />
        )}
      </div>
    </li>
  );
};

export default styled(Entry)`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #ffc800;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  background-color: white;
  .bookmark__icon {
    color: #ffc800;
    &:hover {
      opacity: 0.5;
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background-color: #f8f8f8;
  }
  .entry__title {
    width: 100%;
    max-width: 20rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .entry__rightContainer {
    display: flex;
    align-items: center;
    .dateCreated {
      color: lightgray;
      margin-right: 1rem;
    }
  }
`;
