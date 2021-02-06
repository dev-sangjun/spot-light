import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setIndex } from "../reducers/sidebar";

const Home = props => {
  const { className } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIndex(0));
  }, [dispatch]);
  return (
    <div className={className}>
      <div className="left__container"></div>
      <div className="body__container"></div>
    </div>
  );
};

export default styled(Home)`
  width: 100%;
  height: 100%;
  padding: 2rem 8rem;
  background-color: #f5f5f9;
  font-family: "Open Sans", sans-serif;
`;
