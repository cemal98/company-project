import React from "react";
import { Row, Col, Spin } from "antd";
import { useGetDashboardData } from "../api/services/dashboard.service";
import DashboardCard from "../components/DashboardCard";
import DashboardChartContainer from "../components/DashboardChartContainer";
import DashboardTableContainer from "../components/DashboardTableContainer";
import DashboardPieChartContainer from "../components/DashboardPieChartContainer";

const Home: React.FC = () => {
  const { data, isLoading, error } = useGetDashboardData();

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <>
      <Row className="pb-4" gutter={[16, 16]}>
        {/* 1. Kart: Total Companies & Most Product Company */}
        <Col
          xs={24} // 1 kart genişliğinde (mobil)
          sm={12} // 2 kart genişliğinde (tablet)
          lg={8}  // 3 kart genişliğinde (masaüstü)
        >
          <DashboardCard
            title="Company Overview"
            totalValue={data.totalCompanies}
            values={[
              {
                subIcon: <span role="img" aria-label="company">🏢</span>,
                subValue: data.mostProductCompany?.productCount,
              },
            ]}
            subtitle={`Most Productive: ${data.mostProductCompany?.name || "N/A"}`}
            bgColor="#3279a8"
            url="/companies"
          />
        </Col>

        {/* 2. Kart: Total Products & Most Stocked Product */}
        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <DashboardCard
            title="Product Overview"
            totalValue={data.totalProducts}
            values={[
              {
                subIcon: <span role="img" aria-label="product">📦</span>,
                subValue: data.mostStockProduct?.amount,
              },
            ]}
            subtitle={`Most Stocked: ${data.mostStockProduct?.name || "N/A"}`}
            bgColor="#325aa8"
            url="/products"
          />
        </Col>

        {/* 3. Kart: Last 30 Days Overview */}
        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <DashboardCard
            title="Last 30 Days Activity"
            totalValue={data.companiesInLast30Days + data.productsInLast30Days}
            values={[
              {
                subIcon: <span role="img" aria-label="companies">🏢</span>,
                subValue: data.companiesInLast30Days,
              },
              {
                subIcon: <span role="img" aria-label="products">📦</span>,
                subValue: data.productsInLast30Days,
              },
            ]}
            subtitle="New Companies & Products"
            bgColor="#4432a8"
          />
        </Col>
      </Row>

      <Row gutter={[16,16]} className="pb-10">
        <Col lg={12} md={24} sm={24}>
          <DashboardChartContainer />
        </Col>
        <Col className="w-full" lg={12} md={24} sm={24}>
          <DashboardPieChartContainer />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <DashboardTableContainer />
        </Col>
      </Row>
    </>
  );
};

export default Home;
