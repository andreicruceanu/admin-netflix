import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: "",
    children: [
      {
        index: true,
      },
      {
        path: "dashboard",

        children: [
          {
            index: true,
          },
        ],
      },
    ],
  },
]);
