import { FaLock, FaUser } from "react-icons/fa6";
import { MdEmail, MdLockOutline } from "react-icons/md";

import Button from "./Button";
import Container from "./Container";
import Input from "./Input";
import Loading from "./Loading";
import React from "react";
import axios from "axios";
import register from "../assets/register.svg";
import styled from "styled-components";
import useAlertStore from "../hook/useAlert";
import { useNavigate } from "react-router-dom";
import userStore from "../hook/userStore";

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
`;

const url = "https://fine-eel-tunic.cyclic.app";

const Register = () => {
  const [clicked, setClicked] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

  const { setSuccess, setError } = useAlertStore();

  const { setUser } = userStore();

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear the error when the user types
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(""); // Clear the error when the user types
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Clear the error when the user types
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(""); // Clear the error when the user types
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Validation checks
    if (!email) {
      setEmailError("Email is required");
    }

    if (!name) {
      setNameError("Name is required");
    }

    if (!password) {
      setPasswordError("Password is required");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }

    // If any error, stop the registration process
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      confirmPassword !== password
    ) {
      return;
    }

    setClicked(true);

    // Registration logic
    try {
      const response = await axios.post(`${url}/signup`, {
        email,
        username: name,
        password,
      });
      setUser(response.data);
      setSuccess("Welcome onboard!");
      navigate("/dashboard");
      // You can handle the response as needed (e.g., redirect to another page)
    } catch (error) {
      setError(error.response.data.error);
      // You can handle the error, display a message, etc.
    } finally {
      setClicked(false);
    }
  };

  return (
    <Container
      reverse
      text={"I am already a member"}
      path="/login"
      img={register}
    >
      {clicked && <Loading />}

      <Inner className="center flex-col">
        <div>
          <h2>Sign up</h2>
          <form onSubmit={handleRegister}>
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
                value={name}
                type="text"
                hasError={nameError}
              />
              {nameError && <div className="error-message">{nameError}</div>}
            </div>
            <div className="margin">
              <Input
                icon={<FaLock />}
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
                value={password}
                hasError={passwordError}
              />
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
            </div>
            <div className="margin">
              <Input
                icon={<MdLockOutline />}
                placeholder="Retype Password"
                type="password"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                hasError={confirmPasswordError}
              />
              {confirmPasswordError && (
                <div className="error-message">{confirmPasswordError}</div>
              )}
            </div>
            <Button title="Register" type="submit" />
          </form>
        </div>
      </Inner>
    </Container>
  );
};

export default Register;
