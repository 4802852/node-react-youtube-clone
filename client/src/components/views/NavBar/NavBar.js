import React from "react";
import LeftMenu from "./Sections/LeftMenu";
// import RightMenu from "./Sections/RightMenu";

function NavBar() {
  return (
    <div style={{ position: "fixed", width: "100%", zIndex: 1, display: "flex" }}>
      <div style={{ width: "100%" }}>
        <LeftMenu />
      </div>
    </div>
  );
}

export default NavBar;
