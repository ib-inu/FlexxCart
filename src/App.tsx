import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/home/Home";
import { ReactQueryDevtools } from 'react-query/devtools'
import Cart from "./pages/cart/Cart";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Details from "./pages/Details/Details";
import Authentication from "./Authentication/Authentication";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import { Provider, useSelector } from "react-redux";
import { Rootstate, store } from "./store";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    }
  }
})

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const user = useSelector((state: Rootstate) => state.auth.user); // Access the user from the Redux state

  return user ? element : <Navigate to="/login" />; // Redirect to login if not authenticated
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        index: true,
        element: <Navigate to="/login" />,
      },
    ],
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />, // Protect the Home route
  },
  {
    path: "/cart",
    element: <ProtectedRoute element={<Cart />} />, // Protect the Cart route
  },
  {
    path: "details/:id",
    element: <ProtectedRoute element={<Details />} />, // Protect the Details route
  },
]);




export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  )
}
