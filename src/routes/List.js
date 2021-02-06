import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import isEqual from "is-equal";
import isEmpty from "is-empty";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { JournalForm, Entry } from "../components";
import { setEntryDay } from "../reducers/day";
import { setIndex } from "../reducers/sidebar";
import { auth, store } from "../firebase";
import { getDayFromDate, getStringFromDay } from "../utils";

const List = props => {
  const { className } = props;
  const user = auth.currentUser;
  const dispatch = useDispatch();

  // States
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [daysWithEntries, setDaysWithEntries] = useState([]);

  // Selectors
  const entryDay = useSelector(state => state.day);

  // Methods
  const onDaySelect = day => {
    dispatch(setEntryDay(day));
    filterEntries(entries, day);
  };
  const filterEntries = (entries, day) => {
    const filtered = entries.filter(entry => {
      const day = getDayFromDate(entry.dateCreated.toDate());
      return isEqual(entryDay, day);
    });
    setFilteredEntries(filtered);
  };
  const addDays = (days, day) => {
    for (let i = 0; i < days.length; i++) {
      if (isEqual(days[i], day)) return;
    }
    days.push({ ...day, className: "yellowDay" });
  };

  useEffect(() => {
    dispatch(setIndex(2));
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
        setEntries(entries_);
        let days = [];
        snapshot.docs.forEach(doc => {
          const { dateCreated } = doc.data();
          if (dateCreated) {
            const day = getDayFromDate(dateCreated.toDate());
            addDays(days, day);
          }
        });
        setDaysWithEntries(days);
        filterEntries(entries_, entryDay);
      });
  }, [entryDay, user.uid, dispatch]);
  return (
    <div className={`${className} width-limit`}>
      <JournalForm />
      <div className="entry__displayContainer">
        <Calendar
          value={entryDay}
          onChange={onDaySelect}
          colorPrimary="#ffc800" // added this
          calendarClassName="custom-calendar" // and this
          calendarTodayClassName="custom-today-day" // also this
          customDaysClassName={daysWithEntries}
          shouldHighlightWeekends
          maximumDate={utils().getToday()}
        />
        <div className="entry__display">
          <div className="display__topContainer">
            <h3 className="entry__date">
              {entryDay && getStringFromDay(entryDay)}
            </h3>
          </div>
          <div className="display__body">
            {isEmpty(filteredEntries) ? (
              <span className="entry__empty">
                Please put anything you want to entries.
              </span>
            ) : (
              <ul className="entry__list">
                {filteredEntries.map(entry => (
                  <Entry key={entry.id} entry={entry} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default styled(List)`
  width: 100%;
  height: 100%;
  padding: 2rem 8rem;
  background-color: #f5f5f9;
  font-family: "Open Sans", sans-serif;
  .entry__displayContainer {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 1rem;
    overflow: hidden;
    margin-top: 1rem;
    height: 25rem;
    /* Calendar styles */
    .custom-calendar {
      min-width: 330px;
      background-color: transparent;
      box-shadow: none;
    }
    .custom-today-day {
      color: #ffc800 !important;
      border: 2px solid #ffc800 !important;
    }
    .custom-today-day::after {
      visibility: hidden; /* hide small border under the text */
    }
    .yellowDay:not(.-selectedStart):not(.-selectedBetween):not(.-selectedEnd):not(.-selected) {
      border: 1px solid #ffc800 !important;
    }
    .entry__display {
      background-color: white;
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 2rem;
      border-left: 1px dashed #ffc800;
      position: relative;
      .display__topContainer {
        .entry__date {
          margin-left: 1rem;
        }
      }
      .display__body {
        display: flex;
        justify-content: center;
        flex: 1;
        width: 100%;
        padding: 1rem;
        overflow: auto;
        .entry__empty {
          margin-bottom: 1rem;
        }
        .entry__list {
          list-style: none;
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 960px) {
    .entry__displayContainer {
      flex-direction: column;
      height: auto;
      .entry__display {
        width: 100%;
        border-left: none;
        border-top: 1px dashed #ffc800;
        padding: 0;
        .display__topContainer {
          .entry__date {
            margin-top: 1rem;
            margin-left: 0;
            text-align: center;
          }
        }
      }
    }
  }
  @media (max-width: 640px) {
    padding: 1rem;
  }
`;
