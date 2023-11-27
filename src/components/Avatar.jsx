// import React from "react";
import styled from "styled-components";
import userStore from "../hook/userStore";

const Container = styled.div`
  height: 55px;
  width: 55px;
  background: #ff595e;
  border-radius: 50%;
  color: white;
  margin-top: 30px;
  font-size: 25px;
  text-transform: capitalize;
  @media (max-width: 600px) {
    height: 45px;
    width: 45px;
    font-size: 20px;
  }
  @media (max-width: 500px) {
    height: 40px;
    width: 40px;
    font-size: 18px;
  }
`;

const Image = styled.div`
  height: 55px;
  margin-top: 30px;
  width: 55px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 500px) {
    height: 40px;
    width: 40px;
  }
`;

const Avatar = () => {
  const { user } = userStore();

  return (
    <div className="center">
      {(user.imageUrl === "" || user.isAdmin) && (
        <Container className="center">{user.username[0]}</Container>
      )}

      {user.imageUrl && (
        <Image>
          <img src={user.imageUrl} />
        </Image>
      )}
    </div>
  );
};

export default Avatar;
