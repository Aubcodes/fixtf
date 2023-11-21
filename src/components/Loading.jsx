import { MoonLoader } from "react-spinners";
// import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <div className="center h-100">
        <MoonLoader color="#408bc9" />
      </div>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(98, 97, 99, 0.4);
  z-index: 100;
  backdrop-filter: blur(2.5px);
`;
