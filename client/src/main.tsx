// import React from "react";

// import "./index.css";
// import App from "./App.tsx";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import ReactDOM from "react-dom/client";

// import Home from "./pages/Home.tsx";
// import Imperium from "./pages/Imperium.tsx";
// import Localvideo from "./pages/Localvideo.tsx";
// import Video from "./pages/Video.tsx";
// import Search from "./pages/Search.tsx";
// import Login from "./pages/Login.tsx";
// import Signup from "./pages/Signup.tsx";
// import Logout from "./components/sidebar/Logout.tsx";
// import Profile from "./pages/Profile.tsx";
// import Settings from "./pages/Settings.tsx";
// import History from "./pages/History.tsx";
// import Upload from "./pages/Upload.tsx";
// import Editvideo from "./pages/Editvideo.tsx";
// import Legiondetails from "./pages/Legiondetails.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Imperium />,
//       },
//       {
//         path: "/home",
//         element: <Home />,
//       },

//       {
//         path: "/localvideo/:src/:title",
//         element: <Localvideo />,
//       },
//       {
//         path: "/video/:id",
//         element: <Video />,
//       },
//       {
//         path: "/search/:query",
//         element: <Search />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/signup",
//         element: <Signup />,
//       },
//       {
//         path: "/logout",
//         element: <Logout />,
//       },
//       {
//         path: "/profile/:id",
//         element: <Profile />,
//       },
//       {
//         path: "/History",
//         element: <History />,
//       },
//       {
//         path: "/setting",
//         element: <Settings />,
//       },
//       {
//         path: "/upload",
//         element: <Upload />,
//       },
//       {
//         path: "/edit/:id",
//         element: <Editvideo />,
//       },
//       {
//         path: "/legion",
//         element: <Legiondetails />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

import React from "react";

import "./index.css";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import Home from "./pages/Home.tsx";
import Imperium from "./pages/Imperium.tsx";
import Localvideo from "./pages/Localvideo.tsx";
import Video from "./pages/Video.tsx";
import Search from "./pages/Search.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Logout from "./components/sidebar/Logout.tsx";
import Profile from "./pages/Profile.tsx";
import Settings from "./pages/Settings.tsx";
import History from "./pages/History.tsx";
import Upload from "./pages/Upload.tsx";
import Editvideo from "./pages/Editvideo.tsx";
import Legiondetails from "./pages/Legiondetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Imperium /> },
      { path: "/home", element: <Home /> },
      { path: "/localvideo/:src/:title", element: <Localvideo /> },
      { path: "/video/:id", element: <Video /> },
      { path: "/search/:query", element: <Search /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/logout", element: <Logout /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/History", element: <History /> },
      { path: "/setting", element: <Settings /> },
      { path: "/upload", element: <Upload /> },
      { path: "/edit/:id", element: <Editvideo /> },
      { path: "/legion", element: <Legiondetails /> },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
