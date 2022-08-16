import React, { useEffect } from "react";
import Message from "../components/shared/Message";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
} from "react-bootstrap";
import { addToCart, removeCartItemAction } from "../actions/cartAction";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Cartscreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [id, dispatch, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeCartItemAction(id));
    console.log("Remove");
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row className="container">
      <Col md={8}>
        <h3
          className="text-center m-3"
          style={{
            borderBottom: "2px solid",
            padding: "5px",
          }}
        >
          Shopping Cart
        </h3>
        {cartItems.length === 0 ? (
          <Message variant="danger">
            Your cart is empty{" "}
            <Link
              style={{
                textDecoration: "none",
                border: "2px solid",
                padding: "3px",
                margin: "0.4rem",
              }}
              to="/"
            >
              {" "}
              &nbsp;&nbsp;Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    <strong>₹ {item.price}</strong>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash text-warning"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h4>
              <strong>
                ₹{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}{" "}
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                style={{ width: "100%" }}
                variant="danger"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cartscreen;

// return (
//   <>
//     <div>
//       <Row>
//         <Col md={8}>
//           <h3 className="container">Shopping cart</h3>
//           {cartItems.length === 0 ? (
//             <Message>
//               Your Cart Is Empty!
//               <Link to="/"> Go Back </Link>
//             </Message>
//           ) : (
//             <ListGroup variant="flush">
//               {cartItems.map((item) => (
//                 <ListGroupItem>
//                   <Row>
//                     <Col md={2}>
//                       <Image src={item.image} alt={item.name} fluid rounded />
//                     </Col>
//                     <Col md={3}>
//                       <Link to={`/product/${item.product}`}>{item.name}</Link>
//                     </Col>
//                     <Col md={2}>$ {item.price}</Col>
//                     <Col md={2}>
//                       <Form.Control
//                         as="select"
//                         value={item.qty}
//                         onChange={(e) =>
//                           dispatch(addToCart(item.product, Number(e.target.value)))
//                         }
//                       >
//                         {[...Array(item.countInStock).keys()].map((x) => (
//                           <option key={x + 1} value={x + 1}>
//                             {x + 1}
//                           </option>
//                         ))}
//                       </Form.Control>
//                       <Col>
//                         <Button
//                           type="button"
//                           variant="light"
//                           onClick={() => removeFromCartHandler(item.product)}
//                         >
//                           {" "}
//                           <i
//                             className="fa fa-trash"
//                             aria-hidden="true"
//                           ></i>{" "}
//                         </Button>
//                       </Col>
//                     </Col>
//                   </Row>
//                 </ListGroupItem>
//               ))}
//             </ListGroup>
//           )}
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroupItem>
//                 <h4>
//                   Subtotal (
//                   {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
//                 </h4>
//                 $
//                 {cartItems
//                   .reduce((acc, item) => acc + item.qty * item.price, 0)
//                   .toFixed(2)}
//                 <ListGroupItem></ListGroupItem>
//               </ListGroupItem>
//               <Button
//                 type="button"
//                 className="btn-block"
//                 disabled={cartItems.length === 0}
//                 onClick={checkOut}
//               >
//                 Proceed to Checkout
//               </Button>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   </>
// );
