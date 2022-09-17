import React, { FC } from "react";
import { Box, BoxProps, Flex, Icon, Text } from "@chakra-ui/react";
import { IoMdCar } from "react-icons/io";
import { GiPathDistance } from "react-icons/gi";

import { HiArrowSmRight } from "react-icons/hi";

interface Props extends BoxProps {
  children?: React.ReactNode;
  destinationCity: string;
  originCity: string;
  traveledDistance: number;
}

export const CitiesTravel: FC<Props> = ({
  children,
  destinationCity,
  originCity,
  traveledDistance,
  ...rest
}) => {
  return (
    <Box p={4} border="1px" borderColor="gray.300" borderRadius="md" {...rest}>
      <Flex flexDirection="row" mx="auto" alignItems="end" gap={2}>
        <Icon as={IoMdCar} mr={2} fontSize="2xl" />

        <Flex justifyContent="space-between" width="100%">
          <Text fontWeight="bold">Route:</Text>

          <Flex alignItems="center" minWidth="150px">
            <Text ml="auto">{originCity}</Text>
            <Icon mx={1} as={HiArrowSmRight} color="gray.500" />
            <Text>{destinationCity}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDirection="row" mx="auto" alignItems="end" gap={2}>
        <Icon as={GiPathDistance} mr={2} fontSize="2xl" />

        <Flex justifyContent="space-between" width="100%">
          <Text fontWeight="bold">Distance:</Text>

          <Text>
            {traveledDistance}{" "}
            <Text as="span" fontWeight="bold">
              km
            </Text>
          </Text>
        </Flex>
      </Flex>

      {children}
    </Box>
  );
};
