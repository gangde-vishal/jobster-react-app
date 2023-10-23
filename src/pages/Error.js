import React from "react";
import NotFound from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={NotFound} alt="Page Not Found 404 " />
        <h3>ohh! page not found</h3>
        <p>We can't seem to find the page yor are looking for</p>
        <Link to="/">Back to home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
