import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout/Layout"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import PlaceOrder from "./pages/PlaceOrder"
import NotFound from "./pages/NotFound"
import GlobalStateContext from "./context/AppContext"
import Verify from "./pages/verify"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "collection", element: <Collection /> },
        { path: "About", element: <About /> },
        { path: "Contact", element: <Contact /> },
        { path: "Product/:productId", element: <Product /> },
        { path: "Cart", element: <Cart /> },
        { path: "Login", element: <Login /> },
        { path: "Orders", element: <Orders /> },
        { path: "PlaceOrder", element: <PlaceOrder /> },
        { path: "verify", element: <Verify /> },
        { path: "*", element: <NotFound /> },
      ]

    }

  ])

  return (
    <GlobalStateContext>
      <RouterProvider router={router} />
    </GlobalStateContext>
  )
}

export default App
