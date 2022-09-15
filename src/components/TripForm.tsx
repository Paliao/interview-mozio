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

const schema = joi
  .object({
    originCity: joi.string().required(),
    destinationCity: joi.string().required(),
    dateOfDeparture: joi.string().required(),
    numberOfPassengers: joi.number().required().min(1).max(10),
  })
  .required();

interface Props {
  onSubmit: (values: any) => void;
}

export const TripForm: FC<Props> = ({ onSubmit }) => {
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [dateOfDeparture, setDateOfDeparture] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);

  // const [intermediateCities, setIntermediateCities] = useState([]);

  const isValid = useMemo(() => {
    const validation = schema.validate(
      {
        originCity,
        destinationCity,
        dateOfDeparture,
        numberOfPassengers,
      },
      { abortEarly: false }
    );

    return !validation.error;
  }, [originCity, destinationCity, dateOfDeparture, numberOfPassengers]);

  const handleSubmit = (ev: any) => {
    ev.preventDefault();

    onSubmit({
      originCity,
      destinationCity,
      dateOfDeparture,
      numberOfPassengers,
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

        {/* <CityFinderInput label="Intermediate cities" />
        
      <CityFinderInput label="City of destination" /> */}

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
