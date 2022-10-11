import "./styles.css";
import RandomShapes from "./randomShapes/index";
import Trail from "./trail/index";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from "./routes/root";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RandomShapes />
        <Trail />
      </>
    )
  },
  {
    path: "/game",
    element: <Root />
  }
]);

export default function App() {
  console.log("width 11");
  return <RouterProvider router={router} />;
}
