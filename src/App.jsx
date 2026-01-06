import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MissingPerson from "./components/MissingPerson";
import FoundPerson from "./components/FoundPerson";
import UnidentifiedBodies from "./components/UnidentifiedBodies";
import Loader from "./components/ui/Loader";
import { Toaster } from "react-hot-toast";
import Details from "./components/Details";
import FoundPersonDetails from "./components/FoundPersonDetails";
import UnidentifiedDeadBodiesDetails from "./components/UnidentifiedDeadBodiesDetails";
import ComingSoon from "./components/ComingSoon";
import NavbarComp from "./components/Navbar";
import Home from "./components/Home";
import AddPerson from "./components/AddPerson";
import ReportBodies from "./components/ReportBodies";
import FoundReport from "./components/FoundReport";
import Login from "./components/Login";
import Register from "./components/Register";
import Authenticate from "./services/Authenticate";
import Profile from "./components/Profile";
import Disclaimer from "./components/Disclaimer";
import DataUsagePolicy from "./components/DataUsagePolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import UserContentPolicy from "./components/UserContentPolicy";
import DataDeletion from "./components/DataDeletion";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/missing-person",
      element: <MissingPerson />,
    },
    {
      path: "/found-person",
      element: <FoundPerson />,
    },
    {
      path: "/unidentified-bodies",
      element: <UnidentifiedBodies />,
    },
    {
      path: "/coming-soon",
      element: <ComingSoon />,
    },
    {
      path: "/found-person-details/:id",
      element: <FoundPersonDetails />,
    },
    {
      path: "/unidentified-bodies-details/:id",
      element: <UnidentifiedDeadBodiesDetails />,
    },
    {
      path: "/missing-person-details/:id",
      element: <Details />,
    },
    {
      path: "/coming-soon",
      element: <ComingSoon />,
    },
    {
      path: "/add-person",
      element: <AddPerson />,
    },
    {
      path: "/report-found-person",
      element: <FoundReport />,
    },
    {
      path: "/report-dead-bodies",
      element: <ReportBodies />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: (
        <Authenticate>
          <Profile />
        </Authenticate>
      ),
    },
    {
      path: "/disclaimer",
      element: <Disclaimer />,
    },
    {
      path: "/data-usage-policy",
      element: <DataUsagePolicy />,
    },
    {
      path: "/terms-and-conditions",
      element: <TermsAndConditions />,
    },
    {
      path: "/user-content-policy",
      element: <UserContentPolicy />,
    },
    {
      path: "/data-deletion",
      element: <DataDeletion />,
    },

    {
      path: "/*",
      element: <Loader />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
