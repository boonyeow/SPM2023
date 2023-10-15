import CreateJobListing from "./pages/CreateJobListing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import JobApplicants from "./pages/JobApplicants";
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
      <Route path="/listing" element={<Home />} />
      <Route path="/listing/create" element={<CreateJobListing />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="listing/:id" element={<RoleView />} />
      <Route path="/listing/:id/applicants" element={<JobApplicants />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Route>
  )
);

export default router;
