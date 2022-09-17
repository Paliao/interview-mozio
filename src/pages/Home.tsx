import React from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { TripForm, TripFormValues } from "../components";

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: TripFormValues) => {
    const params = new URLSearchParams();

    for (const [field, value] of Object.entries(values)) {
      if (Array.isArray(value)) {
        Object.entries(value).forEach((item) =>
          params.append(field, item.toString())
        );
      } else {
        params.append(field, value);
      }

      params.append(field, value);
    }

    navigate({
      pathname: "/search",
      search: params.toString(),
    });
  };

  return (
    <Box
      h="100vh"
      w="100vw"
      bg="gray.300"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="50%">
        <TripForm onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};

export default Home;
