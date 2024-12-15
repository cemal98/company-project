import React from "react";
import CompanyTableContainer from "../components/CompanyTableContainer";
import { Col, Row } from "antd";

const CompanyPage: React.FC = () => {
  return (
    <Row>
      <Col className="p-4">
        <span className="text-2xl font-bold">
          Company Table
        </span>
      </Col>
      <Col xs={24}>
        <CompanyTableContainer />
      </Col>
    </Row>
  );
};

export default CompanyPage;
