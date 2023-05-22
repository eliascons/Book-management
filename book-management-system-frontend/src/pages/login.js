import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import LOGIN from "../api/users/mutations/loginMutation";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

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

  // Define styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  };

  const formContainerStyle = {
    textAlign: "center",
    padding: "20px",
    border: "1px solid silver",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const formStyle = {
    width: "300px",
  };

  const iconStyle = {
    marginRight: "2px",
  };

  const buttonStyle = {
    width: "100%",
    height: "40px", // Adjust the height as desired
    fontSize: "16px", // Adjust the font size as desired
  };

  const inputStyle = {
    height: "40px", // Adjust the height as desired
    fontSize: "16px", // Adjust the font size as desired
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <Form
          name="normal_login"
          style={formStyle}
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={iconStyle} />}
              placeholder="Username"
              style={inputStyle}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined style={iconStyle} />}
              type="password"
              placeholder="Password"
              style={inputStyle}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={buttonStyle}>
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        </Form>
      </div>
    </div>
  );
};

export default Login;
