import React, { useState } from "react";
import { Tabs, Table, Spin, Card } from "antd";
import { useGetDashboardTableData } from "../api/services/dashboard.service";

const { TabPane } = Tabs;

const TableContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState("company");

  const { data, isLoading, error } = useGetDashboardTableData({
    type: activeTab,
  });

  const columns =
    activeTab === "company"
      ? [
          { title: "Company Name", dataIndex: "name", key: "name" },
          { title: "Legal Number", dataIndex: "legalNumber", key: "legalNumber" },
          { title: "Incorporation Country", dataIndex: "incorporationCountry", key: "incorporationCountry" },
          { title: "Website", dataIndex: "website", key: "website" },
        ]
      : [
          { title: "Product Name", dataIndex: "name", key: "name" },
          { title: "Category", dataIndex: "category", key: "category" },
          { title: "Amount", dataIndex: "amount", key: "amount" },
          { title: "Amount Unit", dataIndex: "amountUnit", key: "amountUnit" },
          { title: "Company ID", dataIndex: "companyId", key: "companyId" },
        ];

  return (
    <Card className="w-full">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        tabBarStyle={{ display: "flex", justifyContent: "center" }}
      >
        <TabPane tab="Companies" key="company">
          {isLoading ? (
            <Spin size="large" />
          ) : error ? (
            <div>Error: {(error as Error).message}</div>
          ) : (
            <Table
              dataSource={data}
              columns={columns}
              rowKey="id"
              scroll={{ x: 800 }}
              pagination={{ pageSize: 10 }}
            />
          )}
        </TabPane>
        <TabPane tab="Products" key="product">
          {isLoading ? (
            <Spin size="large" />
          ) : error ? (
            <div>Error: {(error as Error).message}</div>
          ) : (
            <Table
              dataSource={data}
              columns={columns}
              rowKey="id"
              scroll={{ x: 800 }}
              pagination={{ pageSize: 10 }}
            />
          )}
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default TableContainer;
