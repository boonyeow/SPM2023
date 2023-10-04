import Home from "./pages/Home";
import Profile from "./pages/Profile";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

export default router;
