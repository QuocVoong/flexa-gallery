import {theme} from "@chakra-ui/react";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    brandSecondary: {
      900: "#fffafa",
      800: "#f5fffb",
      700: "#f8f8ff",
    },
    primary: {
      50: "#fff2e0",
      100: "#f9dbb6",
      200: "#f4c38b",
      300: "#eeac5d",
      400: "#ea9431",
      500: "#d07a19",
      600: "#a35f12",
      700: "#74440b",
      800: "#472904",
      900: "#1b0d00",
    },
    secondary: {
      50: '#f1f1fc',
      100: "#d4d9df",
      200: "#bbbfc4",
      300: "#a1a6ab",
      400: "#878c92",
      500: "#6d7378",
      600: "#54595e",
      700: "#3b4044",
      800: "#22262b",
      900: "#001010",
    },
  },

};

export default customTheme;