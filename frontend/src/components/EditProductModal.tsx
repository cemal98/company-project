import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";
import { useGetCompanyList } from "../api/services/company.service";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
};

const EditProductModal: React.FC<Props> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const { data: companies, isLoading } = useGetCompanyList();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
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
          <InputNumber min={0} style={{ width: "100%" }} />
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
          label="Parent Company"
          rules={[{ required: true, message: "Please select a company" }]}
        >
          <Select
            showSearch
            loading={isLoading}
            placeholder="Select a company"
            filterOption={(input, option) =>
              option?.label &&
              typeof option.label === "string" &&
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            options={companies?.map((company: any) => ({
              value: company.id,
              label: company.name,
            }))}
          />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default EditProductModal;
