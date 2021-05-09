import React, { useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import data from "./subpages/assets/guidelist.json";
import "../pages/subpages/carparkPermit.css";
import banner from "./subpages/assets/banner.jpeg";
import ballon from "./subpages/assets/ballon.png";
import Tilt from "react-parallax-tilt";

//import router
import { Link } from "react-router-dom";

/**
 * Name:Guide
 * Function: display timeline to navigate to guide.  A page of this project to show informational guide to users
 * params: json file of listed of steps.
 */

const carpermitContainer = {
  marginTop: "-15%",
  marginLeft: "5%",
  marginRight: "5%",
  marginBottom: "5%",
  borderRadius: "20px",
  display: "absolute",
  justifyContent: "center",
  alignItems: "center",
  padding: "1%",
  boxShadow: "0 6px 20px rgba(56, 125, 255, 0.3)",
  backgroundColor: "rgb(234,229,222)",
};

const Guide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="banner">
        <Tilt
          tiltMaxAngleX={100}
          tiltMaxAngleY={20}
          perspective={800}
          scale={0.7}
          transitionSpeed={100000}
        >
          <img
            src={ballon}
            alt="ballon"
            style={{
              width: "7vw",
              zIndex: 1000,
              position: "absolute",
              top: "120px",
              left: "80%",
            }}
          />
        </Tilt>
        <Tilt
          tiltMaxAngleX={-200}
          tiltMaxAngleY={20}
          perspective={-800}
          scale={1.3}
          transitionSpeed={100000}
        >
          <img
            src={ballon}
            alt="ballon"
            style={{
              width: "4vw",
              zIndex: 1000,
              position: "absolute",
              top: "50px",
              left: "30%",
            }}
          />
        </Tilt>
        <img src={banner} alt="banner" style={{ width: "100vw", zIndex: -1 }} />
      </div>

      <div className="card" style={carpermitContainer}>
        <h1
          style={{
            color: "#9da993",
            padding: "20px",
            marginBottom: "20px",
            border: "solid white 5px",
            borderRadius: "200px",
          }}
        >
          Melbourne Travel Guide
        </h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--carpark-permit"
            iconStyle={{ background: "#9da993", color: "#fff", zIndex: "3" }}
            contentStyle={{
              background: "#9da993",
              color: "#fff",
              borderRadius: "200px",
            }}
            contentArrowStyle={{
              borderRight: "7px solid  rgb(33, 150, 243)",
              display: "none",
            }}
          >
            <h3 className="vertical-timeline-element-title">
              Start Planning Your Trip Now
            </h3>
          </VerticalTimelineElement>

          {data.map((data, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date={data.date}
              contentStyle={{
                background: "#E4B4B4",
                color: "#fff",
                borderRadius: "80px",
              }}
              contentArrowStyle={{ borderRight: "7px solid  #E4B4B4" }}
              iconStyle={{ background: "#E4B4B4", color: "#fff", zIndex: "3" }}
            >
              <Link to={data.link}>
                <h3
                  className="vertical-timeline-element-title"
                  style={{ color: "#fff", fontSize: "30px" }}
                >
                  {data.steps}
                </h3>
                <h4
                  className="vertical-timeline-element-subtitle"
                  style={{ color: "#fff", fontSize: "20px" }}
                >
                  {data.content}
                </h4>
              </Link>
            </VerticalTimelineElement>
          ))}

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "#E4B4B4",
              color: "#fff",
              borderRadius: "80px",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #E4B4B4" }}
            iconStyle={{ background: "#E4B4B4", color: "#fff", zIndex: "3" }}
          >
            <Link to="/checklist">
              <h3
                className="vertical-timeline-element-title"
                style={{ color: "#fff", fontSize: "30px" }}
              >
                Step6:
              </h3>
              <h4
                className="vertical-timeline-element-subtitle"
                style={{ color: "#fff", fontSize: "20px" }}
              >
                Download Your Checklist (PDF)
              </h4>
            </Link>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--carpark-permit"
            iconStyle={{ background: "#9da993", color: "#fff", zIndex: "3" }}
            contentStyle={{
              background: "#9da993",
              color: "#fff",
              borderRadius: "500px",
            }}
            contentArrowStyle={{
              borderRight: "7px solid  #9da993",
              display: "none",
            }}
          >
            <Link to="../../attraction">
              <h3
                className="vertical-timeline-element-title"
                style={{ color: "#fff" }}
              >
                Congrats! Let's Go For Travel
              </h3>
            </Link>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </>
  );
};

export default Guide;
