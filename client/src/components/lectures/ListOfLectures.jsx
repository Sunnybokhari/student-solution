import React, { useState } from "react";
import { message, Table } from "antd";
import { useEffect } from "react";
import moment from "moment";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { meetingsRef } from "../../apiCalls/firebase";
import { getDocs, query, where } from "firebase/firestore";
import Badge from "react-bootstrap/Badge";

import Navbar from "../home/Navbar";

const Container = styled.div`
  background-color: whitesmoke;
  padding-bottom: 50px;
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

function ListOfLectures() {
  const history = useHistory();
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings = [];
        fetchedMeetings.forEach((meeting) => {
          const data = meeting.data();
          myMeetings.push(meeting.data());
        });
        const sortedMeetings = myMeetings.sort((a, b) => {
          return new Date(b.meetingDate) - new Date(a.meetingDate);
        });
        setMeetings(sortedMeetings);
      }
    };
    getMyMeetings();
  }, []);

  const columns = [
    {
      title: "Lecture Name",
      dataIndex: "lectureName",
      render: (text, record) => <>{record.meetingName}</>,
    },
    {
      title: "Teacher Name",
      dataIndex: "userName",
      render: (text, record) => (
        <>
          {record.creatorName} {","} {record.school}
        </>
      ),
    },
    {
      title: "Subject",
      dataIndex: "userName",
      render: (text, record) => (
        <>
          {record.class} {record.subject}
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.meetingDate).format("DD-MM-YYYY")}</>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record) => <>{record.meetingTime}</>,
    },
    {
      title: "Max Participants",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.maxUsers}</>,
    },
    {
      title: "Status",
      dataIndex: "totalQuestions",
      render: (text, record) => {
        if (record.status === "active") {
          if (moment(record.meetingDate).isSame(moment(), "day")) {
            return (
              <Badge style={{padding:"10px"}} bg="success">
                <Link
                  to={`/join/${record.meetingId}`}
                  style={{ color: "white" }}
                >
                  Join Now
                </Link>
              </Badge>
            );
          } else if (moment(record.meetingDate).isBefore(moment())) {
            record.status = "ended";
            return <Badge style={{padding:"10px"}} bg="secondary">Ended</Badge>;
          } else if (moment(record.meetingDate).isAfter(moment())) {
            return <Badge style={{padding:"10px"}} bg="primary">Upcoming</Badge>;
          }
        } else if (record.status === "ended") {
          return <Badge style={{padding:"10px"}} bg="secondary">Ended</Badge>;
        } else {
          return <Badge style={{padding:"10px"}} bg="danger">Cancelled</Badge>;
        }
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (text, record) => (
    //     <div>
    //       <Button
    //         className="primary me-2"
    //         size="sm"
    //         onClick={() => history.push(`/gradeexam/${record._id}`)}
    //       >
    //         Grade Exam
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  const [classFilter, setClassFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const filteredExams = meetings.filter((exam) => {
    return (
      (classFilter === "All" || exam.class === classFilter) &&
      (subjectFilter === "All" || exam.subject === subjectFilter)
    );
  });

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col sm={6} style={{ margin: "10px", marginBottom: "0px" }}>
            <h2 style={{}}>Scheduled Lectures</h2>
          </Col>
        </Row>{" "}
        <Row>
          <Col sm={4}>
            <span style={{ marginLeft: 15 }}>Class: </span>
            <select
              className="selectContainer"
              style={{ width: 200 }}
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <SubjectOption className="selectOption" value="All">
                All
              </SubjectOption>
              <SubjectOption value="O1">O1</SubjectOption>
              <SubjectOption value="O2">O2</SubjectOption>
              <SubjectOption value="AS">AS</SubjectOption>
              <SubjectOption value="A2">A2</SubjectOption>
            </select>
          </Col>
          <Col sm={4} style={{ marginLeft: 5 }}>
            <span>Subject: </span>

            <select
              className="selectContainer"
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
            </select>
          </Col>
        </Row>
        <div className="divider"></div>
        <Table columns={columns} dataSource={filteredExams} className="mt-2" />
      </Wrapper>
    </Container>
  );
}

export default ListOfLectures;
