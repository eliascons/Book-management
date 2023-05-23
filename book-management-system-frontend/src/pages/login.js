import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import "../styles/login.css";
import LOGIN from "../api/users/mutations/loginMutation";
import UserForm from "../components/userForm";

const Login = () => {
  const [login, { client, loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { username, password } = values;

    try {
      const response = await login({ variables: { username, password } });
      localStorage.setItem("token", response.data.login.token);
      await client.refetchQueries({
        include: "active",
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
