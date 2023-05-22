import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card } from "antd";
import "../styles/login.css";
import LOGIN from "../api/users/mutations/loginMutation";
import UserForm from "../components/userForm";

const Login = () => {
  const [responseMessage, setResponseMessage] = useState(false);
  const [login, { loading, error }] = useMutation(LOGIN);

  const handleLogin = (values) => {
    const { username, password } = values;
    login({ variables: { username, password } })
      .then((response) => {
        // Handle successful login
        setResponseMessage(true);
        localStorage.setItem("token", response.data.login.token);
      })
      .catch((error) => {
        // Handle login error
        setResponseMessage(false);
      });
  };

  if (responseMessage) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <Card className="card" title="Login">
        <UserForm func={handleLogin} btn={"login"} />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </Card>
    </div>
  );
};

export default Login;
