import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Container className="footer">
        <Row>
          <Col className="text-center">
            copyright &copy; Sahir Online Shopping
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
