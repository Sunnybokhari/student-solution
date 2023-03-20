import React from "react";
import styled from "styled-components";
const Container = styled.div`
  background-color: whitesmoke;
`;

const Li = styled.li``;

const UserContainer = styled.div``;

const UserInfoContainer = styled.div`
  border: 1px solid lightgray;
  margin-top: 10px;
`;

const UserInfo = styled.h2`
  font-size: 25px;
`;

const UserItem = (props) => {
  return (
    <Container>
      <Li className="user-item">
        <UserContainer className="user-item__content">
          <UserInfoContainer className="user-item__info">
            <UserInfo>
              {props.name} {props.examCount}{" "}
              {props.examCount === 1 ? "Exam" : "Exams"}
            </UserInfo>
            <UserInfo>
              {props.examCount} {props.examCount === 1 ? "Exam" : "Exams"}
            </UserInfo>
          </UserInfoContainer>
        </UserContainer>
      </Li>
    </Container>
  );
};

export default UserItem;
