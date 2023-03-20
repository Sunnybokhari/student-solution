import React, { useState } from "react";
import { message, Table } from "antd";
import { getAllAttempts } from "../../apiCalls/theoryAnswers";
import { useEffect } from "react";
import moment from "moment";
import Header from "../home/Header";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "../../apiCalls/teachers";

function ListOfExams() {
  const [reportsData, setReportsData] = React.useState([]);
  const [teacherData, setTeacherData] = React.useState({ subject: "" });
  const [filteredExams, setFilteredExams] = React.useState([]);

  const history = useHistory();

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => (
        <>
          {record.exam.class} {record.exam.subject} {record.exam.name}
        </>
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user.name}</>,
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
            onClick={() => history.push(`/gradeexam/${record._id}`)}
          >
            Grade Exam
          </Button>
        </div>
      ),
    },
  ];

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

  // useEffect(() => {
  //   getData();
  //   getTeacherData();

  //   console.log(`teacherData._id: ${teacherData._id}`);
  //   reportsData.forEach((report) => {
  //     console.log(
  //       `preferences for "${report.examName}": ${report.preferences}`
  //     );
  //   });
  // }, []);

  // const filteredExams = reportsData.filter((exam) => {
  //   return (
  //     exam.exam.subject === teacherData.subject &&
  //     exam.preferences &&
  //     exam.preferences.includes(teacherData._id)
  //   );
  //   // return report.preferences.includes(teacherData._id);
  // });

  // useEffect(() => {
  //   getData();
  //   getTeacherData();
  // }, []);

  // const [filteredExams, setFilteredExams] = useState([]);

  // useEffect(() => {
  //   if (reportsData.length > 0 && teacherData._id) {
  //     const filteredExams = reportsData.filter((exam) => {
  //       return (
  //         exam.exam.subject === teacherData.subject &&
  //         exam.preferences &&
  //         exam.preferences.includes(teacherData._id)
  //       );
  //     });
  //     setFilteredExams(filteredExams);
  //   }
  // }, [reportsData, teacherData]);

  useEffect(() => {
    getData();
    getTeacherData();
  }, []);

  useEffect(() => {
    const filtered = reportsData.filter((exam) => {
      return (
        exam.exam.subject === teacherData.subject &&
        exam.preference &&
        exam.preference.includes(teacherData.email)
      );
    });

    setFilteredExams(filtered);
  }, [reportsData, teacherData]);

  return (
    <div>
      <Header />
      <h1>List of Exams</h1>
      <div className="divider"></div>

      <Table columns={columns} dataSource={filteredExams} className="mt-2" />
    </div>
  );
}

export default ListOfExams;
