import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AddProperty from "../pages/AddProperty/AddProperty";
import AllProperties from "../pages/AllProperties/AllProperties";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home/Home";
import MyProperties from "../pages/MyProperties/MyProperties";
import MyRatings from "../pages/MyRatings/MyRatings";
import NotFound from "../pages/NotFound/NotFound";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import UpdateProperty from "../pages/UpdateProperty/UpdateProperty";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "all-properties", Component: AllProperties },
      {
        path: "add-properties",
        element: (
          <ProtectedRoute>
            <AddProperty />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-properties",
        element: (
          <ProtectedRoute>
            <MyProperties />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-ratings",
        element: (
          <ProtectedRoute>
            <MyRatings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/property/:id",
        element: (
          <ProtectedRoute>
            <PropertyDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <ProtectedRoute>
            <UpdateProperty />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "login", Component: Login },
  { path: "register", Component: Register },
  { path: "*", Component: NotFound },
]);
