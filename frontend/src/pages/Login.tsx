import React, { useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/services/auth.service";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);

    loginMutation.mutate(values, {
      onSuccess: () => {
        message.success("Login successful!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      },
      onError: (error: any) => {
        message.error(error.response?.data?.message || "Login failed");
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card title="Login" style={{ width: 400 }}>
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate("/register")}>
              Don't have an account? Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
