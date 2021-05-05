import { CarouselItem, Modal } from "react-bootstrap";
import { React, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "../button/button";
import data from "./mapguide.json";
import "./help.css";

/* const data = [{id:"1",name:"1st", img:"https://images.unsplash.com/photo-1514395462725-fb4566210144?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80", heading:"heidi","p":"p"},
{id:"2",name:"2nd", img:"https://images.unsplash.com/photo-1514395462725-fb4566210144?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80", heading:"wang","p":"p"},{id:"3",name:"jx", img:"https://images.unsplash.com/photo-1514395462725-fb4566210144?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80", heading:"jx","p":"p"},

] */

export default function Help() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

      <button class="btnn" onClick={handleShow}>
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
