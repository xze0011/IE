import React from "react";
import "./attraction.css";
import Card from "../component/card/card";
import InstagramEmbed from "react-instagram-embed";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
const aboutContainer = {
  marginTop: "-3%",
  marginLeft: "5%",
  marginRight: "5%",
  marginBottom: "5%",
  borderRadius: "20px",
  display: "absolute",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "2%",
  boxShadow: "0 6px 20px rgba(56, 125, 255, 0.3)",
  backgroundColor: "rgb(234,229,222)",
  color: "#9da993",
  zIndex: 0,
};
/**
 * Name:about
 * Function: show about us information and link to our instagram page.
 * used in footer.js
 */
const About = () => {
  return (
    <>
      <img
        src="/aboutBanner.png"
        alt="banner"
        style={{ width: "100vw", zIndex: -3 }}
      />
      <div className="card" style={aboutContainer}>
        <Row>
          <Col sm={12} md={9} lg={9}>
            <div style={{ marginLeft: "20px" }}>
              <h1>Hodophiles</h1>
              <p style={{ fontSize: "1.3rem", fontWeight: "400" }}>
                Our team aims to help differently-abled people, especially those
                with mobility problems better access Victoria's spectacular
                tourism attractions and improve their travel experience with the
                idea that everyone should have equal enjoyment towards
                Victoria's entertainment amenities and sceneries.{" "}
              </p>
              <p>Our team members include:</p>
              <ListGroup>
                <ListGroup.Item variant="warning">
                  Front-end and back-end developer :{" "}
                  <a
                    href="https://www.linkedin.com/in/xiangming-zeng-732b521a4/"
                    target="_blank"
                  >
                    Xiangming Zeng
                  </a>
                </ListGroup.Item>
                <ListGroup.Item variant="warning">
                  Front-end developer :{" "}
                  <a
                    href="https://www.linkedin.com/in/%E6%99%AF%E7%92%87-%E7%8E%8B-3b4372168/"
                    target="_blank"
                  >
                    Jingxuan Wang
                  </a>
                </ListGroup.Item>
                <ListGroup.Item variant="warning">
                  Data science and business logic analyst :{" "}
                  <a
                    href="https://www.linkedin.com/in/xiaochen-jin-941a1b209/"
                    target="_blank"
                  >
                    Xiaochen Jin
                  </a>
                </ListGroup.Item>
                <ListGroup.Item variant="warning">
                  Business logic analyst :{" "}
                  <a
                    href="https://www.linkedin.com/in/shivam-behl-32a1a5114/"
                    target="_blank"
                  >
                    Shivam Behl
                  </a>
                </ListGroup.Item>
                <ListGroup.Item variant="warning">
                  Data science analyst :{" "}
                  <a
                    href="https://www.linkedin.com/in/khaled-alterish-20a8859a/"
                    target="_blank"
                  >
                    Khaled Alterish
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col sm={12} md={3} lg={3}>
            <InstagramEmbed
              url="https://www.instagram.com/p/CN0A82vhRRV/"
              clientAccessToken="3949937345066105|4103e8438eb2a44f432d86290331f604"
              maxWidth={320}
              hideCaption={false}
              containerTagName="ins"
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default About;
