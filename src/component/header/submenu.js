import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/**
 * Name: submenu
 * Function: list of styled component of navigation drawer  with some hover effect
 * used in header component as child component with style.
 */
const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #535353;
    border-left: 4px solid black;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-right: 16px;
  color: white;
`;

const DropdownLink = styled(Link)`
  background: #939393;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 18px;
  &:hover {
    background: #535353;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          <SidebarLabel onClick={item.subNav && showSubnav}>
            {item.title}
          </SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              <SidebarLabel onClick={setSubnav(false)}>
                {item.title}
              </SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
