/* eslint-disable react/prop-types */
import styled from "styled-components";

const Inner = styled.div`
  display: flex;
  width: 350px;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid ${(props) => (props.hasError ? "red" : "#cbd2d0")};

  .icon {
    height: 30px;
    width: 30px;
    color: ${(props) => (props.hasError ? "red" : "black")};
    /* Adjusted icon color based on error */
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 15px;

    ::placeholder {
      color: ${(props) => props.hasError && "red"};
      font-size: 12px;
    }

    /* border-bottom: 2px solid ${(props) =>
      props.hasError ? "red" : "#cbd2d0"}; */
    /* Adjusted input border color based on error */
  }
`;

const Input = ({
  icon,
  placeholder,
  onChange,
  value,
  readOnly,
  hasError,
  type,
}) => {
  return (
    <div>
      <Inner hasError={hasError}>
        <div>
          <div className="icon center">{icon}</div>
        </div>
        <div className="flex-1">
          <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            readOnly={readOnly}
          />
        </div>
      </Inner>
    </div>
  );
};

export default Input;
