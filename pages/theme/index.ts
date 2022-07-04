import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins";

interface THEME_PROPS {
  colorMode: "light" | "dark";
}

const fonts = {
  Poppins: "Poppins",
};

const colors = {
  blue: {
    100: "#257eee",
    200: "#2775ff",
  },
  white: {
    100: "#ffffff",
    200: "#f1f1f1",
  },
  gray: {
    100: "#8b8b93",
    200: "#64646f",
    300: "#313442",
    400: "#2c2c35",
    500: "#1e1e24",
    600: "#1f2128",
  },
  black: {
    100: "#0f0f12",
  },
  red: {
    100: "#e23738",
  },
};

const PAGE_LAYOUT_STYLE = {
  flexDir: "column",
  w: "100%",
  backgroundColor: "black.100",
  pl: "24px",
  pt: 138,
};

const BUTTON_STYLE = {
  basicButtonStyle: (props: THEME_PROPS) => ({
    background: props.colorMode === "light" ? "white" : "none",
    borderWidth: 1,
    borderColor: props.colorMode === "light" ? "" : "#8a8a98",
    borderRadius: 8,
    color: props.colorMode === "light" ? "#f1f1f1" : "#f1f1f1",
  }),
  submitButtonStyle: (props: THEME_PROPS) => ({
    background: props.colorMode === "light" ? "white" : "#257eee",
    borderRadius: 8,
    color: props.colorMode === "light" ? "#f1f1f1" : "#f1f1f1",
  }),
};

const theme = extendTheme({
  colors,
  fonts,
  BUTTON_STYLE,
  PAGE_LAYOUT_STYLE,
  initialColorMode: "dark",
  styles: {
    global: (props: THEME_PROPS) => ({
      "html, body": {
        backgroundColor:
          props.colorMode === "light" ? "black.100" : "black.100",
        fontFamily: fonts.Poppins,
        color: props.colorMode === "light" ? "gray.100" : "gray.100",
      },
      button: {
        backgroundColor: "black.100",
      },
    }),
  },
});

export default theme;
