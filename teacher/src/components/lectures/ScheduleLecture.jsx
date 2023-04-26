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

const Container = styled.div`
  background-color: whitesmoke;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  margin-bottom: 100px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const ScheduleLecture = () => {
  const [meetingName, setMeetingName] = useState("");
  const [startDate, setStartDate] = useState(moment());
  const [size, setSize] = useState(1);
  // const { user } = useSelector((state) => state.users);
  const history = useHistory();
  const [teacherData, setTeacherData] = React.useState();

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
  const createMeeting = async () => {
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
      maxUsers: size,
      status: "active",
    });
    history.push("/listlectures");
  };

  return (
    <Container>
      <Header />
      <Wrapper>
        {" "}
        <EuiFlexGroup justifyContent="center" alignItems="center">
          <EuiForm>
            {/* <EuiFormRow
              display="columnCompressedSwitch"
              label="Anyone can Join"
            >
              <EuiSwitch
                showLabel={false}
                label="Anyone Can Join"
                checked={anyoneCanJoin}
                onChange={(e) => setAnyoneCanJoin(e.target.checked)}
                compressed
              />
            </EuiFormRow> */}

            <MeetingNameField
              label="Meeting name"
              // isInvalid={showErrors.meetingName.show}
              // error={showErrors.meetingName.message}
              placeholder="Meeting name"
              value={meetingName}
              setMeetingName={setMeetingName}
            />

            <MeetingMaximumUsersField value={size} setSize={setSize} />

            <MeetingDateField
              selected={startDate}
              setStartDate={setStartDate}
            />
            <EuiSpacer />
            <CreateMeetingButtons createMeeting={createMeeting} />
          </EuiForm>
        </EuiFlexGroup>
      </Wrapper>
    </Container>
  );
};

export default ScheduleLecture;
