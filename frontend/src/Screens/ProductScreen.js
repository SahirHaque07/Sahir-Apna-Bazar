import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
// import products from "../products";
// import axios from "axios";

// const ProductScreen = () => {
//   const { id } = useParams();
//   // console.log(id);
//   // const product = products.find((p) => p._id === Number(id));
//   // console.log(product);

//   const [product, setProduct] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const { data } = await axios.get(`/products/${id}`);
//       setProduct(data);
//     };
//     fetchProducts();
//   }, [id]);

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const { id } = useParams();
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [id, dispatch]);

  const navigate = useNavigate();
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div style={{ width: "98%" }}>
          <Link to="/" className="btn btn-light m-3">
            Go back
          </Link>
          <Row>
            <Col md={6}>
              <Image className="m-2" src={product.image} thumbnail />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush" className="mt-3">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`of ${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <strong>
                    <h4>₹ {product.price}</h4>
                  </strong>
                </ListGroupItem>
                <ListGroupItem>
                  <h5>{product.description}</h5>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroupItem>
                <Row>
                  <Col>
                    <h5>Status :</h5>
                  </Col>
                  <Col>
                    <h5>
                      {product.countInStock > 0 ? "In Stock" : "out of stock"}
                    </h5>
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {" "}
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}{" "}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  className="mt-2"
                  onClick={addToCartHandler}
                  style={{ width: "100%" }}
                  variant="warning"
                  disabled={product.countInStock === 0}
                >
                  {product.countInStock > 0 ? "Add To Cart" : "out of stock"}
                </Button>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="mt-2"
                  onClick={checkoutHandler}
                  style={{ width: "100%" }}
                  variant="danger"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Buy Now
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
