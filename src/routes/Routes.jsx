import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../pages/ErrorPage";
import VolunteerDetails from "../pages/VolunteerDetails";
import PrivateRoute from "./PrivateRoute";
import AddPost from "../pages/AddPost";
import ManageMyPosts from "../pages/ManageMyPosts";
import UpdateVolunteersPost from "../pages/UpdateVolunteersPost";
import NeedVolunteers from "../pages/NeedVolunteers/NeedVolunteers";
import VolunteerRequests from "../pages/VolunteerRequests";

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
        path: '/volunteers',
        element: <NeedVolunteers></NeedVolunteers>
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
        element: <PrivateRoute><VolunteerDetails></VolunteerDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/volunteerNeed/${params.id}`)
      },
      {
        path: '/add-post',
        element: <PrivateRoute><AddPost></AddPost></PrivateRoute>,
      },
      {
        path: '/my-post',
        element: <PrivateRoute><ManageMyPosts></ManageMyPosts></PrivateRoute>,
      },
      {
        path: '/volunteer-requests',
        element: <PrivateRoute><VolunteerRequests></VolunteerRequests></PrivateRoute>,
      },
      {
        path: '/update-post/:id',
        element: <PrivateRoute><UpdateVolunteersPost></UpdateVolunteersPost></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/volunteerNeed/${params.id}`),
      },
    ]
  },
]);

export default router