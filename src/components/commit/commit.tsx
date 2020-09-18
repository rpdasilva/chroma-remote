import React from "react";

import { Box } from "../box";
import { Text } from "../text";

export const Commit = ({
  branchName,
  commit,
  isHead,
  isHighlighted,
  onCommitDisplay,
}) => (
  <Box position="relative">
    {isHead && (
      <Text position="absolute" mt={-4} variant="body" textAlign="center">
        {branchName}
      </Text>
    )}
    <Box
      display="flex"
      alignContent="center"
      alignItems="center"
      borderRadius="100%"
      borderWidth={3}
      borderStyle="solid"
      height={3}
      width={3}
      borderColor="ui.primary"
      bg={isHighlighted ? "brand.accent" : null}
    >
      <Text variant="body" textAlign="center">
        <button onClick={() => onCommitDisplay(commit)}>
          {commit.hash.slice(0, 6)}
        </button>
      </Text>
    </Box>
  </Box>
);
