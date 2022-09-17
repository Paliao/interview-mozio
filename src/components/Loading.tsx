import React, { FC } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
}

export const Loading: FC<Props> = ({ children, isLoading }) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <Flex justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  );
};
