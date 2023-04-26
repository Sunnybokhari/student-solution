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
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  margin-bottom: 100px;
  border-radius: 15px;
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
        setMeetings(myMeetings);
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
        <>{moment(record.meetingDate).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
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
              <Badge bg="success">
                <Link
                  to={`/join/${record.meetingId}`}
                  style={{ color: "black" }}
                >
                  Join Now
                </Link>
              </Badge>
            );
          } else if (moment(record.meetingDate).isBefore(moment())) {
            record.status = "ended";
            return <Badge bg="secondary">Ended</Badge>;
          } else if (moment(record.meetingDate).isAfter(moment())) {
            return <Badge bg="primary">Upcoming</Badge>;
          }
        } else if (record.status === "ended") {
          return <Badge bg="secondary">Ended</Badge>;
        } else {
          return <Badge bg="danger">Cancelled</Badge>;
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
        <div className="divider"></div>
        <Table columns={columns} dataSource={meetings} className="mt-2" />
      </Wrapper>
    </Container>
  );
}

export default ListOfLectures;
