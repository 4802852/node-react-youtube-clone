import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import "./NavBar.css";
import { Drawer, Button } from "antd";
import { FaCode } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";

function NavBar() {
  const [Visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <nav className="menu" style={{ position: "fixed", zIndex: 5, width: "100%", maxHeight: "75px" }}>
      <div className="menu__logo" style={{ textAlign: "center" }}>
        <a href="/">
          <FaCode style={{ fontSize: "2.5rem" }} />
        </a>
      </div>
      <div className="menu__container" style={{ display: "flex", flexDirection: "row" }}>
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_right">
          <RightMenu mode="horizontal" />
        </div>
        <Button className="menu__mobile-button" type="primary" onClick={showDrawer}>
          <AiOutlineMenu />
        </Button>
        <Drawer title="메뉴" placement="right" className="menu_drawer" closable={false} onClose={closeDrawer} visible={Visible}>
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
