import { css } from "@emotion/core";

import colors from "./colors";

export default css`
  @font-face {
    font-family: "roboto";
    src: local("Roboto"), local("Roboto-Regular"),
      url("/fonts/Roboto/roboto-regular.woff") format("woff"),
      url("/fonts/Roboto/roboto-Italic.woff") format("woff"),
      url("/fonts/Roboto/roboto-700.woff") format("woff"),
      url("/fonts/Roboto/roboto-700italic.woff") format("woff"),
      url("/fonts/Roboto/roboto-300.woff") format("woff"),
      url("/fonts/Roboto/roboto-300.woff") format("woff");
  }

  html {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    height: 100%;
  }

  body {
    height: 100%;
    background: ${colors.greyscale[8]};
  }

  #__next {
    display: flex;
    flex-direction column;
    height: 100%;
  }

  a {
    color: ${colors.greyscale[2]};
    &:hover {
      color: ${colors.accent.neutral};
    }
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-size: 1.6rem;
  }
  h2 {
    font-size: 1.4rem
  }
  h2 {
    font-size: 1.3rem
  }
  h4, h5, h6 {
    font-size: 1.2rem;
  }

  p {
    margin-top: 0;
  }
`;
