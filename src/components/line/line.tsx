import React from "react";

import { Box } from "../box";

export const Line = ({ forkMerge, rotationDirection }) => (
  <Box
    height="0.25rem"
    width={3}
    bg="ui.primary"
    mt={forkMerge ? -5 : 0}
    style={
      forkMerge && {
        transform: `rotate(${Number(!rotationDirection)}45deg)`,
      }
    }
  />
);
