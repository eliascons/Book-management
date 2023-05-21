import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useState } from "react";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ variables: { username, password } })
      .then((response) => {
        // Handle successful login
        setResponseMessage(`${response.data.login.token}`);
        console.log("Login successful:", response.data.login);
      })
      .catch((error) => {
        // Handle login error
        console.error("Error during login:", error);
      });


  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {responseMessage}
    </div>
  );
};

export default Login;