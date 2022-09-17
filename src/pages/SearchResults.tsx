import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { TripForm, TripFormValues } from "../components";

type InitialSearchParamsValues = { intermediateCities: string } & Omit<
  TripFormValues,
  "intermediateCities"
>;

const SearchResults = () => {
  let [searchParams] = useSearchParams();

  const initialValues = useMemo(() => {
    const urlParams = new URLSearchParams(searchParams);
    // @ts-ignore
    const params = Object.fromEntries(urlParams) as InitialSearchParamsValues;

    return {
      ...params,
      intermediateCities: params.intermediateCities.split(","),
    };
  }, [searchParams]);

  return (
    <>
      <TripForm onSubmit={console.log} defaultValues={initialValues} />
    </>
  );
};

export default SearchResults;
