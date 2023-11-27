/* eslint-disable react/prop-types */
// import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Inner = styled.div`
  min-height: 100vh;
`;

const Box = styled.div`
  min-height: 600px;
  width: 950px;
  display: flex;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  padding: 0 20px;

  &.reverse {
    flex-direction: row-reverse;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    box-shadow: none;
  }
`;

const One = styled.div`
  gap: 30px;

  .image-container {
    height: 250px;
    width: 350px;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .link {
    a {
      text-decoration: none;
      color: inherit;
      font-size: 16px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Two = styled.div`
  padding: 30px 0;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Container = ({ children, reverse, text, path, img }) => {
  return (
    <Inner className="center">
      <Box className={reverse && "reverse"}>
        <One className="flex-1 flex flex-col center">
          <div className="image-container">
            <img src={img} alt={"profile"} />
          </div>
          <div className="link">
            <Link to={path}>{text}</Link>
          </div>
        </One>
        <Two className="flex-1">{children}</Two>
      </Box>
    </Inner>
  );
};

export default Container;
