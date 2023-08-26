import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Error404 from "./pages/error404";
import ForgotPassword from "./pages/forgotpassword";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./pages/dashboard";
import AuthGuard from "./components/auth";
import Users from "./pages/users";
import ThemeProvider from "./components/theme/provider";
import { ToastContainer } from "react-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "/users",
        element: <Users />
      },
    ]
  },
  {
    path: "/*",
    element: <Error404 />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />
  }
]);

const App = () => {
  return (
    <Provider store = { store }>
      <ThemeProvider>
        <RouterProvider router = { router } />
        <ToastContainer delay = { 5000 }/>
      </ThemeProvider>
    </Provider>
  )
}

export default App;