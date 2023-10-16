import CreateJobListing from "./pages/CreateJobListing";
import Home from "./pages/Home";
import JobApplicants from "./pages/JobApplicants";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RoleView from "./pages/RoleView";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="listings" element={<Home />} />
      <Route path="listing/create" element={<CreateJobListing />} />
      <Route path="listings/:id" element={<RoleView />} />
      <Route path="profile/:id" element={<Profile />} />
      <Route path="listings/:id/applications" element={<JobApplicants />} />
    </Route>
  )
);

export default router;
