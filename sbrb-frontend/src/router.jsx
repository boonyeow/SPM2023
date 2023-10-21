import CreateJobListing from "./pages/CreateJobListing";
import EditJobListing from "./pages/EditRoleListing";
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
      <Route path="listings/create" element={<CreateJobListing />} />
      <Route path="listings/:id/edit" element={<EditJobListing />} />
      <Route path="listings/:id" element={<RoleView />} />
      <Route path="/listings/:id/applicants" element={<JobApplicants />} />
      <Route path="profile/:id" element={<Profile />} />
    </Route>
  )
);

export default router;
