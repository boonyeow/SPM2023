import CreateJobListing from "./pages/CreateJobListing";
import Home from "./pages/Home";
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


    </Route>
  )
);

export default router;
