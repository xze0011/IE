import React from "react";
import { Button } from "../component/button/button";
import "./home.css";
import { RiBankLine } from "react-icons/ri";
import { MdDirectionsSubway } from "react-icons/md";
import Bounce from "react-reveal/Bounce";
import Zoom from "react-reveal/Zoom";
import BGM from "react-awesome-snippets-bgm";

/**
 * Name:Home
 * Function: demonstrate our website purpose. and navigate to individual pages
 * used in App.js and header.js
 */
const Home = () => {
  const homePageIntro = {
    marginTop: "-15%",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: "20px",
    marginBottom: "50px",
    backgroundColor: "rgba(234,229,222,0.7)",
    color: "#37391E",
  };
  return (
    <div>
      <div className="hero-container">
        <video src="./video.mp4" autoPlay loop muted />
        <h1 className="">
          <Bounce top duration={2000} delay={200}>
            Welcome To Wayfarers
          </Bounce>
        </h1>

        <p>The Latest Accessible Travel Information about Melbourne</p>
        <p>
          Accessible Toilets, Accessible Carparks ,Beautiful Attractions and
          More
        </p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            destination="./map"
          >
            GET STARTED
          </Button>
        </div>
      </div>

      <div className="cards" style={homePageIntro}>
        <Zoom top duration={600} delay={2000}>
          <h2>
            Wayfarers aim to help people with motor impairment planing their
            Melbourne Trips
          </h2>
        </Zoom>

        <div className="container">
          <Bounce Left duration={3000} delay={2500}>
            <div>
              <li>
                {" "}
                <strong style={{ fontSize: "20px", color: "#2B7C85" }}>
                  Get
                </strong>{" "}
                information about accessible car parks and toilets
              </li>
              <li>
                <strong style={{ fontSize: "20px", color: "#2B7C85" }}>
                  Plan
                </strong>{" "}
                your journey before you arrive
              </li>
              <li>
                <strong style={{ fontSize: "20px", color: "#2B7C85" }}>
                  Enjoy
                </strong>{" "}
                Melbourne’s tourist attractions and sceneries and know which one
                is suitable for your special needs
              </li>
            </div>
          </Bounce>
        </div>
      </div>
    </div>
  );
};

export default Home;
