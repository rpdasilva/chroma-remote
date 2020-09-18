import { addDecorator } from "@storybook/react";
import ThemeDecorator from "./theme-decorator";

addDecorator(ThemeDecorator);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
