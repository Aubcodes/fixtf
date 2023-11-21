import styled, { css } from "styled-components";

import React from "react";
import useAlertStore from "../hook/useAlert";

const Inner = styled.div`
  font-size: 13px;
  z-index: 100;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  transition: all 0.5s;
  /* transform: translateY(${(props) => (props.show ? "0" : "-30px")}); */
  /* right: ${(props) => (props.show ? "40px" : "-300px")}; */
  top: -100px;

  ${(props) =>
    props.show &&
    css`
      top: 30px;
      transition: all 0.5s;
    `}
`;

const Success = styled(Inner)`
  background-color: #ddf1d7;
  color: #99b192;
`;

const Error = styled(Inner)`
  background-color: #ebc9c5;
  color: #ad4c48;
`;

const Alert = () => {
  const { error, success, setError, setSuccess } = useAlertStore();
  const [showError, setShowError] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => handleClick(), 4000);
    }
    if (success) {
      setShowSuccess(true);
      setTimeout(() => handleClick(), 4000);
    }

    const handleClick = () => {
      setShowError(false);
      setShowSuccess(false);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);
    };
  }, [error, success, setError, setSuccess]);

  return (
    <div className="center">
      {error && <Error show={showError}>{error}</Error>}

      {success && <Success show={showSuccess}>{success}</Success>}
    </div>
  );
};

export default Alert;
