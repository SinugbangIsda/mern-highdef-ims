import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Error404 from "./pages/error404";
import ForgotPassword from "./pages/forgotpassword";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./pages/dashboard";
import AuthGuard from "./components/layouts/auth/authguard";
import Users from "./pages/users";
import Transactions from "./pages/transactions";
import ThemeProvider from "./components/theme/provider";
import SelectedTransaction from "./components/transactions/selected";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./components/layouts/privateroute/adminroute";

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
        path: "transactions",
        children: [
          {
            path: "",
            element: <Transactions />
          },
          {
            path: ":transactionId",
            element:  <SelectedTransaction />
          },
        ]
      },
      {
        path: "users",
        element: <AdminRoute />,
        children: [
          {
            path: "",
            element: <Users />
          }
        ]
      }
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
        <Toaster 
          position = "bottom-center"
          gutter = { 8 }
          containerClassName = "select-none"
        />
      </ThemeProvider>
    </Provider>
  )
}

export default App;