import React from "react";
import { message, Table } from "antd";
import { getAllUsers } from "../apiCalls/teachers";
import { useEffect } from "react";
import moment from "moment";
import Header from "../components/home/Header";
import { Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  background-color: whitesmoke;
  padding-bottom: 100px;

`;
const Wrapper = styled.div`
  width: 70%;
  margin: auto;
  background-color: white;
  margin-top: 100px;
  margin-bottom: 100px;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const Heading = styled.h1`
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid gray;
  line-height: 0px;
  margin-bottom: 100px;
  text-decoration: none;
  padding-top: 100px;
`;
const HeadingText = styled.span`
  background-color: whitesmoke;
  padding: 20px 40px;
  font-weight: lighter;
`;

function ManageTeachers() {
  const [teachersData, setTeachersData] = React.useState([]);

  const columns = [
    {
      title: "Teacher Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },

    {
      title: "Class",
      dataIndex: "class",
    },
    {
      title: "Years of Experiance",
      dataIndex: "years",
    },
    {
      title: "Current School",
      dataIndex: "school",
    },
    {
      title: "Date joined",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
  ];

  const getData = async (tempFilters) => {
    try {
      const response = await getAllUsers(tempFilters);
      if (response.success) {
        setTeachersData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Header />
      {/* <Heading>
        <HeadingText>Teachers</HeadingText>
      </Heading> */}
      <Wrapper>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col sm={4}>
            <h1 style={{ margin: 10 }}>Teachers</h1>
          </Col>
          <Col sm={2}>
            <Button style={{ marginTop: 20 }} href="/teachersignup">
              Add Teacher
            </Button>
          </Col>
        </Row>

        <div className="divider"></div>
        <Row>
          <Table columns={columns} dataSource={teachersData} className="mt-2" />
        </Row>
      </Wrapper>
    </Container>
  );
}

export default ManageTeachers;
