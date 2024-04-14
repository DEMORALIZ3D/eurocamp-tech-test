import { Provider } from "react-redux"
import MainLayout from "./components/layout/mainLayout"
import { store } from "./store"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./containers/Home";
import ParcById from "./containers/ParcById";
import Parcs from "./containers/Parcs";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/parcs', element: <Parcs /> },
        { path: '/parcs/:id', element: <ParcById /> },

        { path: "*", element: <div>not found</div> },
      ]
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
