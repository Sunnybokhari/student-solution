import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../../home/Header";
// import { Form, FormControl, Button } from "react-bootstrap";
import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Button,
  message,
  Tabs,
  Table,
} from "antd";

import {
  editExamById,
  getExamById,
  addExam,
  deleteQuestionById,
} from "../../../apiCalls/theoryExams";
import { useParams } from "react-router-dom";
import AddEditQuestion from "./AddEditQuestionsT";
const { TabPane } = Tabs;

const Container = styled.div`
  background-color: whitesmoke;
`;

const Wrapper = styled.div`
  width: 70%;
  margin: auto;
  background-color: white;
  margin-bottom: 100px;
  border-radius: 15px;
  padding: 15px;
`;

const Heading = styled.h1`
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid gray;
  line-height: 0px;
  margin-bottom: 100px;
  text-decoration: none;
  padding-top: 100px;
`;
const HeadingText = styled.span`
  background-color: whitesmoke;
  padding: 20px 40px;
  font-weight: lighter;
`;

const EditExam = () => {
  const [examData, setExamData] = React.useState(null);
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const params = useParams();

  const onFinish = async (values) => {
    try {
      let response;

      if (params.id) {
        response = await editExamById({
          ...values,
          examId: params.id,
        });
      } else {
        response = await addExam(values);
      }
      if (response.success) {
        message.success(response.message);
        window.location.href = "/theoryexams";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getExamData = async () => {
    try {
      const response = await getExamById({
        examId: params.id,
      });
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  const deleteQuestion = async (questionId) => {
    try {
      const response = await deleteQuestionById({
        questionId,
        examId: params.id,
      });
      if (response.success) {
        message.success(response.message);
        getExamData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "name",
    },
    {
      title: "Correct Option",
      dataIndex: "correctOption",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          {/* <Button
            className="margin-right-10"
            type="primary"
            size="sm"
            onClick={() => {
              setSelectedQuestion(record);
              setShowAddEditQuestionModal(true);
            }}
          >
            Edit
          </Button> */}
          <Button
            className="primary"
            size="sm"
            type="primary"
            danger
            onClick={() => {
              deleteQuestion(record._id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <Header />
      <Heading>
        <HeadingText>CIE Theory Question Papers - Edit Exam</HeadingText>
      </Heading>
      <Wrapper>
        {(examData || !params.id) && (
          <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Exam Details" key="1">
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item label="Class" name="class">
                      <Select>
                        <Select.Option value="O1">O1 Level</Select.Option>
                        <Select.Option value="O2">O2 Level</Select.Option>
                        <Select.Option value="AS">AS Level</Select.Option>
                        <Select.Option value="A2">A2 Level</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Subject" name="subject">
                      <Select>
                        <Select.Option value="Accounting">
                          Accounting
                        </Select.Option>
                        <Select.Option value="Business">Business</Select.Option>
                        <Select.Option value="Biology">Biology</Select.Option>
                        <Select.Option value="Chemistry">
                          Chemistry
                        </Select.Option>
                        <Select.Option value="Economics">
                          Economics
                        </Select.Option>
                        <Select.Option value="English">English</Select.Option>
                        <Select.Option value="Mathematics">
                          Mathematics
                        </Select.Option>
                        <Select.Option value="Physics">Physics</Select.Option>
                        <Select.Option value="Psychology">
                          Psychology
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Year" name="year">
                      <Input type="string" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Exam Name" name="name">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Total Marks" name="totalMarks">
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Time Limit" name="timeLimit">
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Button
                  className="margin-10"
                  type="primary"
                  danger
                  size="large"
                  href="/theoryexams"
                >
                  Cancel
                </Button>
                <Button type="primary" size="large" htmlType="submit">
                  Save
                </Button>
              </TabPane>
              {params.id && (
                <TabPane tab="Questions" key="2">
                  <Button
                    type="primary"
                    onClick={() => setShowAddEditQuestionModal(true)}
                  >
                    Add Question
                  </Button>
                  <Table
                    columns={questionsColumns}
                    dataSource={examData?.questions || []}
                  />
                </TabPane>
              )}
            </Tabs>
          </Form>
        )}
      </Wrapper>
      {showAddEditQuestionModal && (
        <AddEditQuestion
          setShowAddEditQuestionModal={setShowAddEditQuestionModal}
          showAddEditQuestionModal={showAddEditQuestionModal}
          examId={params.id}
          refreshData={getExamData}
          // selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </Container>
  );
};

export default EditExam;
