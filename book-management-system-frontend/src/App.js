import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import NavBar from "./components/nav";
import Add from "./pages/Add";
import Register from "./pages/Register";
import Update from "./pages/Update";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route path="/" index element={<Home />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/register" index element={<Register />} />
        <Route path="/add" index element={<Add />} />
        <Route path="/update/:bookId" index element={<Update />} />
      </Route>
    )
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
