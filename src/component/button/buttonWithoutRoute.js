import React from "react";
import "./button.css";
/*
Name: Button
Function: customized button by using different class name. And use css override to adopt multiple styles 
@params children accept child component and content under button tag
@params onClick accept functions for the button
@params buttonStyle accept button primary style 
@params size accept 2-level size style
@params color accepts 3rd level color style
@params destination accepts where to go. 
Used in Homepage, individual guide page in /pages/subpages. 
*/

const STYLES = ["btn--primary", "btn--outline", "btn--test", "btn--control"];

const SIZES = ["btn--small", "btn--medium", "btn--large"];
const COLOR = ["", "btn--red", "btn--green"];

export const ButtonWithoutRoute = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : COLOR[0];

  return (
    <div className="btn-mobile">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonWithoutRoute;
