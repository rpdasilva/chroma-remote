import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../src/theme";

const ThemeDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);

export default ThemeDecorator;
