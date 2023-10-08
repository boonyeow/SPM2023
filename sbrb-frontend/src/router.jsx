import CreateJobListing from "./pages/CreateJobListing";
import Home from "./pages/Home";
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
      <Route index element={<Home />} />
      <Route path="create-job-listing" element={<CreateJobListing />} />
      <Route path="roles/:id" element={<RoleView />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

export default router;
