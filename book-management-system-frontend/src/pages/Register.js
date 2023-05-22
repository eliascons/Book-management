import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card } from "antd";
import "../styles/login.css";
import REGISTER from "../api/users/mutations/registerMutation";

import UserForm from "../components/userForm";

const Register = () => {
  const [registerUser, { loading, error }] = useMutation(REGISTER);
  const [success, setSuccess] = useState(false);

  const handleRegistration = (values) => {
    const { username, password } = values;

    registerUser({ variables: { username, password } })
      .then((result) => {
        console.log(result);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (success) {
    return <Navigate to="/" />;
  }

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
