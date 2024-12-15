import { Col, Row } from 'antd';
import ProductTableContainer from '../components/ProductTableContainer';

const Product = () => {
    return (
        <Row>
          <Col className="p-4">
            <span className="text-2xl font-bold">
              Product Table
            </span>
          </Col>
          <Col xs={24}>
            <ProductTableContainer />
          </Col>
        </Row>
      );
}

export default Product