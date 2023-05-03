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
import { DatePicker, Space, Form } from "antd";
import { TimePicker } from "antd";
import dayjs from "dayjs";

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
        const sortedMeetings = myMeetings.sort((a, b) => {
          return new Date(b.meetingDate) - new Date(a.meetingDate);
        });
        setMeetings(sortedMeetings);
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
  const [size, setSize] = useState(50);
  const [status, setStatus] = useState();
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [startDate1, setStartDate1] = useState();
  const [startTime1, setStartTime1] = useState();
  const format = "HH:mm";

  const onChangeDate = (date, dateString) => {
    setStartDate(moment(dateString));
  };

  const onChangeTime = (time) => {
    setStartTime(time);
  };

  const updateMeeting = async () => {
    const editedMeeting = {
      ...editMeeting,
      meetingName,
      maxUsers: size,
      meetingDate: startDate.format("L"),
      meetingTime: startTime.format("HH:mm"),
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
              setStartTime(moment(record?.meetingTime, format));
              setStatus(record.status);
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
              {/* <EuiFlexGroup justifyContent="center" alignItems="center">
                <EuiForm>
                  <MeetingNameField
                    label="Meeting name"
                    placeholder="Meeting name"
                    value={meetingName}
                    setMeetingName={setMeetingName}
                  />


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
              </EuiFlexGroup> */}
              <Form
          name="normal_login"
          className=""
          style={{ padding: "10px" }}
          layout="vertical"
          initialValues={{
            meetingName: meetingName,
            date: startDate,
            time: startTime,
          }}
          onFinish={updateMeeting}
        >
          <Form.Item className="" name="meetingName" label="Lecture name">
            <input
            name="meetingName"
              className=" forminput"
              placeholder="Lecture name"
              // value={meetingName}
              type="text"
              onChange={(e) => setMeetingName(e.target.value)}
            />
          </Form.Item>

          <div style={{ display: "flex" }}>
            <div>
              <span>Select Date</span>
              <Space direction="vertical">
                <DatePicker name="date"   onChange={onChangeDate} />
              </Space>
            </div>
            <div>
              <span>Select Time</span>
              <TimePicker
              name="time"
                onChange={onChangeTime}
                // defaultValue={dayjs(startTime, format)}
                format={format}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "15px",
            }}
          >
            <Button
              classname="formB"
              variant="danger"
              size="large"
              onClick={() => {
                setStatus("canceled");
                updateMeeting();
              }}
              block
              style={{ marginRight: "10px" }}
            >
              Cancel Meeting
            </Button>
            <Button
              classname="formB"
              type="primary"
              size="large"
              htmlType="submit"
              block
            >
              Update
            </Button>
          </div>
        </Form>
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
