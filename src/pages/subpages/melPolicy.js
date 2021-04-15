import React from 'react';
import banner from  './assets/banner.jpeg';
import ballon from  './assets/ballon.png';
import Tilt from 'react-parallax-tilt';
import Accordion from '../../component/Accordion/Accordion';
import data from './assets/melbp.json';
import './carparkPermit.css'

const MelPolicy = () => {
  const carpermitContainer ={
    marginTop:'-5%',
    marginLeft:'5%',
    marginRight:'5%',
    marginBottom:'5%',  
    borderRadius:'20px',
    display: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding:'5%',
    boxShadow:'0 6px 20px rgba(56, 125, 255, 0.3)'
  };
  return (
    <div className='banner'>
      
      <Tilt
        tiltMaxAngleX={100}
        tiltMaxAngleY={20}
        perspective={800}
        scale={0.7}
        transitionSpeed={100000}>
        <img src={ballon} alt='ballon' style={{width:'8vw',zIndex:1000,position:'absolute',top:'150px',left:'80%'}}/>
        </Tilt>
        <Tilt
        tiltMaxAngleX={-200}
        tiltMaxAngleY={20}
        perspective={-800}
        scale={1.3}
        transitionSpeed={100000}>
        <img src={ballon} alt='ballon' style={{width:'4vw',zIndex:1000,position:'absolute',top:'50px',left:'30%'}}/>
        </Tilt>
      <img src={banner} alt='banner' style={{width:'100vw',zIndex:-1}}/>
      
      <div className='card'style={carpermitContainer}>
        <h1>Accessible parking permits</h1>
        <Accordion content={data}/>
      </div>
    </div>
  );
};

export default MelPolicy;