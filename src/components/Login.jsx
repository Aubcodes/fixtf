import { Link, useNavigate } from "react-router-dom";

import Button from "./Button";
import Container from "./Container";
import { FaUser } from "react-icons/fa";
import Input from "./Input";
import Loading from "./Loading";
import React from "react";
import axios from "axios";
import login from "../assets/login.svg";
import styled from "styled-components";
import useAlertStore from "../hook/useAlert";
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

  .link {
    display: none;
    margin-top: 20px;
    color: #0e79b2;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      display: block;
      text-align: center;
    }
  }
`;

const TextArea = styled.textarea`
  width: 350px;
  height: 40px;
  max-height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  /* margin-top: 20px; */
  overflow-y: auto;

  &.error {
    border: 1px solid red;
  }

  ::placeholder {
    color: ${(props) => props.error && "red"};
    font-size: 12px;
  }
`;

const prod = true;

const url = prod
  ? "https://fine-eel-tunic.cyclic.app/api/v1"
  : "http://localhost:4005/api/v1";

const Login = () => {
  React.useEffect(() => {
    document.title = "TFX GROUPS | LOG IN";
  }, []);

  const [email, setEmail] = React.useState("");
  const [clicked, setClicked] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passPhrase, setPassPhrase] = React.useState("");
  const [passPhraseError, setPassPhraseError] = React.useState("");

  const { setUser } = userStore();

  const { setSuccess, setError } = useAlertStore();

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear the error when the user types
  };

  const handleTextAreaInput = (event) => {
    const textarea = event.target;
    textarea.style.height = "40px"; // Reset the height to 40px
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Set the height based on content
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
    }

    if (!passPhrase) {
      setPassPhraseError("Passphrase is required");
    }

    if (!email || !passPhrase) {
      return;
    }

    setClicked(true);

    try {
      const response = await axios.post(`${url}/login`, { email, passPhrase });
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
            <TextArea
              placeholder="Enter your passphrase"
              onInput={handleTextAreaInput}
              value={passPhrase}
              onChange={(e) => {
                setPassPhrase(e.target.value);
              }}
              className={!passPhrase && passPhraseError && "error"}
              error={!passPhrase && passPhraseError}
            />
            {!passPhrase && passPhraseError && (
              <div className="error-message">{passPhraseError}</div>
            )}
          </div>

          <Button title="Login" type={"submit"} />
        </form>
        <div className="link center w-100">
          <Link to={"/register"}>{"Create an account ?"}</Link>
        </div>
      </Inner>
    </Container>
  );
};

export default Login;
