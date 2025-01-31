import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../pages/ErrorPage";
import VolunteerDetails from "../pages/VolunteerDetails";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/volunteerNeed/:id',
        element: <VolunteerDetails></VolunteerDetails>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/volunteerNeed/${params.id}`)
      },

    ]
  },
]);

export default router