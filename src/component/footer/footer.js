import React from 'react';
import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container, Row, Col, NavDropdown, Image,Form,FormControl,Card } from 'react-bootstrap';

const Footer = ()=>{
    return(
        <div className='footer'>
            <Row >
                <Col sm={6} md={3} lg={3}>
                    
                    {/* <ul>
                    <h5>Frequently Visited</h5>
                        <li>Envdata for Big Data</li>

                    </ul> */}
                </Col>
                <Col  sm={6} md={3} lg={3}>
                     
                    {/* <ul>
                    <h5>About Us</h5>
                        <li>Team MA1</li>      
                    </ul> */}
                </Col>
                <Col  sm={6} md={3} lg={3}>
                    <ul>
                         {/* <h5>Frequently Visited</h5>
                        <li>Mount Waverley VIC 3149</li> */}
                    </ul>
                </Col>
                <Col sm={6} md={3} lg={3}>
                    <ul>
                        {/* <h5>@ 2021 - Hodophiles</h5>
                        <li><a href="http://www.envdata.com.au/">
                                <i class="fa fa-angle-double-right">
                                </i> Big Data
                            </a></li> */}
                    </ul>
                </Col >
            </Row>
        </div>
    )
}

export default Footer;