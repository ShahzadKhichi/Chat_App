import { Toaster } from "react-hot-toast";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home.jsx";
import Login from "./pages/authentication/Login.jsx";
import { Signup } from "./pages/authentication/Signup.jsx";
import LoginProtectedRoute from "./components/common/LoginProtectedRoute.jsx";
import UnLoginProtected from "./components/common/UnLoginProtected.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginProtectedRoute>
        <Home />
      </LoginProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <UnLoginProtected>
        <Login />
      </UnLoginProtected>
    ),
  },
  {
    path: "/signup",
    element: (
      <UnLoginProtected>
        <Signup />
      </UnLoginProtected>
    ),
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
