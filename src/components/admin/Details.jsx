/* eslint-disable react/prop-types */
import Modal from "./Modal";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  display: inline-flex;
  padding: 9px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  border: none;
  cursor: pointer;
`;

const Edit = styled(Button)`
  color: #e53b3b;
  background: #ffeaea;
  width: 90px;
`;

const Details = ({ user }) => {
  const [openModal, setOpenModal] = React.useState(false);

  const onClick = () => {
    setOpenModal(true);
  };

  return (
    <Container>
      {openModal && <Modal user={user} close={() => setOpenModal(false)} />}
      <Edit onClick={onClick}>Edit</Edit>
    </Container>
  );
};

export default Details;
