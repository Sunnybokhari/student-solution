import React from "react";
import styled from "styled-components";

import UserItem from "./UserItem";

const Container = styled.div`
  background-color: whitesmoke;
`;
const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  background-color: white;
  margin-top: 50px;
  border-radius: 15px;
  padding: 10px;
`;

const Heading = styled.h1`
  margin-left: 20px;
`;

const ListConatiner = styled.div`
  width: 90%;
  margin: auto;
`;

const ListHeading = styled.h1`
  word-spacing: 150px;
`;
const Ul = styled.ul`
  list-style: none;
`;
const UserList = (props) => {
  return (
    <Container>
      <Wrapper>
        <Heading>Users List</Heading>
        <ListConatiner>
          <Ul className="users-list">
            <ListHeading>Name Email Password Attempted</ListHeading>
            {props.items.map((user) => (
              <UserItem
                key={user.id}
                id={user.id}
                name={user.name}
                examCount={user.exams}
              />
            ))}
          </Ul>
        </ListConatiner>
      </Wrapper>
    </Container>
  );
};

export default UserList;
