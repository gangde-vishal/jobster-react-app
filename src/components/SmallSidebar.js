import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import { toggleSidebar } from "../features/user/userSlice";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.user);

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" type="button" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
