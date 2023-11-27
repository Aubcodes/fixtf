import Container from "./Container";
import { FaUser } from "react-icons/fa6";
import Input from "./Input";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import React from "react";
import Wallet from "./Wallet";
import register from "../assets/register.svg";
import styled from "styled-components";
import useDetails from "../hook/useUser";

const Inner = styled.div`
  margin-top: 30px;

  h2 {
    font-size: 26px;
    color: #0e79b2;
    margin-bottom: 30px;
  }

  form {
  }

  .margin {
    margin-bottom: 30px;
  }

  .error-message {
    color: red;
    font-size: 11px;
    margin-top: 5px;
  }

  .link {
    display: none;
    margin-top: 20px;
    color: #0e79b2;
    text-decoration: none;
    align-items: start;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const Register = () => {
  const {
    details: { email, username },
    setDetails,
  } = useDetails();

  const [emailError, setEmailError] = React.useState("");
  const [nameError, setNameError] = React.useState("");

  const handleEmailChange = (e) => {
    setDetails("email", e.target.value);
    setEmailError(""); // Clear the error when the user types
  };

  const handleNameChange = (e) => {
    setDetails("username", e.target.value);
    setNameError(""); // Clear the error when the user types
  };

  return (
    <Container
      reverse
      text={"I am already a member"}
      path="/login"
      img={register}
    >
      <Inner className="center flex-col">
        <div>
          <h2>Sign up</h2>
          <form>
            <div className="margin">
              <Input
                icon={<MdEmail />}
                placeholder="Your Email"
                onChange={handleEmailChange}
                value={email}
                type="email"
                hasError={emailError}
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <div className="margin">
              <Input
                icon={<FaUser />}
                placeholder="Your Name"
                onChange={handleNameChange}
                value={username}
                type="text"
                hasError={nameError}
              />
              {nameError && <div className="error-message">{nameError}</div>}
            </div>
            <div className="margin">
              <Wallet
                setEmailError={setEmailError}
                setNameError={setNameError}
              />
            </div>
          </form>
        </div>
        <div className="link">
          <Link to={"/login"}>{"Already a member ?"}</Link>
        </div>
      </Inner>
    </Container>
  );
};

export default Register;
