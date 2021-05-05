import React from "react";
import { Button } from "../component/button/button";
import "./home.css";
import { RiBankLine } from "react-icons/ri";
import { MdDirectionsSubway } from "react-icons/md";
import Bounce from "react-reveal/Bounce";
import Zoom from "react-reveal/Zoom";
import BGM from "react-awesome-snippets-bgm";
import Card from "../component/card/card";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import data from "./home.json";

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
        {/* <BGM src='./summer-rain2.mp3' autoplay={true} loop={false}/> */}
        <video src="./video.mp4" autoPlay loop muted />
        {/*https://www.react-reveal.com/docs/props/ animation for heading */}
        <h1 className="">
          <Bounce top duration={2000} delay={200}>
            Welcome To Wayfarers
          </Bounce>
        </h1>

        <p>The Latest Accessible Travel Information about Melbourne</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            destination="./guide"
          >
            GET STARTED
          </Button>
        </div>
      </div>

      <div className="cards" style={homePageIntro}>
        <Zoom top duration={600} delay={2200}>
          <h2>
            Wayfarers aim to help people with motor impairment planing their
            Melbourne Trips
          </h2>
        </Zoom>

        <div className="container">
          <Bounce Left duration={3000} delay={2700}>
            <div>
              <p>
                In the Melbourne metropolitan area, motor impairedpeople from
                overseas or other parts ofAustralia face difficulties due to
                inadequate facilitiesand lack of guidelines in 2020.
              </p>
            </div>
          </Bounce>

          {data.map((data, i) => (
            <Flippy
              flipOnHover={false} // default false
              flipOnClick={true} // default false
              flipDirection="horizontal" // horizontal or vertical
              style={{
                width: "30%",
                height: "100%",
                display: "inline-block",
                marginLeft: "25px",
                marginTop: "20px",
                borderRadius: "50px",
              }}
            >
              <FrontSide
                style={{
                  backgroundColor: "rgba(157, 169, 147,0.7)",
                }}
              >
                <figure className="cards__item__pic-wrap">
                  <img
                    className="cards__item__img"
                    alt="Travel"
                    src={data.image}
                    width="25%"
                  />
                </figure>

                <div className="cards__item__info">
                  <h5
                    className="cards__item__text"
                    style={{
                      color: "#ffffff",
                      fontSize: "25px",
                      textAlign: "center",
                    }}
                  >
                    {data.title}
                  </h5>
                </div>
              </FrontSide>
              <BackSide style={{ backgroundColor: "rgba(228, 180, 180,0.7)" }}>
                <p style={{ color: "#ffffff" }}> {data.description}</p>
                <div style={{ position: "absolute", bottom: "20px" }}>
                  <Button
                    destination={data.path}
                    buttonColor="btn--green"
                    buttonSize="btn--medium"
                  >
                    {data.button}
                  </Button>
                </div>
              </BackSide>
            </Flippy>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
