/* eslint-disable react/prop-types */
// import React from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import { CiLogout } from "react-icons/ci";
import { FaPercent } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdNumbers } from "react-icons/md";
import { PiMoney } from "react-icons/pi";
import { TfiWallet } from "react-icons/tfi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import userStore from "../hook/userStore";

const Inner = styled.div`
  min-height: 100vh;
  display: flex;

  ul {
    list-style-type: none;
    margin-top: 40px;
  }

  li {
    margin-bottom: 10px;
    cursor: pointer;
    .icon {
      margin-right: 5px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const Sidebar = styled.div`
  width: 150px;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
`;

const Menu = styled.div`
  padding: 0 40px;
  margin-top: 50px;
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 50px;
  width: 500px;
`;

const Item = styled.div`
  width: 300px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow */
  margin-bottom: 20px; /* Add margin to create space between items */
  border-radius: 4px;

  p {
    font-size: 16px;
  }
`;

const LogOut = styled.button`
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

const Dashboard = ({ children }) => {
  const { user, setUser } = userStore();

  const navigate = useNavigate();

  if (children) {
    return (
      <Inner>
        <Sidebar>
          <div className="center">
            <Avatar />
          </div>

          <ul>
            <li
              className="flex ai-center"
              onClick={() => navigate("/dashboard")}
            >
              <div className="icon">
                <IoHomeSharp color="#ff595e" size={16} />
              </div>
              <p>Dashboard</p>
            </li>
            <li className="flex ai-center" onClick={() => navigate("/profile")}>
              <div className="icon">
                <FaUser color="#ff595e" size={16} />
              </div>
              <p>Profile</p>
            </li>
          </ul>
        </Sidebar>
        <Menu>
          <div className="flex ai-center justify-between">
            <h2>Welcome, {user.username} 🚀</h2>
            <Button
              title={"Logout"}
              logout
              onClick={() => {
                setUser({ username: "", email: "", imageUrl: "" });
                navigate("/login");
              }}
            />
          </div>
          {children}
        </Menu>
      </Inner>
    );
  }
  return (
    <Inner>
      <Sidebar>
        <div className="center">
          <Avatar />
        </div>

        <ul>
          <li className="flex ai-center" onClick={() => navigate("/dashboard")}>
            <div className="icon">
              <IoHomeSharp color="#ff595e" size={16} />
            </div>
            <p>Dashboard</p>
          </li>
          <li className="flex ai-center" onClick={() => navigate("/profile")}>
            <div className="icon">
              <FaUser color="#ff595e" size={16} />
            </div>
            <p>Profile</p>
          </li>
        </ul>
      </Sidebar>
      <Menu>
        <div className="flex ai-center justify-between">
          <h2>Welcome, {user.username} 🚀</h2>
          <LogOut
            className={"flex ai-center jc-center"}
            onClick={() => {
              setUser({
                username: "",
                email: "",
                imageUrl: "",
              });
              navigate("/login");
            }}
          >
            <div className="icon">
              <CiLogout size={19} />
            </div>
            <p>Logout</p>
          </LogOut>
        </div>
        <GridContainer>
          <Item>
            <MdEmail size={20} />
            <p>Email</p>
          </Item>
          <Item>
            <MdNumbers size={20} />
            <p>Merchant ID</p>
          </Item>
          <Item>
            <PiMoney size={20} />
            <p>Current Balance</p>
          </Item>
          <Item>
            <TfiWallet size={20} />
            <p>Amount Deposited</p>
          </Item>
          <Item>
            <FaPercent size={20} />
            <p>Percentage Increase</p>
          </Item>
        </GridContainer>
      </Menu>
    </Inner>
  );
};

export default Dashboard;
