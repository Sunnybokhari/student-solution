import React from "react";
import styled from "styled-components";
import Header from "../components/home/Header";
import UserList from "../components/manageUsers/UserList";

const Container = styled.div`
  background-color: whitesmoke;
`;

const ManageUsers = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      exams: 3,
    },
    {
      id: "u2",
      name: "sunny Schwarz",
      exams: 10,
    },
  ];
  return (
    <Container>
      <Header />
      <UserList items={USERS} />;
    </Container>
  );
};

export default ManageUsers;
