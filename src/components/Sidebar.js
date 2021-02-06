import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { Bookmark, Create, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Sidebar = props => {
  const { className } = props;
  const index = useSelector(state => state.sidebar);
  return (
    <div className={className}>
      <ul className="sidebar__icons">
        {/* <li className="sidebar__iconContainer">
          <Link to="/">
            <IconButton className={`iconButton ${index === 0 && "selected"}`}>
              <Home />
            </IconButton>
          </Link>
        </li> */}
        <li className="sidebar__iconContainer">
          <Link to="/bookmark">
            <IconButton className={`iconButton ${index === 1 && "selected"}`}>
              <Bookmark />
            </IconButton>
          </Link>
        </li>
        <li className="sidebar__iconContainer">
          <Link to="/list">
            <IconButton className={`iconButton ${index === 2 && "selected"}`}>
              <Create />
            </IconButton>
          </Link>
        </li>
        <li className="sidebar__iconContainer">
          <Link to="/settings">
            <IconButton className={`iconButton ${index === 3 && "selected"}`}>
              <Settings />
            </IconButton>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default styled(Sidebar)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffc800;
  width: 4.5rem;
  height: 100%;
  .sidebar__icons {
    padding: 1rem 0;
    .sidebar__iconContainer {
      display: flex;
      justify-content: center;
      background-color: #ffc800;
      padding: 0.25rem;
      .iconButton {
        margin: auto;
        color: #ad8700;
      }
      .selected {
        color: black;
      }
    }
  }
  @media (max-width: 640px) {
    position: fixed;
    top: auto;
    left: auto;
    bottom: env(safe-area-inset-bottom);
    left: 0;
    height: auto;
    background-color: #ffc800;
    width: 100%;
    .sidebar__icons {
      display: flex;
      justify-content: space-evenly;
      padding: 0;
      margin-top: 0;
      .sidebar__iconContainer {
        display: flex;
        align-items: center;
        background-color: #ffc800;
        padding: 0.25rem;
      }
    }
  }
`;
