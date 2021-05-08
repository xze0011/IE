import React, { useEffect, useRef, useReducer } from "react";
import "./coverflow.css";
import data from "../../pages/subpages/assets/attractionlist2.json";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

/*
Name: Coverflow
coverflow component that display gallary of attractions in Melbourne. 
it read json file with detailed attraction information with its img address. 
used in /pages/attraction page as gallary 
 */

const slides = data;

function useTilt(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    };
  }

  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    };
  }
};

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${slide.content[0].image}')`,
        }}
      />
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.content[0].image}')`,
          boxShadow: "0 6px 20px rgba(0,0,0, 0.5)",
        }}
      >
        <div className="slideContentInner">
          <Link to={`/individualAttraction/${slide.name}`}>
            <h2
              className="slideTitle"
              style={{ textAlign: "center" }}
              title="Click Here"
            >
              {slide.name}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Coverflow(props) {
  const location = useLocation();
  const name = location.pathname.substr(12);
  const initialState = {
    slideIndex: parseInt(name),
  };
  console.log("name", location);
  const [state, dispatch] = useReducer(slidesReducer, initialState);

  return (
    <div className="slides">
      <button onClick={() => dispatch({ type: "PREV" })}>
        <div style={{ color: "#fffff" }}>‹</div>
      </button>

      {[...slides, ...slides, ...slides].map((slide, i) => {
        let offset = slides.length + (state.slideIndex - i);
        return <Slide slide={slide} offset={offset} key={i} />;
      })}
      <button onClick={() => dispatch({ type: "NEXT" })}>
        <div style={{ color: "#fffff" }}>›</div>
      </button>
    </div>
  );
}
