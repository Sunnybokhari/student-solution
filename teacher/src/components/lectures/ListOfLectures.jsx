import React, { useState, useCallback } from "react";
import { message, Table } from "antd";
import { getAllAttempts } from "../../apiCalls/theoryAnswers";
import { useEffect } from "react";
import moment from "moment";
import Header from "../home/Header";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { getUserInfo } from "../../apiCalls/teachers";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { meetingsRef } from "../../apiCalls/firebase";
import { getDocs, query, where } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../apiCalls/firebase";
import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
// import { EuiBadge } from "@elastic/eui";
import Badge from "react-bootstrap/Badge";
import Offcanvas from "react-bootstrap/Offcanvas";
import MeetingDateField from "./FormComponents/MeetingDateField";
import MeetingMaximumUsersField from "./FormComponents/MeetingMaximumUsersField";
import MeetingNameField from "./FormComponents/MeetingNameFIeld";

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
  const [teacherData, setTeacherData] = React.useState({ subject: "" });
  const history = useHistory();
  const [meetings, setMeetings] = useState([]);

  // const getMyMeetings = useCallback(async () => {
  //   const firestoreQuery = query(
  //     meetingsRef,
  //     where("createdBy", "==", teacherData._id)
  //   );
  //   const fetchedMeetings = await getDocs(firestoreQuery);
  //   if (fetchedMeetings.docs.length) {
  //     const myMeetings = [];
  //     fetchedMeetings.forEach((meeting) => {
  //       myMeetings.push({
  //         docId: meeting.id,
  //         ...meeting.data(),
  //       });
  //     });
  //     setMeetings(myMeetings);
  //   }
  // }, [teacherData?._id]);
  const getMyMeetings = useCallback(async () => {
    if (teacherData?._id) {
      const firestoreQuery = query(
        meetingsRef,
        where("createdBy", "==", teacherData._id)
      );
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings = [];
        fetchedMeetings.forEach((meeting) => {
          myMeetings.push({
            docId: meeting.id,
            ...meeting.data(),
          });
        });
        setMeetings(myMeetings);
      }
    }
  }, [teacherData?._id]);

  const [editMeeting, setEditMeeting] = useState();

  const [show, setShow] = useState(false);

  const handleClose = (dataChanged = false) => {
    setShow(false);
    setEditMeeting(undefined);
    if (dataChanged) getMyMeetings();
  };
  const handleShow = (meeting) => {
    setShow(true);
    setEditMeeting(meeting);
  };

  const [meetingName, setMeetingName] = useState();
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState(editMeeting?.status || "active");
  const [startDate, setStartDate] = useState();

  const updateMeeting = async () => {
    const editedMeeting = {
      ...editMeeting,
      meetingName,
      maxUsers: size,
      meetingDate: startDate.format("L"),
      status: status,
    };
    delete editedMeeting.docId;
    const docRef = doc(firebaseDB, "meetings", editMeeting.docId);
    await updateDoc(docRef, editedMeeting);
    handleClose(true);
  };

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
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            variant="primary"
            onClick={() => {
              handleShow(record);
              setStartDate(moment(record?.meetingDate));
              setMeetingName(record.meetingName);
            }}
            disabled={record.status !== "active"}
          >
            Edit
          </Button>

          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Edit Lecture</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <EuiFlexGroup justifyContent="center" alignItems="center">
                <EuiForm>
                  <MeetingNameField
                    label="Meeting name"
                    placeholder="Meeting name"
                    value={meetingName}
                    setMeetingName={setMeetingName}
                  />

                  <MeetingMaximumUsersField value={size} setSize={setSize} />

                  <MeetingDateField
                    selected={startDate}
                    setStartDate={setStartDate}
                  />
                  <Button
                    style={{ marginTop: "7px" }}
                    variant="danger"
                    onClick={() => {
                      setStatus("canceled");
                      updateMeeting();
                    }}
                  >
                    Cancel Meeting
                  </Button>
                  <EuiSpacer />
                  <Button onClick={updateMeeting}>Update</Button>
                </EuiForm>
              </EuiFlexGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ),
    },
  ];

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
    getTeacherData();
  }, []);

  useEffect(() => {
    if (teacherData) getMyMeetings();
  }, [teacherData]);
  return (
    <Container>
      <Header />
      <Wrapper>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col sm={6} style={{ margin: "10px" }}>
            <h2 style={{}}>Scheduled Lectures</h2>
          </Col>
          <Col sm={2}>
            <Button style={{}} href="/schedulelecture">
              Add Lecture
            </Button>
          </Col>
        </Row>{" "}
        <div className="divider"></div>
        <Table columns={columns} dataSource={meetings} className="mt-2" />
      </Wrapper>
    </Container>
  );
}

export default ListOfLectures;
