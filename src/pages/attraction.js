import React from "react";
import Coverflow from "../component/coverflow/coverflow";

/**
 * Name:attraction
 * Function: slide show of melbourne attractions.A page of this project to show informational guide to users
 *
 */
const Attraction = ({ id = 0 }) => {
  return (
    <div className="coverflow">
      <Coverflow id={id} />
    </div>
  );
};

export default Attraction;
