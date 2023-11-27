import Avatar from "../Avatar";
import { CiLogout } from "react-icons/ci";
import React from "react";
import Table from "./Table";
import allUserStore from "./hook/allUsers";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import userStore from "../../hook/userStore";

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

const Main = styled.div`
  min-height: 100vh;
  width: 100%;

  .padding {
    padding: 20px;
  }
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

const prod = true;

const url = prod
  ? "https://fine-eel-tunic.cyclic.app/api/v1"
  : "http://localhost:4005/api/v1";

const AdminPage = () => {
  const { setUsers, loading, setLoading } = allUserStore();
  //
  const { user, setUser } = userStore();

  const navigate = useNavigate();

  const authToken = user.token;

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(response.data);
      setLoading(false);
    };

    if (loading) {
      fetchUsers();
    }
  }, [setUsers, authToken, setLoading, loading]);

  return (
    <Container className="flex">
      <Sidebar>
        <div className="center">
          <Avatar />
        </div>
      </Sidebar>
      <Main>
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
        <div className="padding">{loading ? <p>Loading...</p> : <Table />}</div>
      </Main>
    </Container>
  );
};

export default AdminPage;
