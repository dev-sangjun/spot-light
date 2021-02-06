import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { auth, store } from "../firebase";
import { Entry } from "../components";
import isEmpty from "is-empty";
import { setIndex } from "../reducers/sidebar";

const Bookmark = props => {
  const { className } = props;
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);

  const onChange = e => {
    const { value } = e.target;
    setKeyword(value);
    setFilteredEntries(
      entries.filter(
        entry => entry.title.includes(value) || entry.content.includes(value)
      )
    );
  };

  useEffect(() => {
    dispatch(setIndex(1));
    //get entries
    store
      .collection("users")
      .doc(user.uid)
      .collection("entries")
      .orderBy("dateCreated", "asc")
      .onSnapshot(snapshot => {
        const entries_ = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filtered = entries_.filter(entry => entry.bookmarked);
        setEntries(filtered);
        setFilteredEntries(filtered);
      });
  }, [user.uid, dispatch]);
  return (
    <div className={`${className} width-limit`}>
      <div className="search__container">
        <input
          type="text"
          placeholder="Search any keyword from title or content..."
          onChange={onChange}
          value={keyword}
        />
      </div>
      <div className="bookmark__container">
        {isEmpty(filteredEntries) ? (
          <span>Please bookmark your favorite entries.</span>
        ) : (
          <ul className="bookmark__list">
            {filteredEntries.map(entry => (
              <Entry key={entry.id} entry={entry} displayDate={true} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default styled(Bookmark)`
  width: 100%;
  height: 100%;
  padding: 2rem 8rem;
  background-color: #f5f5f9;
  font-family: "Open Sans", sans-serif;
  .search__container {
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    background-color: white;
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
  .bookmark__container {
    background-color: white;
    border-radius: 1rem;
    margin-top: 1rem;
    min-height: 2rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    .bookmark__list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
  }
  @media (max-width: 640px) {
    padding: 1rem;
  }
`;
