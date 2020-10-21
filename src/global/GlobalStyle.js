import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .width-limit {
    max-width: 1200px;
    margin: auto;
  }
`;
