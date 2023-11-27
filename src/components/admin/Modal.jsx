/* eslint-disable react/prop-types */
import Loading from "../Loading";
import React from "react";
import allUserStore from "./hook/allUsers";
import axios from "axios";
import styled from "styled-components";
import useAlertStore from "../../hook/useAlert";
import userStore from "../../hook/userStore";

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(98, 97, 99, 0.4);
  z-index: 99;
  backdrop-filter: blur(2.5px);
`;

const Inner = styled.div`
  height: 390px;
  width: 390px;
  border-radius: 5px;
  background: white;

  padding: 20px;
  h2 {
    margin: 10px 0;
  }

  p {
    margin: 5px 0;
    font-size: 12px;
  }

  input {
    border: 1px solid #ccc;
    width: 100%;
    padding: 4px 10px;
    margin-bottom: 10px;
  }

  .form {
    height: 300px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background: #0e79b2;
  color: white;
  border: none;
  outline: none;
  padding: 9px;
  border-radius: 3px;
  &.cancel {
    background-color: transparent;
    color: #3b3a3c;
    font-size: 13px;
    line-height: 150%;
  }
`;

const prod = true;

const url = prod
  ? "https://fine-eel-tunic.cyclic.app/api/v1"
  : "http://localhost:4005/api/v1";

const Modal = ({ user, close }) => {
  const [clicked, setClicked] = React.useState(false);
  const [amountDeposited, setAmountDeposited] = React.useState(
    user.amountDeposited
  );
  const [currentBalance, setCurrentBalance] = React.useState(
    user.currentBalance
  );

  const loggedUser = userStore();

  const { setSuccess, setError } = useAlertStore();
  const { setLoading } = allUserStore();

  const updateUser = async () => {
    try {
      // Check if there are changes
      if (
        amountDeposited === user.amountDeposited &&
        currentBalance === user.currentBalance
      ) {
        return;
      }

      setClicked(true);

      // Make a request to update the user
      const response = await axios.put(
        `${url}/admin/update`,
        {
          userId: user._id,
          amountDeposited,
          currentBalance,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedUser.user.token}`,
          },
        }
      );

      setSuccess(response.data.message);
      setClicked(false);
      close(); // Close the modal after successful update
      setLoading(true);
    } catch (error) {
      setError(error.response.data.error);

      setClicked(false);
    }
  };

  return (
    <ModalContainer className="center">
      {clicked && <Loading />}
      <Inner>
        <h2>Edit {user.username}</h2>

        <div className="form flex flex-col">
          <div className="flex-1">
            <div>
              <p>Amount deposited</p>
              <input
                value={amountDeposited}
                onChange={(e) => setAmountDeposited(e.target.value)}
              />
            </div>
            <div>
              <p>Current balance</p>
              <input
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
              />
            </div>
          </div>

          <div className="bottom flex jc-end">
            <div>
              <Button className="cancel" onClick={close}>
                Cancel
              </Button>
            </div>
            <div>
              <Button onClick={updateUser}>Save Changes</Button>
            </div>
          </div>
        </div>
      </Inner>
    </ModalContainer>
  );
};

export default Modal;
