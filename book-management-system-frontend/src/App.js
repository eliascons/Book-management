import DisplayBooks from "./pages/displayBooks";
import {createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider} from "react-router-dom";
import Login from "./pages/login";

// import Login from "./components/login";

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element = {<Root/>}>
        <Route path="/login" index element= {<Login/>}/>
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
localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY4NDcwOTMwMSwiZXhwIjoxNjg0NzEyOTAxfQ.sfer0ZpDx4FKdj5AQa9F1ScTY29wyhz5IAJc_kYIxV8");
const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        
      </div>

      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default App;
