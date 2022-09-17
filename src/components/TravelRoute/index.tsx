import React, { FC, useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  Heading,
  Collapse,
  Divider,
} from "@chakra-ui/react";
import { get } from "lodash";

import { BsCalendar2Date } from "react-icons/bs";
import { HiArrowSmLeft, HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import { IoPeopleSharp } from "react-icons/io5";

import { Travel } from "../../services/api";
import { CitiesTravel } from "./CitiesTravel";

interface Props {
  travel: Travel;

  onGoBack: () => void;
}

export const TravelRoute: FC<Props> = ({ onGoBack, travel }) => {
  const [travelPointsExpanded, setTravelPointsExpanded] = useState(false);

  const travelPoints = get(travel, "travel", []);

  const originCity = get(travelPoints, [0, "from"], "");
  const destinationCity = get(
    travelPoints,
    [travelPoints.length - 1, "to"],
    ""
  );

  return (
    <>
      <Box textAlign="center" position="relative">
        <Icon
          as={HiArrowSmLeft}
          fontSize="2xl"
          left={0}
          top={1}
          position="absolute"
          cursor="pointer"
          onClick={onGoBack}
        />
        <Heading size="md" mb={4} textAlign="center" textDecoration="underline">
          Travel Calculator
        </Heading>
      </Box>

      <CitiesTravel
        originCity={originCity}
        destinationCity={destinationCity}
        traveledDistance={travel.traveledDistance}
      >
        <Flex flexDirection="row" mx="auto" alignItems="end" gap={2}>
          <Icon as={IoPeopleSharp} mr={2} fontSize="2xl" />

          <Flex justifyContent="space-between" width="100%">
            <Text fontWeight="bold">Passengers:</Text>

            <Text>{travel.numberOfPassengers}</Text>
          </Flex>
        </Flex>
        <Flex flexDirection="row" mx="auto" alignItems="end" gap={2}>
          <Icon as={BsCalendar2Date} mr={2} fontSize="2xl" />

          <Flex justifyContent="space-between" width="100%">
            <Text fontWeight="bold">Departure date:</Text>

            <Text>{travel.dateOfDeparture.replace(/\-/gi, "/")}</Text>
          </Flex>
        </Flex>
      </CitiesTravel>

      <Flex
        justifyContent="space-between"
        alignItems="start"
        cursor="pointer"
        onClick={() => setTravelPointsExpanded((prev) => !prev)}
        _hover={{ textDecoration: "underline" }}
      >
        <Heading size="sm" mt={8} mb={4} textAlign="center">
          {travelPointsExpanded ? "Hide" : "Show"} Checkpoints
        </Heading>
        <Icon
          as={travelPointsExpanded ? HiArrowSmUp : HiArrowSmDown}
          ml={2}
          mt={10}
          fontSize="xl"
        />
      </Flex>

      <Collapse in={travelPointsExpanded}>
        {travelPointsExpanded && (
          <Box>
            <Divider mb={6} />
            {travelPoints.map((travelPoint, index) => (
              <Box>
                <CitiesTravel
                  key={index}
                  originCity={travelPoint.from}
                  destinationCity={travelPoint.to}
                  traveledDistance={travelPoint.travelDistance}
                />
                {index !== travelPoints.length - 1 && (
                  <Box my={4} textAlign="center">
                    <Text fontWeight="bold">
                      {index !== travelPoints.length - 2
                        ? "Next checkpoint"
                        : "Final checkpoint"}
                    </Text>
                    <Divider my={2} bg="gray.700" />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Collapse>
    </>
  );
};
