import React from 'react';
import Card from '../component/card/card';
import InstagramEmbed from 'react-instagram-embed';
import {Container,Row,Col} from 'react-bootstrap';


const aboutContainer ={
  marginTop:'-3%',
  marginLeft:'5%',
  marginRight:'5%',
  marginBottom:'5%',  
  borderRadius:'20px',
  display: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop:'2%',
  boxShadow:'0 6px 20px rgba(56, 125, 255, 0.3)',
  backgroundColor:'rgb(234,229,222)',
  color:'#9da993',
  zIndex:0
};

const About = () => {
  return (
    <>
      <img src='/aboutBanner.png' alt='banner' style={{width:'100vw',zIndex:-3}}/>
      <div className='card'style={aboutContainer}>

      <Row >

        <Col sm={12} md={8}>
          <div style={{marginLeft:'20px'}}>
          <h1 style={{    color:'#76836B'
}}>Hodophiles</h1>
            <p style={{fontSize:'1rem',fontWeight:'400'}}>Our team aims to help disabilities, especially those with mobility problems better access to Victoria's spectacular tourism attractions and improve their travel experience with the idea that everyone should have equally enjoyment towards Victoria's entertainment amenities and sceneries. </p>
            <img src="/logo2.png" alt='hodophiles' style={{width:'20vw',display:'none',marginLeft:'25%',marginTop:'5%',marginBottom:'5%'}}/>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <InstagramEmbed
            url='https://www.instagram.com/p/CN0A82vhRRV/'
            clientAccessToken='3949937345066105|4103e8438eb2a44f432d86290331f604'
            maxWidth={320}
            hideCaption={false}
            containerTagName='ins'
              />
        </Col>

      </Row>
      </div>
      
    </>
    
       
  
  );
};

export default About;