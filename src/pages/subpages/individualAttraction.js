import { React, useState } from "react";
import "react-card-with-image/dist/index.css";
import { useLocation } from "react-router-dom";
import items from "./assets/attractionlist2.json";
import { Button } from "../../component/button/button";
import Accordion from "../../component/Accordion/Accordion";
import data from "./assets/mobaid.json";
import { Container, Col, Row } from "react-bootstrap";
import Map from "../map/map";
import { render } from "@testing-library/react";

const aboutContainer = {
  marginTop: "-10%",
  marginLeft: "5%",
  marginRight: "5%",
  marginBottom: "5%",
  borderRadius: "20px",
  display: "absolute",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "2%",
  paddingBottom: "5%",
  boxShadow: "0 6px 20px rgba(56, 125, 255, 0.3)",
  backgroundColor: "rgb(234,229,222)",
  color: "#9da993",
  zIndex: 0,
};

const IndiAttaction = () => {
  const location = useLocation();
  const name = location.pathname.substr(22);

  function compareName() {
    for (var i = 0; i < items.length; i++) {
      console.log("i", items[i]);
      if (name === items[i].name) {
        return items[i];
      }
    }
  }
  var item = compareName();
  return (
    <>
      <img
        src="/attractionBanner.png"
        alt="banner"
        style={{ width: "100vw", zIndex: -3 }}
      />
      <div className="card" style={aboutContainer}>
        <h1>{item.name}</h1>
        <div style={{ marginTop: "20px" }}>
          <Container>
            <Row>
              <Col>
                <iframe
                  src={item.panorama}
                  width="100%"
                  height="450px"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </Col>
              <Col>
                <Accordion content={item.content} />
              </Col>
            </Row>
          </Container>
        </div>

        <Button
          destination="../attraction"
          buttonSize="btn--medium"
          buttonColor="btn--red"
        >
          {" "}
          Back
        </Button>
        <Button
          destination="../map"
          buttonSize="btn--medium"
          buttonColor="btn--red"
        >
          {" "}
          Go to attraction
        </Button>
      </div>
    </>
  );
};

export default IndiAttaction;
