import { createCss } from "@stitches/react";
import { normalize } from "normalize-stitches";

export const {
  styled,
  css,
  theme,
  getCssString,
  global,
  keyframes,
  media,
  prefix,
  utils,
} = createCss({
  theme: {
    colors: {
      primary: "#0070f3",
      background: "white",
      text: "black",
    },
    space: {
      1: "0.5rem",
      2: "0.75rem",
      3: "1rem",
      4: "1.5rem",
      5: "3rem",
      6: "5rem",
    },
    fontSizes: {
      1: "1.1rem",
      2: "1.25rem",
      3: "1.5rem",
      4: "4rem",
    },
    fonts: {
      normal:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      mono: "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",
    },
    fontWeights: {
      normal: "normal",
      bold: "bold",
    },
    lineHeights: {
      1: 1.15,
      2: 1.5,
    },
    letterSpacings: {},
    sizes: {},
    borderWidths: {
      1: "1px",
    },
    borderStyles: {},
    radii: {
      1: "5px",
      2: "10px",
    },
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  media: {
    sm: "(max-width: 600px)",
  },
  utils: {
    m: (config) => (value) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (config) => (value) => ({
      marginTop: value,
    }),
    mr: (config) => (value) => ({
      marginRight: value,
    }),
    mb: (config) => (value) => ({
      marginBottom: value,
    }),
    ml: (config) => (value) => ({
      marginLeft: value,
    }),
    mx: (config) => (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (config) => (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    p: (config) => (value) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (config) => (value) => ({
      paddingTop: value,
    }),
    pr: (config) => (value) => ({
      paddingRight: value,
    }),
    pb: (config) => (value) => ({
      paddingBottom: value,
    }),
    pl: (config) => (value) => ({
      paddingLeft: value,
    }),
    px: (config) => (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (config) => (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    size: (config) => (value) => ({
      width: value,
      height: value,
    }),
  },
});

export const darkTheme = theme("dark-mode", {
  colors: {
    background: "black",
    text: "white",
  },
});

export const globalStyles = global({
  ...normalize,
  "html,body": {
    fontFamily: "$normal",
    fontSize: "$2",

    backgroundColor: "$background",
    color: "$text",
  },
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
});
