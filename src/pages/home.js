import React from 'react';
import { Button } from '../component/button/button';
import './home.css';
import { RiBankLine } from "react-icons/ri";
import {MdDirectionsSubway} from "react-icons/md";
import Bounce from 'react-reveal/Bounce';
import Zoom from 'react-reveal/Zoom';
import BGM from 'react-awesome-snippets-bgm';

const Home = () => {
  const homePageIntro ={
    marginTop:'-15%',
    marginLeft:'5%',
    marginRight:'5%',
    borderRadius:'20px',
    marginBottom:'50px',
    /*color:'#2a9d8f'*/

};
  return (
    <div>
    <div className='hero-container'>
    {/* <BGM src='./summer-rain2.mp3' autoplay={true} loop={false}/> */}
    <video src='./video.mp4' autoPlay loop muted />
     {/*https://www.react-reveal.com/docs/props/ animation for heading */}
      <h1 className=''>
        <Bounce top  duration={2000} delay={200}>
          Welcome To Melbourne 
         </Bounce>
      </h1>
     
    
    <p>Find accessible facilities?</p>
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

  <div className='cards' style={homePageIntro}>
    
    <Zoom  top duration={600} delay={2200}>
      <h2 >Our team aims to help disabilities</h2></Zoom>
      <div className='container'>
      <Bounce  Left duration={3000} delay={2700}>
      <div> Especially those with mobility problems better access to Victoria's spectacular tourism attractions and improve their travel experience with the idea that everyone should have equally enjoyment towards Victoria's entertainment amenities and sceneries. <br/>
      
      
      
          Melbourne is a truly wonderful country, filled with ancient history and contemporary modern appeal. However, if you have a disability or other specific needs, finding the right information on accessibility can be a challenge.
Even though you might be adventurous at heart, it’s still a good idea to have some information before you embark on your journey to Melbourne. It’s a website dedicated to collecting everything there is to know about accessibility in Melbourne. 
      </div>
      </Bounce>
      
      </div>
      
  </div>


    <div className='label' >
         <h2>Visiting a city far from home can be overwhelming.  Get prepared with:</h2>
         <div className='container'>
         <div className='row' >

           <div class="col-sm-12 col-xs-3 col-lg-3" >
              <svg   xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-map" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98l4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
              </svg>
              <div className='introtitle'>Map</div>
            </div>
            <div class="col-sm-12 col-xs-3 col-lg-3" >
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
                  <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                </svg>
              <div className='introtitle'>Melbourne Checklist</div>
              </div>
              <div class="col-sm-12 col-xs-3 col-lg-3" >
              <RiBankLine style={{width:"60",height:"60"}} />
              <div className='introtitle'>Tourist Attractions </div>
             </div>
             <div class="col-sm-12 col-xs-3 col-lg-3" >
              <MdDirectionsSubway style={{width:"60",height:"60"}} />
              <div className='introtitle'>Public Transport </div>
           </div>
         </div>
         </div>
       <br/><br/><br/><br/><br/><br/>
      </div>
  </div>
  
  
  );
};

export default Home;
