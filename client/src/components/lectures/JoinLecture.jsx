import React, { useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { meetingsRef } from "../../apiCalls/firebase";
import { getUserInfo } from "../../apiCalls/users";
import { message } from "antd";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Navbar from "../home/Navbar";

const JoinLecture = () => {
  const params = useParams();
  const history = useHistory();
  const [teacherData, setTeacherData] = React.useState();
  const [isAllowed, setIsAllowed] = useState(false);

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
  useEffect(() => {
    getUserData();
  }, [teacherData]);

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id) {
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          // const isCreator = meeting.createdBy === teacherData._id;

          if (meeting.meetingDate === moment().format("L")) {
            setIsAllowed(true);
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            message.error("Meeting has ended.");
            history.push("/listlectures");
          } else if (moment(meeting.meetingDate).isAfter()) {
            message.error(`Meeting is on ${meeting.meetingDate}`);
            history.push("/listlectures");
          } else {
            history.push("/listlectures");
          }
        } else {
          setIsAllowed(true);
        }
      }
    };
    getMeetingData();
  }, [params.id]);

  const appId = 712084072;
  const serverSecret = "b97c987340b641606db06d1153442886";

  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      params.id,
      teacherData?._id,
      teacherData?.name
      // teacherData?._id ? teacherData._id : generateMeetingId(),
      // teacherData?.name ? teacherData.name : generateMeetingId()
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: "Personal link",
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };
  return isAllowed ? (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <div
          className="myCallContainer"
          ref={myMeeting}
          style={{ width: "100%", height: "100vh" }}
        ></div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default JoinLecture;
