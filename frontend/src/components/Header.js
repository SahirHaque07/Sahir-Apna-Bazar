import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { searchListProducts } from "../actions/productActions";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const logoutHandler = () => {
    dispatch(logout());
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchListProducts(search));
  };

  // const productList = () => {
  //   dispatch(listProducts);
  // };
  return (
    <>
      <Navbar className="navbar navbar-dark bg-primary" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Ekart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa-solid fa-cart-arrow-down"></i> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/myorders">
                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa-solid fa-user"></i> Log In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => (e.key === "Enter" ? handleSearch(e) : null)}
              />
              <Button onClick={handleSearch} variant="success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
