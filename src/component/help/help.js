import { CarouselItem, Modal } from "react-bootstrap";
import { React, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "../button/button";
import data from "./mapguide.json";
import "./help.css";

export default function Help() {
  const [show, setShow] = useState(window.showGUide);
  const handleClose = () => { window.showGUide = false; setShow(false); }
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btnn" onClick={handleShow}>
        {" "}
        <img
          src="./guide.png"
          alt="guideMark"
          style={{ width: "40px", height: "40px" }}
        />
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h3 style={{ color: "#9da993" }}>Map User Guide</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {data.map((d, index) => (
              <CarouselItem key={index}>
                <img className="d-block w-100" src={d.img} alt={d.name} />
                <Carousel.Caption>
                  <h3>{d.heading}</h3>
                  <p>{d.p}</p>
                </Carousel.Caption>
              </CarouselItem>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} buttonColor="btn--green">
            Skip Guide
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
