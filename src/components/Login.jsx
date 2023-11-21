import { FaLock, FaUser } from "react-icons/fa";

import Button from "./Button";
import Container from "./Container";
import Input from "./Input";
import Loading from "./Loading";
import React from "react";
import axios from "axios";
import login from "../assets/login.svg";
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

const url = "http://localhost:4005/api/v1";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [clicked, setClicked] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const { setUser } = userStore();

  const { setSuccess, setError } = useAlertStore();

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear the error when the user types
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Clear the error when the user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
    }

    if (!password) {
      setPasswordError("Password is required");
    }

    if (!email || !password) {
      setClicked(false);
      return;
    }

    setClicked(true);

    try {
      const response = await axios.post(`${url}/login`, {
        email,
        password,
      });
      setUser(response.data);
      navigate("/dashboard");
      setSuccess("Welcome back");

      // You can handle the response as needed (e.g., redirect to another page)
    } catch (error) {
      setError(error.response.data.error);

      // You can handle the error, display a message, etc.
    } finally {
      setClicked(false);
    }
  };

  return (
    <Container text="Create an account" path={"/register"} img={login}>
      {clicked && <Loading />}
      <Inner>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="margin">
            <Input
              icon={<FaUser />}
              placeholder="Your Email"
              onChange={handleEmailChange}
              value={email}
              hasError={emailError}
            />
            {emailError && <div className="error-message">{emailError}</div>}
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
          <Button title="Login" type={"submit"} />
        </form>
      </Inner>
    </Container>
  );
};

export default Login;
