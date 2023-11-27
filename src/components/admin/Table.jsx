import Details from "./Details";
import allUserStore from "./hook/allUsers";
// import React from "react";
// import React from "react";
import styled from "styled-components";

const Container = styled.div`
  .table-container {
    width: 100%;
    border-collapse: collapse;
  }
`;

const Row = styled.div`
  display: flex;
  border-bottom: 1px dashed #e4e6ef;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const Column = styled.div`
  padding: 8px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.alignRight ? "flex-end" : "flex-start")};
  color: #424243;
  font-size: 15px;
  font-weight: 700;
  line-height: normal;
`;

const HeaderColumn = styled(Column)`
  font-weight: bold;
  color: #b5b5c3;
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.36px;
`;

const Table = () => {
  const { users } = allUserStore();
  const columns = [
    { id: 1, title: "NAME", key: "username" },
    { id: 2, title: "EMAIL", key: "email" },
    { id: 3, title: "AMOUNT DEPOSITED", key: "amountDeposited" },
    { id: 4, title: "CURRENT BALANCE", key: "currentBalance" },
    { id: 5, title: "DETAILS", key: "details" },
  ];
  return (
    <Container>
      <div className="table-container">
        <Row>
          {columns.map((column) => {
            return (
              <HeaderColumn
                key={column.id}
                alignRight={column.key === "details"}
              >
                {column.title}
              </HeaderColumn>
            );
          })}
        </Row>
        {users.map((each, index) => {
          return (
            <Row key={index} className="flex">
              {columns.map((column) => {
                const { id, key } = column;
                return (
                  <Column key={id} alignRight={column.key === "details"}>
                    {key === "details" ? <Details user={each} /> : each[key]}
                  </Column>
                );
              })}
            </Row>
          );
        })}
      </div>
    </Container>
  );
};

export default Table;
