import React from 'react';
import { Button } from '../component/button/button';
import './home.css';

const Home = () => {

  return (
    <div className='hero-container'>
    <video src='./video.mp4' autoPlay loop muted />
    <h1>Welcome to Melbounre</h1>
    <p>What are you waiting for?</p>
    <div className='hero-btns'>
      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
      >
        GET STARTED
      </Button>
    </div>
  </div>
  );
};

export default Home;
