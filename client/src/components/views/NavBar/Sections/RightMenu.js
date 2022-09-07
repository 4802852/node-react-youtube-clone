import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Menu } from "antd";
import { USER_SERVER } from "../../../Config";

function RightMenu(props) {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isLoggedIn);
  const username = window.localStorage.getItem("userName");

  const onLogoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.data.success) {
        window.localStorage.clear();
        navigate("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };

  if (isLogged) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="username">{username}</Menu.Item>
        <Menu.Item key="logout">
          <span onClick={onLogoutHandler}>Logout</span>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="login">
          <a href="/login">Login</a>
        </Menu.Item>
        <Menu.Item key="register">
          <a href="/register">Register</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
