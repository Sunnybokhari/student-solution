import React, { useCallback } from "react";
import styled from "styled-components";
import Header from "../components/home/Header";
import { getAllAttempts } from "../apiCalls/theoryAnswers";
import { getUserInfo } from "../apiCalls/teachers";
import { message } from "antd";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { firebaseDB } from "../apiCalls/firebase";
import { meetingsRef } from "../apiCalls/firebase";
import { getDocs, query, where } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
const Container = styled.div`
  background-color: whitesmoke;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 100px;
  padding-bottom: 100px;
  display: flex;
  justify-content: space-between;
`;

const HomeContainer = styled.div`
  width: 30%;
  height: 400px;
  padding-top: 5px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Headings = styled.div`
  text-align: center;
  justify-content: center;
  margin: auto;
  align-items: center;
  justify-items: center;
`;

const Circle = styled.div`
  display: flex;
  background-color: #007bff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 30%;
  cursor: pointer;
`;

const Home = () => {
  const [reportsData, setReportsData] = React.useState([]);
  const [teacherData, setTeacherData] = React.useState({ subject: "" });
  const [filteredExams, setFilteredExams] = React.useState([]);
  const [meetings, setMeetings] = React.useState([]);

  const navigate = useHistory();

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
  useEffect(() => {
    if (teacherData) getMyMeetings();
    console.log(meetings);
  }, [teacherData]);
  return (
    <Container>
      <Header />
      <Wrapper>
        <HomeContainer>
          <Headings>
            <h1
              onClick={() => navigate.push(`/listexams`)}
              style={{
                color: "#007bff",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              Grade Exams
            </h1>
            <Circle onClick={() => navigate.push(`/listexams`)}>
              <img
                width="60"
                height="60"
                src="https://img.icons8.com/external-prettycons-solid-prettycons/60/FFFFFF/external-exam-education-prettycons-solid-prettycons.png"
                alt="external-exam-education-prettycons-solid-prettycons"
              />
            </Circle>
            <h2>Pending Exams: {filteredExams.length}</h2>
            <h2>Graded Exams: {teacherData.gradedExams}</h2>
            <Button
              style={{ width: "120px", marginTop: "15px" }}
              onClick={() => navigate.push(`/listexams`)}
            >
              Grade
            </Button>
          </Headings>
        </HomeContainer>

        <HomeContainer>
          <Headings>
            <h1
              onClick={() => navigate.push(`/listlectures`)}
              style={{
                color: "#007bff",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              Lectures
            </h1>
            <Circle
              style={{ marginBottom: "40px" }}
              onClick={() => navigate.push(`/listlectures`)}
            >
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/classroom.png"
                alt="classroom"
              />
            </Circle>
            <h2>Total Lectures: {meetings.length}</h2>
            {/* <h2>Graded Exams: {teacherData.gradedExams}</h2> */}
            <Button
              style={{ width: "120px", marginTop: "20px" }}
              onClick={() => navigate.push(`/listlectures`)}
            >
              Schedule
            </Button>
          </Headings>
        </HomeContainer>

        <HomeContainer>
          <Headings>
            <h1
              onClick={() => navigate.push(`/home`)}
              style={{
                color: "#007bff",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              Wallet
            </h1>
            <Circle
              style={{ marginLeft: "35%" }}
              onClick={() => navigate.push(`/home`)}
            >
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/FFFFFF/external-wallet-man-accessories-kiranshastry-solid-kiranshastry.png"
                alt="external-wallet-man-accessories-kiranshastry-solid-kiranshastry"
              />
            </Circle>
            <h2>Graded Exams: {teacherData.gradedExams}</h2>
            <h2>
              Payout:
              {teacherData.gradedExams * 500}
              <span style={{ fontSize: "15px" }}>PKR</span>
            </h2>
            <Button
              style={{ width: "120px", marginTop: "15px" }}
              onClick={() => navigate.push(`/home`)}
            >
              Cash Out
            </Button>
          </Headings>
        </HomeContainer>
      </Wrapper>
    </Container>
  );
};

export default Home;
