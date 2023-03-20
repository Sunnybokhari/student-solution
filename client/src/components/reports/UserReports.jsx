import React from "react";
import { message, Modal, Table, Tabs } from "antd";
import { Button } from "react-bootstrap";
import { getAllReportsByUser } from "../../apiCalls/reports";
import {
  getAllReportsByUserT,
  getReportById,
} from "../../apiCalls/theoryReports";
import { useEffect } from "react";
import moment from "moment";
import Navbar from "../home/Navbar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Footer from "../home/Footer";

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
        </Tabs>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default UserReports;
