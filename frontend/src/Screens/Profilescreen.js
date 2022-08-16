import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";

const Profilescreen = () => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, navigate, user, dispatch]);

  const editHandler = useCallback((e) => {
    e.preventDefault();
    setDisabled(!disabled);
  });

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setMessage("Password do not match");
      } else {
        dispatch(updateUserProfile({ id: user._id, name, email, password }));
        setDisabled(!disabled);
      }
    },
    [confirmPassword, password, name, email, dispatch, user._id, disabled]
  );
  return (
    <Row>
      <Col className="container" md={3}>
        <h2>
          User Profile{" "}
          <span className="ml-auto">
            <i
              className="fas fa-pencil-alt"
              style={{ fontSize: "30px" }}
              onClick={() => setDisabled(!disabled)}
            >
              {" "}
              {/* <Button>E d i t</Button> */}
            </i>
          </span>
        </h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control
              readOnly={disabled}
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              readOnly={disabled}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group> */}

          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password </Form.Label>
            <Form.Control
              readOnly={disabled}
              type="password"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              readOnly={disabled}
              type="password"
              placeholder="Enter confirm password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="danger"
            className="mt-3 mx-2"
            onClick={editHandler}
          >
            Edit
          </Button>
          <Button
            type="submit"
            variant="success"
            disabled={disabled}
            className="mt-3"
            onClick={submitHandler}
          >
            Update
          </Button>
        </Form>
      </Col>
      {/* <Col md={9}>
        <h2>My Orders</h2>
      </Col> */}
    </Row>
  );
};

export default Profilescreen;
