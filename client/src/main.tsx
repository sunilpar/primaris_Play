import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import Test from "./pages/Test.tsx";
import Home from "./pages/Home.tsx";
import Imperium from "./pages/Imperium.tsx";
import Localvideo from "./pages/Localvideo.tsx";
import Video from "./pages/Video.tsx";
import Channel from "./pages/Channel.tsx";
import Search from "./pages/Search.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Imperium />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/localvideo/:src/:title",
        element: <Localvideo />,
      },
      {
        path: "/video/:id",
        element: <Video />,
      },
      {
        path: "/channel/:id",
        element: <Channel />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
