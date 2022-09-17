import React, { FC, useMemo, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from "@chakra-ui/react";

import * as joi from "joi";

import { CityFinderInput } from "./CityFinderInput";
import { MutipleCitiesTripInput } from "./MutipleCitiesTripInput";

const schema = joi
  .object<TripFormValues>({
    originCity: joi.string().required(),
    destinationCity: joi.string().required(),
    dateOfDeparture: joi.string().required(),
    numberOfPassengers: joi.number().required().min(1).max(10),
    intermediateCities: joi.array().items(joi.string()),
  })
  .required();

interface Props {
  defaultValues?: TripFormValues;
  onSubmit: (values: TripFormValues) => void;
}

export interface TripFormValues {
  originCity: string;
  destinationCity: string;
  intermediateCities: string[];
  dateOfDeparture: string;
  numberOfPassengers: number;
}

export const TripForm: FC<Props> = ({ defaultValues, onSubmit }) => {
  const [originCity, setOriginCity] = useState(defaultValues?.originCity ?? "");
  const [destinationCity, setDestinationCity] = useState(
    defaultValues?.destinationCity ?? ""
  );
  const [dateOfDeparture, setDateOfDeparture] = useState(
    defaultValues?.dateOfDeparture ?? ""
  );
  const [numberOfPassengers, setNumberOfPassengers] = useState(
    defaultValues?.numberOfPassengers ?? 0
  );
  const [intermediateCities, setIntermediateCities] = useState(
    defaultValues?.intermediateCities ?? []
  );

  const isValid = useMemo(() => {
    const validation = schema.validate(
      {
        originCity,
        destinationCity,
        dateOfDeparture,
        intermediateCities,
        numberOfPassengers,
      },
      { abortEarly: false }
    );

    return !validation.error;
  }, [
    originCity,
    destinationCity,
    dateOfDeparture,
    intermediateCities,
    numberOfPassengers,
  ]);

  const handleSubmit = (ev: any) => {
    ev.preventDefault();

    onSubmit({
      originCity,
      destinationCity,
      dateOfDeparture,
      numberOfPassengers,
      intermediateCities,
    });
  };

  return (
    <Box p={5} boxShadow="md" bg="white" px="4">
      <Heading size="lg" as="h2" mb={8} textAlign="center">
        Calculate your trip distance
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl py={2}>
          <FormLabel>City of origin</FormLabel>
          <CityFinderInput onChange={setOriginCity} value={originCity} />
        </FormControl>

        <FormControl py={2}>
          <FormLabel>City of origin</FormLabel>
          <CityFinderInput
            onChange={setDestinationCity}
            value={destinationCity}
          />
        </FormControl>

        <FormControl py={2}>
          <FormLabel>Intermediate cities</FormLabel>
          <MutipleCitiesTripInput
            onChange={setIntermediateCities}
            value={intermediateCities}
          />
        </FormControl>

        <FormControl py={2}>
          <FormLabel>Date of the trip</FormLabel>
          <Input
            type="date"
            value={dateOfDeparture}
            onChange={(e) => setDateOfDeparture(e.target.value)}
          />
        </FormControl>

        <FormControl py={2}>
          <FormLabel>Number of passengers</FormLabel>
          <NumberInput
            defaultValue={0}
            min={0}
            max={10}
            value={numberOfPassengers}
            onChange={(val) => setNumberOfPassengers(Number(val))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Box textAlign="center">
          <Button
            colorScheme="blue"
            type="submit"
            mr={3}
            rightIcon={<IoSearchSharp />}
            disabled={!isValid}
          >
            Calculate
          </Button>
        </Box>
      </form>
    </Box>
  );
};
