import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <Spinner
        animation="border"
        role="status"
        style={{
          height: "100px",
          width: "100px",
          margin: "auto",
          marginTop: "100px",
          display: "block",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default Loader;
