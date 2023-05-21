import DisplayBooks from "./components/displayBooks";
import {createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider} from "react-router-dom";
import Login from "./components/login";

// import Login from "./components/login";

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element = {<Root/>}>
        <Route path="components/login" index element= {<Login/>}/>
        <Route path="/" index element= { <DisplayBooks />}/>
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
};

const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="./components/login">Login</Link>
        
      </div>

      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default App;
