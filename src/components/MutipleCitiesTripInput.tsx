import React, { FC, useCallback } from "react";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";

import { CityFinderInput } from "./CityFinderInput";

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
}

export const MutipleCitiesTripInput: FC<Props> = ({ onChange, value }) => {
  const addCity = useCallback(() => {
    onChange([...value, ""]);
  }, [onChange, value]);

  const removeCity = useCallback(
    (index: number) => {
      onChange(value.filter((c, idx) => index !== idx));
    },
    [onChange, value]
  );

  const updateCity = useCallback(
    (index: number, city: string) => {
      onChange(value.map((c, idx) => (index === idx ? city : c)));
    },
    [onChange, value]
  );

  return (
    <Box>
      {value.map((city, idx) => (
        <Flex
          key={city}
          gap={4}
          display="flex"
          alignItems="center"
          width="100%"
          mb={4}
        >
          <Box width="100%">
            <CityFinderInput
              key={idx}
              value={city}
              onChange={(val) => updateCity(idx, val)}
            />
          </Box>
          <IconButton
            aria-label="Delete city"
            colorScheme="red"
            icon={<IoIosCloseCircle />}
            onClick={() => removeCity(idx)}
          />
        </Flex>
      ))}

      <Box my={2}>
        <Button
          size="sm"
          variant="ghost"
          border="1px"
          colorScheme="green"
          rightIcon={<AiOutlinePlus />}
          onClick={addCity}
        >
          Add stop city
        </Button>
      </Box>
    </Box>
  );
};
