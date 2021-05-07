import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  Toggle,
  SidebarNav,
  SidebarWrap,
} from "./headerElement";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { MenuItems } from "./menuitem";
import SubMenu from "./submenu";
import "./header.css";
import Slide from "react-reveal/Slide";

/**
 * Name: header
 * Function: displays header bar,navigation and sidebar. allow users to navigate to individual pages.
 * used in App.js file as layout
 */
const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <Nav>
        <NavLink
          to="#"
          disabled="disabled"
          style={{ color: "#555", marginLeft: "-300px" }}
        >
          <img
            className="LOGO"
            src="./Logo.png"
            width="200px"
            height="180px"
            alt="city"
          />
          <Slide left delay="200" duration="3000">
            <img
              className="LOGO"
              src="./3.png"
              width="100px"
              height="100px"
              alt="wheelchair"
              style={{ marginLeft: "-100px" }}
            />
          </Slide>
        </NavLink>
        <Bars onClick={showSidebar} />
        <SidebarNav sidebar={sidebar} onClick={showSidebar}>
          <SidebarWrap>
            {MenuItems.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
        <NavMenu>
          <NavLink to="/" style={{ color: "#555" }}>
            Home
          </NavLink>
          <NavLink to="/guide">Guide</NavLink>
          <NavLink to="/attraction/0">Attractions</NavLink>
          <NavLink to="/map">Accessible Melbourne</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Header;
