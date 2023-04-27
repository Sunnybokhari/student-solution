import React, { useState } from "react";
import { message } from "antd";
import { useEffect } from "react";
import moment from "moment";
import Header from "../home/Header";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "../../apiCalls/teachers";
import styled from "styled-components";
import { addDoc } from "firebase/firestore";
import { meetingsRef } from "../../apiCalls/firebase";
import {
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from "@elastic/eui";
import CreateMeetingButtons from "./FormComponents/CreateMeetingButtons";
import MeetingDateField from "./FormComponents/MeetingDateField";
import MeetingMaximumUsersField from "./FormComponents/MeetingMaximumUsersField";
import MeetingNameField from "./FormComponents/MeetingNameFIeld";
import { generateMeetingId } from "./FormComponents/generateMeetingId";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { DatePicker, Space, Form } from "antd";

const Container = styled.div`
  background-color: whitesmoke;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 400px;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  margin-bottom: 100px;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const ScheduleLecture = () => {
  const [meetingName, setMeetingName] = useState("");
  const [startDate, setStartDate] = useState(moment());
  const [startTime, setStartTime] = useState();
  const [size, setSize] = useState(50);
  const history = useHistory();
  const [teacherData, setTeacherData] = React.useState();
  const format = "HH:mm";

  const getUserData = async () => {
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

  const onChangeDate = (date, dateString) => {
    setStartDate(moment(dateString));
  };

  const onChangeTime = (time) => {
    setStartTime(time);
  };

  const [showErrors, setShowErrors] = useState({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUsers: {
      show: false,
      message: [],
    },
  });

  const [anyoneCanJoin, setAnyoneCanJoin] = useState(true);
  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;

    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };
  useEffect(() => {
    getUserData();
  }, []);
  const createMeeting = async (values) => {
    const meetingId = generateMeetingId();
    console.log(meetingsRef);
    await addDoc(meetingsRef, {
      createdBy: teacherData._id,
      creatorName: teacherData.name,
      subject: teacherData.subject,
      class: teacherData.class,
      school: teacherData.school,
      meetingId,
      meetingName,
      meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
      meetingDate: startDate.format("L"),
      meetingTime: startTime.format("HH:mm"),
      maxUsers: size,
      status: "active",
    });
    history.push("/listlectures");
  };

  console.log(startDate);
  return (
    <Container>
      <Header />
      <Wrapper>
        <h2 style={{ padding: "10px" }}>Create Lecture</h2>
        <Form
          name="normal_login"
          className=""
          style={{ padding: "10px" }}
          layout="vertical"
          onFinish={createMeeting}
        >
          <Form.Item className="" name="meetingName" label="Lecture name">
            <input
              className=" forminput"
              placeholder="Lecture name"
              type="text"
              onChange={(e) => setMeetingName(e.target.value)}
            />
          </Form.Item>

          <div style={{ display: "flex" }}>
            <div>
              <span>Select Date</span>
              <Space direction="vertical">
                <DatePicker onChange={onChangeDate} />
              </Space>
            </div>
            <div>
              <span>Select Time</span>
              <TimePicker
                onChange={onChangeTime}
                defaultValue={dayjs("00:00", format)}
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
                history.push("/listlectures");
              }}
              block
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button
              classname="formB"
              type="primary"
              size="large"
              htmlType="submit"
              block
            >
              Create
            </Button>
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ScheduleLecture;
