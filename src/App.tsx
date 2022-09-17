import React from "react";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

function App() {
  return (
    <ChakraProvider>
      <Box
        h="100vh"
        w="100vw"
        bg="gray.300"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
