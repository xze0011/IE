import React from 'react';
import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container, Row, Col, NavDropdown, Image,Form,FormControl,Card } from 'react-bootstrap';
import logo from '../../teamlogo.png'

const Footer = ()=>{
    return(
        <div className='footer' style={{
            color:'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
             {/* <img src={logo} width="15%" height="10%"/> */}
             @ 2021 - Hodophiles
        </div>
    )
}

export default Footer;




