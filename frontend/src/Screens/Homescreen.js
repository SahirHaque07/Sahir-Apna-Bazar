import React, { useEffect, useState } from "react";
// import Products from "../products";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
// import { listProductDetails } from "../actions/productActions";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

// const Homescreen = () => {
//   const [Products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const { data } = await axios.get("/products");
//       setProducts(data);
//     };
//     fetchProducts();
//   }, []);

const Homescreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(listProductDetails());
  // }, [dispatch]);

  const addToCartHandler = (id) => {
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
        <Container>
          <Row className="container">
            {products.map((product) => (
              <Col
                key={product._id}
                className="mt-5 my-2 "
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Card style={{ width: "18rem", height: "40rem" }}>
                  <div>
                    <Link to={`/product/${product._id}`}>
                      <Card.Img
                        style={{
                          height: "15rem",
                          objectFit: "contain",
                        }}
                        variant="top"
                        src={product.image}
                        fluid
                      />
                    </Link>
                  </div>
                  <Card.Body>
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Title style={{ color: "black" }}>
                        {product.name.substring(0, 50)}
                      </Card.Title>
                    </Link>
                    <Card.Text>
                      <h5>₹ {product.price}</h5>
                    </Card.Text>
                    <Card.Text>
                      {product.description.substring(0, 100)}...
                    </Card.Text>
                    {/* <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text> */}
                    <Card.Text>
                      <Rating
                        value={product.rating}
                        text={`of ${product.numReviews} reviews`}
                      />
                      {/* {product.rating} of {product.numReviews} reviews */}
                    </Card.Text>
                    <Button
                      onClick={() => addToCartHandler(product._id)}
                      disabled={product.countInStock === 0}
                      variant="danger"
                      style={{ width: "100%" }}
                    >
                      {product.countInStock > 0
                        ? "Add To Cart"
                        : "out of stock"}
                    </Button>
                    <Button
                      onClick={checkoutHandler}
                      disabled={product.countInStock === 0}
                      variant="warning"
                      className="my-2"
                      style={{ width: "100%" }}
                    >
                      Buy Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Homescreen;
