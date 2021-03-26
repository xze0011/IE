import React, { useState } from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    Toggle
  } from './headerElement';
import { Link } from 'react-router-dom';
import {Dropdown} from "react-bootstrap"

const Header = () => {
    
 const [sidebar, setSidebar] = useState(false);
 const showSidebar = () => setSidebar(!sidebar);
    return(
        <>
            <Nav>
                <NavLink to='/' style={{color:'white'}}>
                    <h3>WAYFARER</h3>
                </NavLink>
                    <Bars />         
                <NavMenu>
                    <NavLink to='/'style={{color:'white'}} >
                        Home
                    </NavLink>
                    <NavLink to='/map' >
                        Accessible Melbounre
                    </NavLink>
                    <NavLink to='/carparkpermit' >
                    <Dropdown>
                        <Toggle >
                            Guide
                        </Toggle>
                        <Dropdown.Menu>
                            <NavLink to='/carparkpermit'  >
                                CarparkPermit
                                </NavLink>
                            <NavLink to='/wheerchaircharge'style={{color:'black'}}>
                                WheerchairCharge
                            </NavLink>
                            <NavLink to='/melpolicy' style={{color:'black'}} >
                                MelPolicy
                            </NavLink>
                                </Dropdown.Menu>
                                </Dropdown>
                            </NavLink>
                    <NavLink to='/attraction' >
                        Attractions in Melbounre
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )

}

export default Header;