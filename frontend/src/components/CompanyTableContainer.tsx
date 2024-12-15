import React, { useState } from "react";
import { Table, Input, Row, Col, Button, Modal } from "antd";
import { useCreateCompany, useDeleteCompany, useEditCompany, useGetCompanyTableData } from "../api/services/company.service";
import { useDebounce } from "use-debounce";
import EditCompanyModal from "./EditCompanyModal";
import CreateCompanyModal from "./CreateCompanyModal";

const { Search } = Input;

const CompanyTableContainer: React.FC = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [sorter, setSorter] = useState({
    field: "createdAt",
    order: "descend" as "descend" | "ascend",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);

  const { data, isLoading, error } = useGetCompanyTableData({
    page: pagination.current,
    limit: pagination.pageSize,
    sortBy: sorter.field,
    order: sorter.order === "ascend" ? "ASC" : "DESC",
    search: debouncedSearchQuery,
  });

  const { mutateAsync: createCompany } = useCreateCompany();
  const { mutateAsync: deleteCompany } = useDeleteCompany();
  const { mutateAsync: editCompany } = useEditCompany();

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
      await createCompany(values);
      setIsCreateModalVisible(false);
      setPagination({ ...pagination, current: 1 });
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const handleEdit = async (values: any) => {
    const { id, ...updatedCompany } = values;

    if (!id) {
      console.error("ID is undefined");
      return;
    }

    try {
      await editCompany({ id, updatedCompany });
      setIsEditModalVisible(false);
      setPagination((prev) => ({ ...prev }));
    } catch (error) {
      console.error("Error editing company:", error);
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this company?",
      onOk: async () => {
        try {
          await deleteCompany(id);
          setPagination((prev) => ({ ...prev }));
        } catch (error) {
          console.error("Error deleting company:", error);
        }
      },
    });
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Legal Number",
      dataIndex: "legalNumber",
      key: "legalNumber",
    },
    {
      title: "Country",
      dataIndex: "incorporationCountry",
      key: "incorporationCountry",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
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
              setEditingCompany(record);
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
        <Col xs={24} sm={18}>
          <Search
            placeholder="Search by Name, Legal Number, Country, or Website"
            onChange={handleSearchChange}
            allowClear
            value={searchQuery}
          />
        </Col>
        <Col xs={24} sm={6} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => setIsCreateModalVisible(true)}
            block
          >
            Create Company
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
      <CreateCompanyModal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        onSubmit={handleCreate}
      />
      <EditCompanyModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSubmit={handleEdit}
        initialValues={editingCompany}
      />
    </>
  );
};

export default CompanyTableContainer;
