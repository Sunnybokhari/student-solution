import React from "react";
import { message, Modal, Table, Tabs } from "antd";
import { Button } from "react-bootstrap";
import { getAllReportsByUser } from "../../apiCalls/reports";
import {
  getAllReportsByUserT,
  getReportById,
} from "../../apiCalls/theoryReports";
import { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../home/Navbar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Footer from "../home/Footer";
import LineChart from "./charts/LineChart";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { UserData } from "./Data";

const { TabPane } = Tabs;

const Container = styled.div`
  background-color: whitesmoke;
`;

const Wrapper = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  margin-bottom: 100px;
  border-radius: 15px;
`;

function UserReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const [reportsDataT, setReportsDataT] = React.useState([]);
  const [selectedreportsDataT, setSelectedReportsDataT] = React.useState();
  const [selectedReport, setSelectedReport] = React.useState([]);
  const [reports = [], setReports] = React.useState([]);
  const [reportId, setReportId] = React.useState(null);
  const history = useHistory();

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => (
        <>
          {record.exam.class} {record.exam.subject} {record.exam.name}
          {", "}
          {record.exam.year}
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];
  const columnsT = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => (
        <>
          {record.exam.class} {record.exam.subject} {record.exam.name}
          {", "}
          {record.exam.year}
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainedMarks",
      render: (text, record) => <>{record.obtainedMarks}</>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            className="primary me-2"
            size="sm"
            onClick={() => history.push(`/theoryreport/${record._id}`)}
          >
            View Report
          </Button>
        </div>
      ),
    },
  ];
  const getData = async () => {
    try {
      const response = await getAllReportsByUser();
      if (response.success) {
        setReportsData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const getDataT = async () => {
    try {
      const response = await getAllReportsByUserT();
      if (response.success) {
        setReportsDataT(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    getDataT();
  }, []);
  console.log(reportsData[0]?.obtainedMarks);
  // const [userReport, setUserReport] = useState({
  //   labels: reportsData.map((data) => data?.createdAt),
  //   datasets: [
  //     {
  //       label: "Marks Obtained",
  //       data: reportsData.map((data) => data?.obtainedMarks),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });
  // const [userReport, setUserData] = useState({
  //   labels: UserData.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: "Users Gained",
  //       data: UserData.map((data) => data.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });
  // const labels = reportsData.map((data) => {
  //   // console.log(data.createdAt);
  //   return moment(data.createdAt).format("MMM D, YYYY");
  // });
  // const data = reportsData.map((data) => {
  //   // console.log(data.obtainedMarks);
  //   return data.obtainedMarks;
  // });

  // const [userReport, setUserReport] = useState({
  //   labels: UserData.map((data) => data.year),

  //   datasets: [
  //     {
  //       label: "Marks Obtained",
  //       data: reportsData.map((data) => data.obtainedMarks),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });
  const labels = reportsData
    .map((data) => moment(data.createdAt).format("MMM D, YYYY"))
    .reverse();
  const data = reportsData
    .map((data) => parseInt(data.obtainedMarks))
    .reverse();

  const [userReport, setUserReport] = useState({
    labels: labels,
    datasets: [
      {
        label: "MCQ Marks Obtained",
        data: data,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  useEffect(() => {
    setUserReport((prevState) => ({
      ...prevState,
      labels,
      datasets: [{ ...prevState.datasets[0], data }],
    }));
  }, [reportsData]);

  const labelsT = reportsDataT
    .map((data) => moment(data.createdAt).format("MMM D, YYYY"))
    .reverse();
  const dataT = reportsDataT
    .map((data) => parseInt(data.obtainedMarks))
    .reverse();

  const [userReportT, setUserReportT] = useState({
    labels: labelsT,
    datasets: [
      {
        label: "Theory Marks Obtained",
        data: dataT,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setUserReportT((prevState) => ({
      ...prevState,
      labels: labelsT,
      datasets: [{ ...prevState.datasets[0], data: dataT }],
    }));
  }, [reportsDataT]);

  console.log(userReportT);
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <h1 style={{ margin: 10 }}>Reports</h1>
        <Tabs style={{ marginLeft: 5 }} defaultActiveKey="1">
          <TabPane style={{ marginLeft: 0 }} tab="Mcq Exams" key="1">
            <Table columns={columns} dataSource={reportsData} />
          </TabPane>
          <TabPane tab="Theory Exams" key="2">
            <Table columns={columnsT} dataSource={reportsDataT} />
          </TabPane>
          <TabPane tab="Analytics" key="3">
            <div style={{ width: 700 }}>
              <Line data={userReport} />
            </div>
            <div style={{ width: 700 }}>
              <Line data={userReportT} />
            </div>
          </TabPane>
        </Tabs>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default UserReports;
