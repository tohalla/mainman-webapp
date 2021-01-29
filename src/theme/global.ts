import { css } from "@emotion/core";

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
    height: 100%;
  }

  #__next {
    display: flex;
    flex-direction column;
    height: 100%;
  }

`;
