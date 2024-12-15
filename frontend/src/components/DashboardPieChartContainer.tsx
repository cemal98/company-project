import React from "react";
import { Row, Col, Card, Spin } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { useGetDashboardPieChartData } from "../api/services/dashboard.service";
import { useMediaQuery } from "@chakra-ui/media-query";

const DashboardPieChartContainer: React.FC = () => {
  const { data, isLoading, error } = useGetDashboardPieChartData();
  const [isMobile] = useMediaQuery(["(max-width: 740px)"], {
    ssr: true,
    fallback: false,
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div
          style={{
            background: "white",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>{name}</p>
          <p style={{ margin: 0 }}>Companies: {value}</p>
        </div>
      );
    }
    return null;
  };

  const totalValue = data?.reduce((acc: number, entry: any) => acc + entry.value, 0) || 1;

  return (
    <Card style={{ height: 480 }} className="mt-4 w-full">
      <Row>
        <Col span={24}>
          <span className="w-full flex justify-center text-xl font-semibold">Company Distribution</span>
        </Col>
      </Row>
      <Row className="w-full">
        <Col span={24}>
          {isLoading ? (
            <Spin size="large" />
          ) : error ? (
            <div>Error: {(error as Error).message}</div>
          ) : (
            <ResponsiveContainer style={{ position: "relative", zIndex: 1 }} width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={isMobile ? 90 : 120}
                  fill="#8884d8"
                  dataKey="value"                >
                  {data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="inside"
                    formatter={(value: number) => `${((value / totalValue) * 100).toFixed(1)}%`}
                    fontSize={12}
                  />
                </Pie>
                <Tooltip content={renderCustomTooltip} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default DashboardPieChartContainer;
