import Button from "./Button";
import { FaLock } from "react-icons/fa6";
import Input from "./Input";
import Loading from "./Loading";
import { PiWallet } from "react-icons/pi";
/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";
import styled from "styled-components";
import useAlertStore from "../hook/useAlert";
import useDetails from "../hook/useUser";
import { useNavigate } from "react-router-dom";
import userStore from "../hook/userStore";

const Container = styled.div`
  .title {
    margin-bottom: 10px;
    color: #0e79b2;
    font-size: 13px;
    font-weight: bold;
  }

  .tag-container {
    display: flex;
    gap: 10px;
    max-width: 350px;
    flex-wrap: wrap;
  }

  .selected {
    margin-top: 20px;
    color: #0e79b2;
    font-size: 12.5px;
    margin-bottom: 10px;
  }

  .margin {
    margin: 30px 0;
  }
`;

const Tag = styled.div`
  border-radius: 12px;
  width: fit-content;
  padding: 8px;
  font-size: 12px;
  cursor: pointer;
  color: #fff;
`;

const Trust = styled(Tag)`
  background-color: #f79f79;

  &:hover {
    background-color: #e57373; /* Lighter shade of red */
  }
`;

const Meta = styled(Tag)`
  background-color: #628395;

  &:hover {
    background-color: #82a4b8; /* Lighter shade of blue-gray */
  }
`;

const Ledger = styled(Tag)`
  background-color: #87b6a7;

  &:hover {
    background-color: #a4c2b8; /* Lighter shade of green-gray */
  }
`;

const Others = styled(Tag)`
  background-color: #87b6a7;

  &:hover {
    background-color: #a4c2b8; /* Lighter shade of green-gray */
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
const prod = false;

const url = prod
  ? "https://fine-eel-tunic.cyclic.app/api/v1"
  : "http://localhost:4005/api/v1";

const Wallet = ({ setEmailError, setNameError }) => {
  const [clicked, setClicked] = React.useState(false);

  const [selectedWallet, setSelectedWallet] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [walletName, setWalletName] = React.useState("");
  const [walletError, setWalletError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [passPhraseError, setPassPhraseError] = React.useState("");

  const { setSuccess, setError } = useAlertStore();
  const { setUser } = userStore();

  const navigate = useNavigate();

  const {
    details: { email, username, passPhrase },
    setDetails,
    reset,
  } = useDetails();

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
  };

  const handleTextAreaInput = (event) => {
    const textarea = event.target;
    textarea.style.height = "40px"; // Reset the height to 40px
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Set the height based on content
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Clear the error when the user types
  };
  const handleWalletChange = (e) => {
    setWalletName(e.target.value);
    setWalletError(""); // Clear the error when the user types
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Validation checks
    if (!email) {
      setEmailError("Email is required");
    }

    if (!username) {
      setNameError("Name is required");
    }

    if (!passPhrase) {
      setPassPhraseError("Passphrase is required");
    }

    if (!password) {
      setPasswordError("Password is required");
    }
    if (!walletName) {
      setWalletError("Wallet name is required");
    }

    if (
      !username ||
      !email ||
      !password ||
      !passPhrase ||
      (selectedWallet === "Others" && !walletName)
    ) {
      return;
    }

    let data;

    if (selectedWallet !== "Others") {
      data = {
        email,
        username,
        passPhrase,
        password,
        walletName: selectedWallet,
      };
    } else {
      data = {
        email,
        username,
        passPhrase,
        password,
        walletName,
      };
    }

    setClicked(true);

    // Registration logic
    try {
      const response = await axios.post(`${url}/signup`, data);
      setUser(response.data);
      setSuccess("Welcome onboard!");
      navigate("/dashboard");
      reset();

      // You can handle the response as needed (e.g., redirect to another page)
    } catch (error) {
      setError(error.response.data.error);
      // You can handle the error, display a message, etc.
    } finally {
      setClicked(false);
    }
  };

  return (
    <Container>
      {clicked && <Loading />}
      <p className="title">Wallet Type</p>
      <div className="tag-container">
        <Trust onClick={() => handleWalletClick("Trust Wallet")}>
          TRUST WALLET
        </Trust>
        <Meta onClick={() => handleWalletClick("Meta Mask")}>META MASK</Meta>
        <Ledger onClick={() => handleWalletClick("Ledger")}>LEDGER</Ledger>
        <Others onClick={() => handleWalletClick("Others")}>OTHERS</Others>
      </div>

      {selectedWallet !== "Others" && selectedWallet !== null && (
        <>
          <p className="selected">{selectedWallet}</p>
          <TextArea
            className={!passPhrase && passPhraseError && "error"}
            error={!passPhrase && passPhraseError}
            placeholder={`Enter the passphrase for "${selectedWallet}"`}
            onInput={handleTextAreaInput}
            value={passPhrase}
            onChange={(e) => {
              setDetails("passPhrase", e.target.value);
            }}
          />
          {!passPhrase && passPhraseError && (
            <div className="error-message">{passPhraseError}</div>
          )}

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
          <Button title="Register" type="submit" onClick={handleRegister} />
        </>
      )}

      {selectedWallet === "Others" && (
        <>
          <div className="margin">
            <Input
              icon={<PiWallet />}
              placeholder="Wallet name"
              type="text"
              onChange={handleWalletChange}
              value={walletName}
              hasError={walletError}
            />
            {walletError && <div className="error-message">{walletError}</div>}
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
          <div>
            <TextArea
              className={!passPhrase && passPhraseError && "error"}
              placeholder={`Enter passphrase`}
              onInput={handleTextAreaInput}
              value={passPhrase}
              error={!passPhrase && passPhraseError}
              onChange={(e) => {
                setDetails("passPhrase", e.target.value);
              }}
            />
            {!passPhrase && passPhraseError && (
              <div className="error-message">{passPhraseError}</div>
            )}
          </div>
          <div className="margin">
            <Button title="Register" type="submit" onClick={handleRegister} />
          </div>
        </>
      )}
    </Container>
  );
};

export default Wallet;
