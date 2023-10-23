import React from "react";
import Main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Grailed church-key farm-to-table, leggings hot chicken ascot blog
            skateboard tacos enamel pin wayfarers. Jianbing cupping meh, tofu af
            jawn chia tilde neutral milk hotel beard.
          </p>
          <Link className="btn btn-hero" to="/register">
            Login/Register
          </Link>
        </div>
        <img src={Main} alt="Job Hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
