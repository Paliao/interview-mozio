import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Api, Travel } from "../services/api";

import { Loading, TripFormValues } from "../components";
import { TravelRoute } from "../components/TravelRoute";

type InitialSearchParamsValues = { intermediateCities: string } & Omit<
  TripFormValues,
  "intermediateCities"
>;

const SearchResults = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [isLoadingTravel, setIsLoadingTravel] = useState(false);
  const [travel, setTravel] = useState<Travel>();

  const initialValues = useMemo<TripFormValues>(() => {
    const urlParams = new URLSearchParams(searchParams);
    // @ts-ignore
    const params = Object.fromEntries(urlParams) as InitialSearchParamsValues;

    return {
      ...params,
      intermediateCities: params.intermediateCities.split(","),
    };
  }, [searchParams]);

  const getTrip = async () => {
    setIsLoadingTravel(true);
    const api = new Api();

    const travelResp = await api.calculateTravel(initialValues);
    setTravel(travelResp);
    setIsLoadingTravel(false);
  };

  useEffect(() => {
    getTrip();
  }, []);

  const onGoBack = () => {
    navigate({
      pathname: "/",
      search: searchParams.toString(),
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
      borderRadius="lg"
    >
      <Box bg="white" boxShadow="lg" borderRadius="md" p={8} width="450px">
        <Loading isLoading={isLoadingTravel}>
          {travel && <TravelRoute travel={travel} onGoBack={onGoBack} />}
        </Loading>
      </Box>
    </Box>
  );
};

export default SearchResults;
