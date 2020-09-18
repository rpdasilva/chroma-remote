import styled from "styled-components";
import {
  compose,
  space,
  layout,
  flexbox,
  border,
  position,
  color,
  typography,
  variant,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  BorderProps,
  PositionProps,
  TypographyProps,
} from "styled-system";

export type TypographyFunctionsProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BorderProps &
  PositionProps &
  TypographyProps;

export const typographyFunctions = compose(
  space,
  color,
  layout,
  flexbox,
  border,
  position,
  typography
);

export type TextProps = {
  variant: "body" | "caption" | "hint" | "label";
} & TypographyFunctionsProps;

const defaultextStyles = {
  fontFamily: "body",
  fontWeight: "regular",
  lineHeight: "copy",
  color: "text.primary",
  mt: 0,
  mb: 0,
};

const textVariants = variant({
  variants: {
    body: {
      ...defaultextStyles,
      fontSize: 2,
    },
    caption: {
      ...defaultextStyles,
      fontSize: 1,
    },
    hint: {
      ...defaultextStyles,
      fontSize: 0,
    },
    label: {
      ...defaultextStyles,
      fontFamily: "heading",
      fontSize: 1,
      fontWeight: "medium",
    },
  },
});

export const Text = styled.p<TextProps>`
  ${textVariants}
  ${typographyFunctions}
`;

Text.defaultProps = {
  variant: "body",
};
