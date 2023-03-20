import React from "react";
import styled from "styled-components";
import Header from "../../home/Header";
// import { Form, FormControl, Button } from "react-bootstrap";
import { Col, Form, Input, Row, Select, Button, message } from "antd";
import { addExam } from "../../../apiCalls/exams";
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

const AddExam = () => {
  const onFinish = async (values) => {
    try {
      let response;

      response = await addExam(values);
      if (response.success) {
        message.success(response.message);
        window.location.href = "/mcqexams";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Container>
      <Header />
      <Heading>
        <HeadingText>
          CIE Multiple Choice Question Papers - Add Exam
        </HeadingText>
      </Heading>
      <Wrapper>
        <Form layout="vertical" onFinish={onFinish}>
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
                  <Select.Option value="Accounting">Accounting</Select.Option>
                  <Select.Option value="Business">Business</Select.Option>
                  <Select.Option value="Biology">Biology</Select.Option>
                  <Select.Option value="Chemistry">Chemistry</Select.Option>
                  <Select.Option value="Economics">Economics</Select.Option>
                  <Select.Option value="English">English</Select.Option>
                  <Select.Option value="Mathematics">Mathematics</Select.Option>
                  <Select.Option value="Physics">Physics</Select.Option>
                  <Select.Option value="Psychology">Psychology</Select.Option>
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
            href="/mcqexams"
          >
            Cancel
          </Button>
          <Button type="primary" size="large" htmlType="submit">
            Save
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AddExam;
