import React, { useState } from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    Toggle,
    SidebarNav,
    SidebarWrap
  } from './headerElement';
import { Link } from 'react-router-dom';
import {Dropdown} from "react-bootstrap"
import {MenuItems} from './menuitem';
import SubMenu from './submenu';
import './header.css'

const Header = () => {
    
 const [sidebar, setSidebar] = useState(false);
 const showSidebar = () => setSidebar(!sidebar);
    return(
        <>
            <Nav>
                <NavLink to='/' style={{color:'#555'}}>
                    <img className='LOGO' src='./Logo.png' width='200px' height='180px' /> 
                </NavLink>
                    <Bars onClick={showSidebar} />         
                        <SidebarNav sidebar={sidebar}>
                            <SidebarWrap>
                                {MenuItems.map((item, index) => {
                                return <SubMenu item={item} key={index}/>;
                                })}
                            </SidebarWrap>
                        </SidebarNav>    
                    <NavMenu>
                    <NavLink to='/' style={{color:'#555'}} >
                        Home
                    </NavLink>
                    <NavLink to='/map'  >
                        Accessible Melbounre
                    </NavLink>
                    {/* <NavLink to='/carparkpermit' >
                    <Dropdown >
                        <Toggle >
                            Guide
                        </Toggle>
                        <Dropdown.Menu style={{background:'white'}}>
                            <NavLink to='/carparkpermit' >
                                CarparkPermit
                                </NavLink>
                            <NavLink to='/wheerchaircharge'>
                                WheerchairCharge
                            </NavLink>
                            <NavLink to='/melpolicy' >
                                MelPolicy
                            </NavLink>
                                </Dropdown.Menu>
                                </Dropdown>
                            </NavLink>
                    <NavLink to='/attraction' >
                        Attractions in Melbounre
                    </NavLink> */}
                </NavMenu>
            </Nav>
        </>
    )

}

export default Header;