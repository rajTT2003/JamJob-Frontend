import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import  {PostJob}  from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs";
import SalaryEstimate from "../Pages/SalaryEstimate";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../component/Login";
import SignUp from "../Pages/SignUp";
const apiUrl ='https://jamjob.onrender.com'
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {path: "/",  element: <Home/>},
        {path: "/About",  element: <About/>},
        {path: "/post", element: <PostJob/>},
        {path: "/my-jobs", element: <MyJobs/>},
        {path: "/salary", element: <SalaryEstimate/>},
        {path: "edit-job/:id", element: <UpdateJob/>,
        loader: ({params}) => fetch(`${apiUrl}/all-jobs/${params.id}`) }
       
      ]
    },
    {path: "/login", element: <Login/>},
    {path: "/sign-up", element: <SignUp/>}
  ]);

  export default router;