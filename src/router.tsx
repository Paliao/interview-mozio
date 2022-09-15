import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
]);
