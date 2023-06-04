import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
// import Form from "react-bootstrap/Form";
import { registerUser } from "../apiCalls/teachers";
import { Button, Form, message, Select } from "antd";
import Header from "../components/home/Header";

const Wrapper = styled.div`
  background-color: whitesmoke;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  overflow: auto;
  padding-bottom: 100px;
`;

const Container = styled.div`
  width: 60%;
  height: 1000px;
  margin: auto;
  margin-top: 100px;
  border-radius: 25px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  display: flex;
  background-color: white;
`;

const Heading = styled.h1`
  font-weight: bold;
  padding-left: 100px;
  padding-top: 50px;
  color: #1e88e5;
`;
const FormInput = () => {
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);

      if (response.success) {
        message.success(response.message);
        window.location.href = "/manageteachers";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <Row className=".d-flex align-items-center justify-content-center">
          <Col sm={6}>
            <Heading>Teacher Sign Up</Heading>

            <Form
              name="normal_login"
              className="login-form formI"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item className="" name="name" size="large" label="Name">
                <input
                  type="text"
                  className="site-form-item-icon forminput"
                  placeholder="Name"
                />
              </Form.Item>
              <Form.Item className="" name="email" label="Email">
                <input
                  type="email"
                  className="site-form-item-icon forminput"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item className="" name="password" label="Password">
                <input
                  type="password"
                  className="site-form-item-icon forminput"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item className="" name="subject" label="Subject">
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
              <Form.Item className="" name="class" label="Class">
                <Select>
                  <Select.Option value="O1">O1 Level</Select.Option>
                  <Select.Option value="O2">O2 Level</Select.Option>
                  <Select.Option value="AS">AS Level</Select.Option>
                  <Select.Option value="A2">A2 Level</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className="" name="years" label="Years of Experiance">
                <input
                  type="number"
                  className="site-form-item-icon forminput"
                  placeholder="Year"
                />
              </Form.Item>
              <Form.Item className="" name="school" label="Current School">
                <input
                  type="text"
                  className="site-form-item-icon forminput"
                  placeholder="Current School"
                />
              </Form.Item>

              <div className="flex flex-col gap-2 ">
                <Button
                  classname="formB"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                >
                  Register
                </Button>
              </div>
            </Form>
          </Col>
          <Col
            sm={6}
            className=".d-flex align-items-center justify-content-center"
          >
            <img
              alt="student at desk"
              className="formImg"
              src="https://img.freepik.com/premium-vector/man-with-laptop-studying-working-concept_113065-167.jpg?w=2000"
            ></img>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default FormInput;
