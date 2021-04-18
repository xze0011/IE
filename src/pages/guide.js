import React from 'react';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import data from './subpages/assets/guidelist.json';

//import router
import { Link } from 'react-router-dom';



const Guide = () => {
  return (
          <VerticalTimeline>
            
        <VerticalTimelineElement
          className="vertical-timeline-element--carpark-permit"
          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          contentStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(16, 204, 82)' }}
          
        >
          <h3 className="vertical-timeline-element-title">Start Planning Your Trip Now</h3>
          
        </VerticalTimelineElement> 
          

                    {data.map((data)=>(
                    <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={data.date}
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    
                  ><Link to={data.link}>
                    <h3 className="vertical-timeline-element-title" style={{color:'#fff'}}>{data.steps}</h3>
                    <h4 className="vertical-timeline-element-subtitle" style={{color:'#fff'}}>{data.content}</h4>
                    <p style={{color:'#fff'}}>
                    {data.description}
                    </p></Link>
                  </VerticalTimelineElement> 


                  ))}

         
        
        
        
            <VerticalTimelineElement
              className="vertical-timeline-element--carpark-permit"
              iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
              contentStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(16, 204, 82)' }}
              
            >
              <Link to='../../attraction'>
              <h3 className="vertical-timeline-element-title" style={{color:'#fff'}}>Congrats! Lets Go For Travel</h3>
              </Link>
              
            </VerticalTimelineElement>
        
        
        
       
      </VerticalTimeline>
  );
};

export default Guide;


