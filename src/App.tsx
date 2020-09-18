import React from "react";
import { Box } from "./components/box";
import { Text } from "./components/text";
import { useApi } from "./hooks/use-api";

export const App = () => {
  const [{ data, isLoading, isError }] = useApi(
    "https://api.github.com",
    {} as any
  );

  return (
    <Box p={3} bg="ui.tertiary">
      {isError && (
        <Text variant="body" color="text.error" textAlign="center">
          Error
        </Text>
      )}
      {isLoading ? (
        <Text variant="body" color="text.primary" textAlign="center">
          Loading...
        </Text>
      ) : (
        <Text variant="body" color="text.primary" textAlign="center">
          Loaded: {data.current_user_url}
        </Text>
      )}
    </Box>
  );
};
