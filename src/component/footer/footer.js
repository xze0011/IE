import React from 'react';
import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = ()=>{
    return(
        <div className='footer' style={{
            color:'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
             {/* <img src={logo} width="15%" height="10%"/> */}
             <p className='footerp' style={{margin:'10px'}}><a href='/about' style={{color:'#ffffff'}}>About Us</a></p>
             <p className='footerp' style={{margin:'10px'}}>@ 2021 - Hodophiles</p>
        </div>
    )
}

export default Footer;




