import { CarouselItem, Modal } from "react-bootstrap";
import { React, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "../button/button";
import data from "./mapguide.json";

export default function Help() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        buttonColor="btn--green"
        buttonSize="btn--medium"
      >
        Guidence
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h3 style={{ color: "#9da993" }}>Map User Guide</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {data.map((d, i) => (
              <CarouselItem>
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
