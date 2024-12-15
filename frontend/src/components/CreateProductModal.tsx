import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { useGetCompanyList } from "../api/services/company.service";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
};

const CreateProductModal: React.FC<Props> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const { data: companies, isLoading } = useGetCompanyList();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    if (!visible) {
      form.resetFields(); // Modal kapandığında formu sıfırla
    }
  }, [visible]);

  return (
    <Modal
      title="Create Product"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please enter the category" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please enter the amount" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="amountUnit"
          label="Amount Unit"
          rules={[{ required: true, message: "Please enter the amount unit" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="companyId"
          label="Company"
          rules={[{ required: true, message: "Please select a company" }]}
        >
        <Select
          showSearch
          loading={isLoading}
          placeholder="Select a company"
          filterOption={(input, option) =>
            (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
          }
          options={companies?.map((company: any) => ({
            label: company.name,
            value: company.id,
          }))}
        />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
