import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Add from "./pages/Add"
import List from "./pages/List"
import Order from "./pages/Order"
import Layout from "./Layout/Layout"
import Login from "./components/Login"
import { useApplication } from "./context/adminContext"


function App() {
  const { token } = useApplication()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to={"/createProduct"} /> },
        { path: "CreateProduct", element: <Add /> },
        { path: "AllProducts", element: <List /> },
        { path: "Orders", element: <Order /> },
      ]
    },
    {
      path: "*",
      element: <h2>Not Found</h2>
    }
  ])

  return (
    token ? <RouterProvider router={router} /> : <Login />
  )
}

export default App
