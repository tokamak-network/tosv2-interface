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
    100: "#fffffff",
    200: "#f1f1f1",
  },
  gray: {
    100: "#8b8b93",
    200: "#64646f",
    300: "#313442",
    400: "#2c2c35",
  },
  black: {
    100: "#0f0f12",
  },
};

const BUTTON_STYLE = {
  buttonStyle: (props: THEME_PROPS) => ({
    backgroundColor: props.colorMode === "light" ? "white" : "none",
  }),
};

const theme = extendTheme({
  colors,
  fonts,
  BUTTON_STYLE,
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
