import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import { message, Tabs, Form, Input, Table, Select } from "antd";
import styled from "styled-components";
import {
  addPreference,
  getUserInfo,
  updateUser,
  removePreference,
} from "../apiCalls/users";
import { Row, Col, Button } from "react-bootstrap";
import moment from "moment";
import { getAllUsers } from "../apiCalls/teachers";
import { subscriptions } from "../apiCalls/subs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "../components/home/Footer";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
const { TabPane } = Tabs;

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 100;
  width: 70%;
  margin: auto;
  align-items: center;
  margin-bottom: 200px;
`;

const SubjectOption = styled.option`
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  border: solid 1px gray;
  margin: 0px 5px;
  width: 150px;
  cursor: pointer;
  &:hover {
    background-color: darkgrey;
  }
`;

const Profile = () => {
  const [userData, setUserData] = React.useState(null);
  const [teachersData, setTeachersData] = React.useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const subscriptionAccessTheory = async () => {
    const response = await subscriptions({ userId: user.id });
    if (response === "") {
      history.push("/paymentplans");
    }
  };

  const columns = [
    {
      title: "Teacher Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },

    {
      title: "Class",
      dataIndex: "class",
    },
    {
      title: "Years of Experiance",
      dataIndex: "years",
    },
    {
      title: "Current School",
      dataIndex: "school",
    },
    {
      title: "Date joined",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            className="primary me-2"
            size="sm"
            onClick={() => {
              subscriptionAccessTheory();
              setPreference(record.email);
            }}
          >
            Set Preferrence
          </Button>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            className="primary me-2"
            size="sm"
            variant="danger"
            onClick={() => removeUserPreference(record.email)}
          >
            Remove Preferrence
          </Button>
        </div>
      ),
    },
  ];

  const onFinish = async () => {
    try {
      const response = await getUserInfo();

      if (response.success) {
        message.success(response.message);
        setUserData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getTeachers = async (tempFilters) => {
    try {
      const response = await getAllUsers(tempFilters);
      if (response.success) {
        setTeachersData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    onFinish();
    getTeachers();
  }, []);

  const editUser = async (values) => {
    const response = await updateUser(values);

    if (response.success) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  const setPreference = async (teacherId) => {
    const response = await addPreference({ preference: teacherId });
    if (response.success) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };
  const removeUserPreference = async (teacherId) => {
    const response = await removePreference({ preference: teacherId });
    if (response.success) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  const [classFilter, setClassFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const filteredExams = teachersData.filter((exam) => {
    return (
      (classFilter === "All" || exam.class === classFilter) &&
      (subjectFilter === "All" || exam.subject === subjectFilter)
    );
  });
  return (
    <Container>
      <Navbar />
      <div style={{ height: 20 }}></div>

      <Wrapper>
        <Breadcrumb
          style={{ color: "black" }}
          items={[
            {
              href: "",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: (
                <>
                  <UserOutlined />
                  <span>Application List</span>
                </>
              ),
            },
            {
              title: "Application",
            },
          ]}
        />
        <Breadcrumb separator=">" style={{ margin: "10px 0px" }}>
          <Breadcrumb.Item>
            <HomeOutlined /> Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {" "}
            <UserOutlined />
            Teacher Preferences
          </Breadcrumb.Item>
        </Breadcrumb>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Teacher Preferences" key="1">
            <Row className="pt-2 pb-2">
              <Col sm={3}>
                <span style={{ marginLeft: 15 }}>Class: </span>
                <select
                  className="selectOption"
                  style={{ width: 200 }}
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                >
                  <SubjectOption value="All">All</SubjectOption>
                  <SubjectOption value="O1">O1</SubjectOption>
                  <SubjectOption value="O2">O2</SubjectOption>
                  <SubjectOption value="AS">AS</SubjectOption>
                  <SubjectOption value="A2">A2</SubjectOption>
                  {/* Add options for other classes as needed */}
                </select>
              </Col>
              <Col sm={3} style={{ marginLeft: 5 }}>
                <span>Subject: </span>

                <select
                  className="selectOption"
                  style={{ width: 200 }}
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  <SubjectOption value="All">All</SubjectOption>
                  <SubjectOption value="Accounting">Accounting</SubjectOption>
                  <SubjectOption value="Business">Business</SubjectOption>
                  <SubjectOption value="Biology">Biology</SubjectOption>
                  <SubjectOption value="Chemistry">Chemistry</SubjectOption>
                  <SubjectOption value="Economics">Economics</SubjectOption>
                  <SubjectOption value="English">English</SubjectOption>
                  <SubjectOption value="Mathematics">Mathematics</SubjectOption>
                  <SubjectOption value="Physics">Physics</SubjectOption>
                  <SubjectOption value="Psychology">Psychology</SubjectOption>

                  {/* Add options for other classes as needed */}
                </select>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={filteredExams}
              className="mt-2"
            />
          </TabPane>
        </Tabs>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Profile;
