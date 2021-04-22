import React from 'react';
import Card from '../component/card/card'
import Coverflow from '../component/coverflow/coverflow'

 /**
 * Name:attraction
 * Function: slide show of melbourne attractions.A page of this project to show informational guide to users
 *  
 */
const Attraction = () => {
  return (
    <div className='coverflow'>
      <Coverflow />
    </div>
  );
};

export default Attraction;