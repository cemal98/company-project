import React from "react";
import { Button, Form, Input, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../api/services/auth.service";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: register, isLoading } = useRegister();

  const onFinish = (values: { username: string; email: string; password: string; confirmPassword: string }) => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    register(
      { username, email, password },
      {
        onSuccess: () => {
          message.success("Registration successful!");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        },
        onError: (error) => {
          message.error("Registration failed!");
          console.error(error);
        },
      }
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
      <Card title="Register" style={{ width: 400 }}>
        <Form name="register" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your password!" }]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate("/login")}>
              Already have an account? Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
