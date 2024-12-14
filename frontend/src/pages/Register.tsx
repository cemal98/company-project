import React, { useState } from 'react';
import { Button, Form, Input, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setLoading(true);

    const { username, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    message.success('Registration successful!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);

    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card title="Register" style={{ width: 400 }}>
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate('/login')}>
              Already have an account? Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
