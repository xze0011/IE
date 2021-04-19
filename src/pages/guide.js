import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import data from './subpages/assets/guidelist.json';
 import banner from  './subpages/assets/banner.png';
 import '../pages/subpages/carparkPermit.css'

//import router
import { Link } from 'react-router-dom';

const carpermitContainer ={
  marginTop:'-5%', 
  marginLeft:'5%',
  marginRight:'5%',
  marginBottom:'5%',  
  borderRadius:'20px',
  display: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  padding:'1%',
  boxShadow:'0 6px 20px rgba(56, 125, 255, 0.3)',
  backgroundColor:'rgb(234,229,222)'
};

const Guide = () => {
  return (
    <>
    
      <div className='banner'>
        
        <img src={banner} alt='banner' style={{width:'100vw',zIndex:-1}}/>
        </div> 
        
        <div className='card'style={carpermitContainer}>
          
        <VerticalTimeline>
            
        <VerticalTimelineElement
          className="vertical-timeline-element--carpark-permit"
          iconStyle={{ background: '#9da993', color: '#fff' }}
          contentStyle={{ background: '#9da993', color: '#fff',borderRadius:'200px' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)',display:'none' }}

          
        >
          <h3 className="vertical-timeline-element-title">Start Planning Your Trip Now</h3>
          
        </VerticalTimelineElement> 
          

                    {data.map((data)=>(
                    <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={data.date}
                    contentStyle={{ background: '#E4B4B4', color: '#fff',borderRadius:'80px' }}
                    contentArrowStyle={{ borderRight: '7px solid  #E4B4B4' }}
                    iconStyle={{ background: '#E4B4B4', color: '#fff' }}
                    
                  ><Link to={data.link}>
                    <h3 className="vertical-timeline-element-title" style={{color:'#fff',fontSize:'30px' }}>{data.steps}</h3>
                    <h4 className="vertical-timeline-element-subtitle" style={{color:'#fff',fontSize:'20px' }}>{data.content}</h4>
                    </Link>
                  </VerticalTimelineElement> 


                  ))}

         
        
        
        
            <VerticalTimelineElement
              className="vertical-timeline-element--carpark-permit"
              iconStyle={{ background: '#9da993', color: '#fff' }}
              contentStyle={{ background: '#9da993', color: '#fff',borderRadius:'500px'}}
              contentArrowStyle={{ borderRight: '7px solid  #9da993',display:'none' }}
              
            >
              <Link to='../../attraction'>
              <h3 className="vertical-timeline-element-title" style={{color:'#fff'}}>Congrats! Lets Go For Travel</h3>
              </Link>
              
            </VerticalTimelineElement>
        
        
        
       
      </VerticalTimeline>
      </div>
          
        
      
      </>





        
  );
};

export default Guide;


