/* eslint-disable react/prop-types */
import { MdEmail, MdNumbers } from "react-icons/md";

import Avatar from "./Avatar";
import { CiLogout } from "react-icons/ci";
import { FaPercent } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { PiMoney } from "react-icons/pi";
import { TfiWallet } from "react-icons/tfi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import userStore from "../hook/userStore";

const Container = styled.div``;

const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid #e0e0e0;

  ul {
    list-style-type: none;
    margin-top: 40px;
    padding: 0 30px;
  }

  li {
    margin-bottom: 10px;
    cursor: pointer;
    .icon {
      margin-right: 5px;
    }
  }

  @media (max-width: 768px) {
    /* background-color: blue; */
    /* display: none; */
    width: 100px;
    ul {
      padding: 0 10px;
    }

    p {
      font-size: 11px;
    }
  }
`;

const Menu = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-top: 30px;
  padding: 20px;

  @media (max-width: 600px) {
    h2 {
      font-size: 20px;
    }
  }
  @media (max-width: 500px) {
    margin-top: 20px;
    padding: 10px;

    h2 {
      font-size: 16px;
    }
  }
`;

const Body = styled.div`
  padding: 20px;
  @media (max-width: 500px) {
    padding: 10px;
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

  @media (max-width: 500px) {
    width: 70px;
    font-size: 12px;
    padding: 5px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 500px) {
    gap: 15px;
    grid-template-columns: repeat(2, 1fr);

    p {
      font-size: 12px;
    }
  }
`;

const Item = styled.div`
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow */
  border-radius: 6px;
  height: 90px;

  .item {
    display: flex;
    gap: 10px;
  }

  .value {
    font-size: 14px;
    margin-top: 5px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: start;
  }
`;

function calculatePercentageIncrease(originalValue, newValue) {
  if (originalValue === 0) {
    // Return 0 percentage increase when the original value is 0
    return 0;
  }

  // Calculate percentage increase
  const percentageIncrease =
    ((newValue - originalValue) / Math.abs(originalValue)) * 100;

  return percentageIncrease;
}

const Dashboards = ({ children }) => {
  const { user, setUser } = userStore();

  const navigate = useNavigate();

  if (children) {
    return (
      <Container className="flex">
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
          <Header className="flex ai-center justify-between">
            <div>
              <h2>Welcome, {user.username} 🚀</h2>
            </div>
            <div>
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
                  <CiLogout size={13} />
                </div>
                <p>Logout</p>
              </LogOut>
            </div>
          </Header>
          <Body>{children}</Body>
        </Menu>
      </Container>
    );
  }

  return (
    <Container className="flex">
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
        <Header className="flex ai-center justify-between">
          <div>
            <h2>Welcome, {user.username} 🚀</h2>
          </div>
          <div>
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
                <CiLogout size={13} />
              </div>
              <p>Logout</p>
            </LogOut>
          </div>
        </Header>
        <Body>
          <GridContainer>
            <div>
              <Item>
                <div className="item">
                  <MdEmail size={20} />
                  <p>Email</p>
                </div>
                <div className="value">{user.email}</div>
              </Item>
            </div>
            <Item>
              <div className="item">
                <MdNumbers size={20} />
                <p>Merchant ID</p>
              </div>
              <div className="value">{user.merchantId}</div>
            </Item>
            <Item>
              <div className="item">
                <PiMoney size={20} />
                <p>Current Balance</p>
              </div>
              <div className="value">{user.currentBalance}</div>
            </Item>
            <Item>
              <div className="item">
                <TfiWallet size={20} />
                <p>Amount Deposited</p>
              </div>
              <div className="value">{user.amountDeposited}</div>
            </Item>
            <Item>
              <div className="item">
                <FaPercent size={20} />
                <p>Percentage Increase</p>
              </div>
              <div className="value">
                {calculatePercentageIncrease(
                  user.currentBalance,
                  user.amountDeposited
                )}
              </div>
            </Item>
          </GridContainer>
        </Body>
      </Menu>
    </Container>
  );
};

export default Dashboards;
