import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  section {
    max-width: 1200px;
    margin: auto;
  }
  .shadow {
    box-shadow: 0 1em 3em rgba(0, 0, 0, 0.2);
  }
  .btn {
    &:hover {
      cursor: pointer;
    }
  }
  .smooth-image {
    transition: opacity 1s; 
  }
  .image-visible {opacity: 1}
  .image-hidden {opacity: 0}
  ::-webkit-scrollbar {
    width: 2px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ffc800; 
  }
`;
