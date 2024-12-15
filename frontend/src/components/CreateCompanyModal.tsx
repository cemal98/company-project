import React from "react";
import { Modal, Form, Input } from "antd";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
};

const CreateCompanyModal: React.FC<Props> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Create Company"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Company Name"
          rules={[{ required: true, message: "Please enter the company name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="legalNumber"
          label="Legal Number"
          rules={[{ required: true, message: "Please enter the legal number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="incorporationCountry"
          label="Country"
          rules={[{ required: true, message: "Please enter the country" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
          rules={[
            { required: true, message: "Please enter the website URL" },
            { type: "url", message: "Please enter a valid URL" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCompanyModal;
