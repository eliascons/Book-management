import Home from "./pages/home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login";



const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/login" index element={<Login />} />
        <Route path="/" index element={<Home />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
