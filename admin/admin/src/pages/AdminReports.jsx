import React from "react";
import { message, Table } from "antd";
import { getAllReports } from "../apiCalls/reports";
import { useEffect } from "react";
import moment from "moment";
import Header from "../components/home/Header";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";

const Container = styled.div`
  background-color: whitesmoke;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  overflow: auto;
`;
const Wrapper = styled.div`
  width: 70%;
  margin: auto;
  background-color: white;
  margin-top: 100px;
  margin-bottom: 100px;
  border-radius: 15px;
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

function AdminReports() {
  const [reportsData, setReportsData] = React.useState([]);

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => (
        <>
          {record.exam.class} {record.exam.subject} {record.exam.name}
        </>
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },

    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];

  const getData = async (tempFilters) => {
    try {
      const response = await getAllReports(tempFilters);
      if (response.success) {
        setReportsData(response.data);
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

      <Wrapper>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col sm={4}>
            <h1 style={{ margin: 10 }}>Reports</h1>
          </Col>
        </Row>

        <div className="divider"></div>
        <Row>
          <Table columns={columns} dataSource={reportsData} className="mt-2" />
        </Row>
      </Wrapper>
    </Container>
  );
}

export default AdminReports;
