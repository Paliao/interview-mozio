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
    <Box minW="350px" maxWidth="600px">
      <TripForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default Home;
