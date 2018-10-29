import { injectGlobal } from "emotion";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  html, body {
    font: 400 16px/24px sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-smoothing: grayscale;
    height: 100%;
    text-size-adjust: 100%;
  }

  body, div, dl, dd, form, img, input, figure, menu {
    margin: 0;
    padding: 0;
  }

  #wejo-root {
    display: flex;
    height: 100%;
  }
`;
