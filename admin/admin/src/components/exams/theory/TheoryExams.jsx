import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import Header from "../../home/Header";
import { Table, message } from "antd";
import { getAllExams, deleteExamById } from "../../../apiCalls/theoryExams";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  background-color: whitesmoke;
  padding-bottom: 100px;
`;
const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  background-color: white;
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

const SubjectOption = styled.option`
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  border: solid 1px gray;
  margin: 0px 5px;
  width: 150px;
  cursor: pointer;
  &:hover {
    background-color: darkgrey;
  }
`;
const Test = () => {
  const [exams, setExams] = React.useState([]);
  const history = useHistory();

  const getExamsData = async () => {
    try {
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const deleteExam = async (examId) => {
    try {
      const response = await deleteExamById({
        examId,
      });
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Time Limit",
      dataIndex: "timeLimit",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            className="primary me-2"
            size="sm"
            onClick={() => history.push(`/edittheoryexam/${record._id}`)}
          >
            Edit
          </Button>
          <Button
            className="primary"
            variant="danger"
            size="sm"
            onClick={() => deleteExam(record._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getExamsData();
  }, []);

  const [classFilter, setClassFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const filteredExams = exams.filter((exam) => {
    return (
      (classFilter === "All" || exam.class === classFilter) &&
      (yearFilter === "All" || exam.year === yearFilter) &&
      (subjectFilter === "All" || exam.subject === subjectFilter)
    );
  });

  return (
    <Container>
      <Header />
      <Heading>
        <HeadingText>CIE Theory Question Papers</HeadingText>
      </Heading>
      <Wrapper>
        <Row className="pt-2 pb-2">
          <Col sm={3}>
            <span style={{ marginLeft: 15 }}>Class: </span>
            <select
              style={{ width: 200 }}
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <SubjectOption value="All">All</SubjectOption>
              <SubjectOption value="O1">O1</SubjectOption>
              <SubjectOption value="O2">O2</SubjectOption>
              <SubjectOption value="AS">AS</SubjectOption>
              <SubjectOption value="A2">A2</SubjectOption>
              {/* Add options for other classes as needed */}
            </select>
          </Col>
          <Col sm={3} style={{ marginLeft: 5 }}>
            <span>Subject: </span>

            <select
              style={{ width: 200 }}
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <SubjectOption value="All">All</SubjectOption>
              <SubjectOption value="Accounting">Accounting</SubjectOption>
              <SubjectOption value="Business">Business</SubjectOption>
              <SubjectOption value="Biology">Biology</SubjectOption>
              <SubjectOption value="Chemistry">Chemistry</SubjectOption>
              <SubjectOption value="Economics">Economics</SubjectOption>
              <SubjectOption value="English">English</SubjectOption>
              <SubjectOption value="Mathematics">Mathematics</SubjectOption>
              <SubjectOption value="Physics">Physics</SubjectOption>
              <SubjectOption value="Psychology">Psychology</SubjectOption>

              {/* Add options for other classes as needed */}
            </select>
          </Col>
          <Col sm={3}>
            <span>Year: </span>

            <select
              style={{ width: 200 }}
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <SubjectOption value="All">All</SubjectOption>
              <SubjectOption value="2019">2019</SubjectOption>
              <SubjectOption value="2020">2020</SubjectOption>
              <SubjectOption value="2021">2021</SubjectOption>
              <SubjectOption value="2022">2022</SubjectOption>
              {/* Add options for other classes as needed */}
            </select>
          </Col>
          <Col sm={2}>
            <Button href="/addtheoryexam" className="mcqB ms-5 mb-3 px-3">
              Add Exam
            </Button>
          </Col>
        </Row>
        <Row>
          <Table dataSource={filteredExams} columns={columns} rowKey="_id" />
        </Row>
      </Wrapper>
    </Container>
  );
};

export default Test;
