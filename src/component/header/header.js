import React from 'react';
import {
    Nav,
    NavLink,
    NavMenu
  } from './headerElement';
import { Link } from 'react-router-dom';


const Header = () => {
    return(
        <>
            <Nav>
                <NavLink to='/'>
                    <h3>WAYFARER</h3>
                </NavLink>
                <NavMenu>
                    <NavLink to='/' activeStyle>
                        Home
                    </NavLink>
                    <NavLink to='/map' activeStyle>
                        Accessible Melbounre
                    </NavLink>
                    <NavLink to='/guide' activeStyle>
                        Guide
                    </NavLink>
                    <NavLink to='/attraction' activeStyle>
                        Attractions in Melbounre
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )

}

export default Header;