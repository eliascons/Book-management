import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import "../styles/login.css";
import REGISTER from "../api/users/mutations/registerMutation";
import LOGIN from "../api/users/mutations/loginMutation";

import UserForm from "../components/userForm";

const Register = () => {
  const [registerUser, { loading, error }] = useMutation(REGISTER);
  const [login, { client }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleRegistration = async (values) => {
    const { username, password } = values;

    try {
      let result = await registerUser({ variables: { username, password } });
      console.log(result);

      const response = await login({ variables: { username, password } });
      localStorage.setItem("token", response.data.login.token);
      await client.refetchQueries({
        include: "active",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Card className="card" title="Register">
        <UserForm func={handleRegistration} btn={"Register"} />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </Card>
    </div>
  );
};

export default Register;
