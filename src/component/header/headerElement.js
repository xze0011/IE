import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import {Button,Dropdown} from "react-bootstrap"

export const Nav = styled.nav`
  background: #939393;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
  color:	white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

`;

export const Bars = styled(FaBars)`
  display: none;
  color:	white;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Toggle = styled(Dropdown.Toggle)`
  background:	#939393;
  border:none;
  color:	white;
  &:hover {
    background: #535353;
    cursor: pointer;
  }
  &.:active{
    background: #535353;
    cursor: pointer;
  }
`


export const SidebarNav = styled.nav`
  background: #939393;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

export const SidebarWrap = styled.div`
  width: 100%;
`;
