import React, { useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { meetingsRef } from "../../apiCalls/firebase";
import { generateMeetingId } from "./FormComponents/generateMeetingId";
import { getUserInfo } from "../../apiCalls/teachers";
import { message } from "antd";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Header from "../home/Header";

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
  }, []);

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
          const isCreator = meeting.createdBy === teacherData._id;

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

  const appId = 2005541435;
  const serverSecret = "a55d3d4663a1126ab5d1683d16878b8a";

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
    console.log(kitToken);
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp?.joinRoom({
      container: element,
      maxUsers: 50,
      // showPreJoinView: false,
      showScreenSharingButton: true,
      sharedLinks: [
        {
          name: "Personal link",
          url: window.location.origin,
        },
      ],
      // scenario: {
      //   mode: ZegoUIKitPrebuilt.Live,
      // },
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: "Host",
        },
        resolution: {
          width: 1920,
          height: 1080,
        },
      },
      forceScreenSharing: true,
    });
  };
  //   return (
  //     <div>
  //       <Header />
  //       <div
  //         style={{
  //           display: "flex",
  //           height: "100vh",
  //           width: "100vw",
  //           flexDirection: "column",
  //         }}
  //       >
  //         <div
  //           className="myCallContainer"
  //           ref={myMeeting}
  //           style={{ width: "100%", height: "100%" }}
  //         ></div>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={myMeeting}
        ></div>
      </div>
    </div>
  );
};

export default JoinLecture;
