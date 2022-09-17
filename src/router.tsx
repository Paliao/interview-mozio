import React from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import { ScaleFade } from "@chakra-ui/react";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

const RouteTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <ScaleFade key={location.key} initialScale={0} in={true}>
      {children}
    </ScaleFade>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteTransition>
        <Home />
      </RouteTransition>
    ),
  },
  {
    path: "/search",
    element: (
      <RouteTransition>
        <SearchResults />
      </RouteTransition>
    ),
  },
]);
