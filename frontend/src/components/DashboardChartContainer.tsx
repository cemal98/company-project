import React, { useState } from "react";
import { Tabs, DatePicker, Row, Col, Spin, Card } from "antd";
import dayjs from "dayjs";
import { useGetDashboardChartData } from "../api/services/dashboard.service";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const DashboardChartContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [dates, setDates] = useState<[string, string]>([
    dayjs().startOf("year").format("YYYY-MM-DD"),
    dayjs().endOf("month").format("YYYY-MM-DD"),
  ]);

  const { data, isLoading, error } = useGetDashboardChartData({
    type: activeTab,
    startDate: dates[0],
    endDate: dates[1],
  });

  const handleDateChange = (values: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
    if (values) {
      setDates([values[0].format("YYYY-MM-DD"), values[1].format("YYYY-MM-DD")]);
    }
  };

  const chartColors = {
    company: "#3279a8",
    product: "#a8324b",
  };

  return (
    <Card style={{ height: 480 }} className="mt-4">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
            <TabPane tab="Companies" key="company" />
            <TabPane tab="Products" key="product" />
          </Tabs>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <RangePicker
            picker="month"
            onChange={handleDateChange}
            defaultValue={[
              dayjs(dates[0], "YYYY-MM-DD"),
              dayjs(dates[1], "YYYY-MM-DD"),
            ]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          {isLoading ? (
            <Spin size="large" />
          ) : error ? (
            <div>Error: {(error as Error).message}</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={5}
                  axisLine={false}
                />
                <YAxis />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || payload.length === 0) return null;
                    const date = dayjs(payload[0].payload.date).format(
                      "YYYY-MM-DD"
                    );

                    return (
                      <div className="bg-white p-3 rounded-md shadow-md">
                        <div>{date}</div>
                        {payload.map((entry, index) => (
                          <p
                            key={index}
                            style={{ color: chartColors[activeTab] }}
                          >
                            {`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Count: ${entry.value}`}
                          </p>
                        ))}
                      </div>
                    );
                  }}
                />
                <Legend
                  formatter={() =>
                    `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Count`
                  }
                />
                <Bar
                  dataKey="count"
                  fill={chartColors[activeTab]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default DashboardChartContainer;
