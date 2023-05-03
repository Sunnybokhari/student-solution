import React, { useState } from "react";
import { message, Table } from "antd";
import { getAllAttempts } from "../../apiCalls/theoryAnswers";
import { useEffect } from "react";
import moment from "moment";
import Header from "../home/Header";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "../../apiCalls/teachers";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: whitesmoke;
  padding-bottom: 100px;
`;

const Wrapper = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  margin-bottom: 100px;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

function ListOfExams() {
  const { user } = useSelector((state) => state.users);

  const [reportsData, setReportsData] = React.useState([]);
  const [teacherData, setTeacherData] = React.useState({ subject: "" });
  const [filteredExams, setFilteredExams] = React.useState([]);

  const history = useHistory();

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
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            className="primary me-2"
            size="sm"
            onClick={() => history.push(`/gradeexam/${record._id}`)}
          >
            Grade Exam
          </Button>
        </div>
      ),
    },
  ];

  const getData = async () => {
    try {
      const response = await getAllAttempts();
      if (response.success) {
        setReportsData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getTeacherData = async () => {
    try {
      const response = await getUserInfo();

      if (response.success) {
        setTeacherData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    getTeacherData();
  }, []);

  useEffect(() => {
    const filtered = reportsData.filter((exam) => {
      return (
        exam.exam.subject === teacherData.subject &&
        exam.preference &&
        // exam.preference.includes(teacherData.email)
        exam.preference.some(
          (preference) => preference.preference === teacherData.email
        )
      );
    });

    setFilteredExams(filtered);
  }, [reportsData, teacherData]);

  return (
    <Container>
      <Header />
      <Wrapper>
        <h1 style={{ margin: 10 }}>List of Exams</h1>
        <div className="divider"></div>

        <Table columns={columns} dataSource={filteredExams} className="mt-2" />
      </Wrapper>
    </Container>
  );
}

export default ListOfExams;
