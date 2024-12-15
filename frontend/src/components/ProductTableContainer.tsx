import React, { useState } from "react";
import { Table, Input, Row, Col, Button, Modal } from "antd";
import { useGetProductTableData, useCreateProduct, useEditProduct, useDeleteProduct } from "../api/services/product.service";
import { useDebounce } from "use-debounce";
import EditProductModal from "./EditProductModal";
import CreateProductModal from "./CreateProductModal";
import { exportToExcel } from "../utils/exportToExcel"; // Excel export fonksiyonunu ekleyin.

const { Search } = Input;

const ProductTableContainer: React.FC = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [sorter, setSorter] = useState({
    field: "createdAt",
    order: "descend" as "descend" | "ascend",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const { data, isLoading, error } = useGetProductTableData({
    page: pagination.current,
    limit: pagination.pageSize,
    sortBy: sorter.field,
    order: sorter.order === "ascend" ? "ASC" : "DESC",
    search: debouncedSearchQuery,
  });

  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: editProduct } = useEditProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const handleTableChange = (newPagination: any, _: any, newSorter: any) => {
    setPagination(newPagination);
    setSorter({
      field: newSorter.field || "createdAt",
      order: newSorter.order || "ascend",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPagination({ ...pagination, current: 1 });
  };

  const handleCreate = async (values: any) => {
    try {
      await createProduct(values);
      setIsCreateModalVisible(false);
      setPagination({ ...pagination, current: 1 });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEdit = async (values: any) => {
    const { id, ...updatedProduct } = values;
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    try {
      await editProduct({ id, updatedProduct });
      setIsEditModalVisible(false);
      setPagination((prev) => ({ ...prev }));
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      onOk: async () => {
        try {
          await deleteProduct(id);
          setPagination((prev) => ({ ...prev }));
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      },
    });
  };

  const handleExport = () => {
    if (!data || !data.results || data.results.length === 0) return;

    const formattedData = data.results.map((product: any) => ({
      "Product Name": product.name,
      Category: product.category,
      Amount: product.amount,
      "Amount Unit": product.amountUnit,
      "Company ID": product.companyId,
      "Created At": new Date(product.createdAt).toLocaleDateString(),
    }));

    const fileName = `products_${new Date().toISOString().split("T")[0]}.xlsx`;
    exportToExcel(formattedData, fileName, "Products");
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      sortOrder: sorter.field === "amount" ? sorter.order : null,
    },
    {
      title: "Amount Unit",
      dataIndex: "amountUnit",
      key: "amountUnit",
    },
    {
      title: "Company ID",
      dataIndex: "companyId",
      key: "companyId",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      sortOrder: sorter.field === "createdAt" ? sorter.order : null,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setEditingProduct(record);
              setIsEditModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24} sm={12}>
          <Search
            placeholder="Search by Product Name or Category"
            onChange={handleSearchChange}
            allowClear
            value={searchQuery}
          />
        </Col>
        <Col xs={24} sm={6} style={{ textAlign: "right" }}>
          <Button
            type="default"
            onClick={handleExport}
            block
          >
            Export to Excel
          </Button>
        </Col>
        <Col xs={24} sm={6} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => setIsCreateModalVisible(true)}
            block
          >
            Create Product
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data?.results}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        rowKey={(record) => record.id}
        scroll={{ x: 800 }}
      />
      <CreateProductModal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onSubmit={handleCreate}
      />
      <EditProductModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSubmit={handleEdit}
        initialValues={editingProduct}
      />
    </>
  );
};

export default ProductTableContainer;
