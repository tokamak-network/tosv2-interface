import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins";
import { BalanceInput } from "common/input/TextInput";

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
    300: "#fafbfc",
  },
  gray: {
    100: "#8b8b93",
    200: "#64646f",
    300: "#313442",
    400: "#2c2c35",
    500: "#1e1e24",
    600: "#1f2128",
    700: "#9a9aaf",
    800: "#07070c",
    900: "#e8edf2",
    1000: "#7e7e8f",
    1100: "#70707c",
    1200: "#e2e2ea",
    1300: "#f5f5fa",
  },
  black: {
    100: "#0f0f12",
    200: "#121318",
    300: "#07070c",
  },
  red: {
    100: "#e23738",
  },
  green: {
    100: "#5eea8d",
  },
  progress: "#5eea8d",
};

const PAGE_LAYOUT_STYLE = {
  layoutTheme: (props: THEME_PROPS) => ({
    flexDir: "column",
    w: "100%",
    // backgroundColor: props.colorMode === "light" ? "#e23738" : "#257eee",
  }),
};

const BUTTON_STYLE = {
  basicButtonStyle: (props: THEME_PROPS) => ({
    background: props.colorMode === "light" ? "white" : "none",
    borderWidth: 1,
    borderColor: props.colorMode === "light" ? "#7e7e8f" : "#8a8a98",
    borderRadius: 8,
    color: props.colorMode === "light" ? "#07070c" : "#f1f1f1",
  }),
  submitButtonStyle: (props: THEME_PROPS) => ({
    background: props.colorMode === "light" ? "white" : "#257eee",
    borderRadius: 8,
    color: props.colorMode === "light" ? "#07070c" : "#f1f1f1",
  }),
};

const breakpoints = ["0px", "1024px", "1440px"];

const theme = extendTheme({
  colors,
  fonts,
  BUTTON_STYLE,
  PAGE_LAYOUT_STYLE,
  initialColorMode: "dark",
  breakpoints,
  styles: {
    global: (props: THEME_PROPS) => ({
      "html, body": {
        backgroundColor:
          props.colorMode === "light" ? "white.300" : "black.100",
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
