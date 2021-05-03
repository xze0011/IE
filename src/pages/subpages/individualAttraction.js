
import React from 'react';
import { CardView } from 'react-card-with-image'
import 'react-card-with-image/dist/index.css'
import { useLocation } from 'react-router-dom'
import items from './assets/attractionlist2.json'
import {Button} from '../../component/button/button';
import creatHistory from 'history/createBrowserHistory' 
const aboutContainer ={
    marginTop:'-10%',
    marginLeft:'5%',
    marginRight:'5%',
    marginBottom:'5%',  
    borderRadius:'20px',
    display: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:'2%',
    paddingBottom:'5%',
    boxShadow:'0 6px 20px rgba(56, 125, 255, 0.3)',
    backgroundColor:'rgb(234,229,222)',
    color:'#9da993',
    zIndex:0
  };
  
  const IndiAttaction = () => {
    
        const history = creatHistory();
        const location = useLocation();
        const name = location.pathname.substr(22);
        
        /* var item = function(){
            for (var i=0;i<items.length;i++)
            { 
                console.log('i',items[i]);
                if (name===items[i].name){
                    return items[i];
                }
                else return null;
            }
        } */
        function compareName(){
            for (var i=0;i<items.length;i++)
            { 
                console.log('i',items[i]);
                if (name===items[i].name){
                    return items[i];
                }
               
            }
        }
        var item = compareName();
        console.log('item',item);
        console.log('items',items);
    return (
      <>
        <img src='/attractionBanner.png' alt='banner' style={{width:'100vw',zIndex:-3}}/>
        <div className='card'style={aboutContainer}>
            <h1>{item.name}</h1>
                    <CardView
                    items={item.content}
                    activeColor='#000'
                    imageHeight='500px'
                    imageWidth='400px'
                    />
          <iframe src={item.panorama} width="600" height="450" allowfullscreen="" loading="lazy"></iframe>   
          <Button destination = '../attraction' buttonSize='btn--medium' buttonColor='btn--red'> Back</Button>
        </div>

      </>
      
         
    
    );
  };
  
  export default IndiAttaction;