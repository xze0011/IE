import React, { useState } from "react";
import AutoLink from "../AutoLink/AutoLink";

/**
 * Name: Accordion
 * Accordion accept json data as parameter and  display information inside content inside an Accordion container.
 * params are in ./pages/subpages/assets
 * used in ./pages/subpages
 */

const Accordion = (props) => {
  let indexPlus;

  const [active, setActive] = useState(0);

  const eventHandler = (e, index) => {
    e.preventDefault();
    setActive(index);
  };

  const indexCount = (index) => {
    indexPlus = index + 1;
    return indexPlus;
  };

  const data = props.content;

  return (
    <div>
      <form>
        {data.map((tab, index) => (
          <div key={index}>
            <h3>
              <button
                onClick={(e) => eventHandler(e, index)}
                className={active === index ? "active" : "inactive"}
                aria-expanded={active === index ? "true" : "false"}
                aria-controls={"sect-" + indexCount(index)}
                aria-disabled={active === index ? "true" : "false"}
                tabIndex={indexCount(index)}
              >
                <span className="title-wrapper" style={{ zIndex: "3" }}>
                  {tab.title}
                  <span className={active === index ? "plus" : "minus"}></span>
                </span>
              </button>
            </h3>
            <div
              id={"sect-" + indexCount(index)}
              className={active === index ? "panel-open" : "panel-close"}
            >
              <strong style={{ color: "#ffffff", fontSize: "18px" }}>
                {tab.list}
              </strong>
              {tab.description.split("<br/>").map((i, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: "1.1rem",
                    color: "#ffffff",
                    textAlign: "left",
                  }}
                >
                  {" "}
                  <AutoLink text={i} />{" "}
                </li>
              ))}
              {tab.img != null ? (
                <img
                  src={tab.img}
                  alt={tab.title}
                  style={{
                    width: "30%",
                    height: "20%",
                    marginLeft: "30%",
                    marginTop: "15px",
                    borderRadius: "30%",
                  }}
                />
              ) : (
                false
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Accordion;
