import React from "react";
import styled from "styled-components";
import HeroImage from "../images/hero.png";

const Hero = props => {
  const { className } = props;
  return (
    <div className={`${className} width-limit`}>
      <img className="hero__image" src={HeroImage} alt="hero" />
    </div>
  );
};

export default styled(Hero)`
  .hero__image {
    display: block;
    width: 100%;
  }
`;
