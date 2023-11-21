import { CiLogout } from "react-icons/ci";
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

// Define the styled component
const StyledButton = styled.button`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 140px;
  background: #0e79b2;
  color: white;
  text-align: center;
  border-radius: 3px;
  border: none;
  outline: none;
  font-size: 15px;

  &:hover {
    background-color: #408bc9; /* Adjust hover color */
  }

  &:active {
    background-color: #075180; /* Adjust active color */
  }

  &.clicked {
    background-color: #075180; /* Adjust clicked color */
    color: white;
  }

  .icon {
    margin-right: 5px;
  }

  /* Add more styles as needed */
`;

const Button = ({ title, onClick, type, logout }) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  if (logout) {
    return (
      <div>
        <StyledButton
          onClick={onClick}
          className={
            isClicked
              ? "clicked flex ai-center jc-center"
              : "flex ai-center jc-center"
          }
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          // type={type}
        >
          <div className="icon">
            <CiLogout size={19} />
          </div>
          {title}
        </StyledButton>
      </div>
    );
  }

  return (
    <StyledButton
      onClick={onClick}
      className={isClicked ? "clicked" : ""}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      type={type}
    >
      {title}
    </StyledButton>
  );
};

export default Button;
