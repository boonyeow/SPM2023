import Home from "./pages/Home";
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
      <Route path="roles/:id" element={<RoleView />} />
    </Route>
  )
);

export default router;
