import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Bookmarks = ({ status }) => {
  if (status === true) {
    return <i className="bi bi-bag-heart-fill"></i>;
  } else {
    return <i className="bi bi-bag-heart"></i>;
  }
};

export default Bookmarks;
