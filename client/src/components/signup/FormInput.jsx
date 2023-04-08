import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
// import Form from "react-bootstrap/Form";
import { registerUser } from "../../apiCalls/users";
import { Button, Form, message, Input } from "antd";
import { mobile, desktop } from "../../responsive";

const Container = styled.div`
  width: 60%;
  height: 600px;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
  border-radius: 25px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  display: flex;
  background-color: white;
  ${desktop({ width: "80%" })}
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
        window.location.href = "/login";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Container>
      <Row className=".d-flex align-items-center justify-content-center">
        <Col sm={6}>
          <Heading>Sign Up</Heading>

          <Form
            name="normal_login"
            className="login-form formI"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item className="" name="name" size="large" label="Name">
              <Input
                type="text"
                className="site-form-item-icon forminput"
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item className="" name="email" label="Email">
              <Input
                type="text"
                className="site-form-item-icon forminput"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item className="" name="password" label="Password">
              <Input
                type="password"
                className="site-form-item-icon forminput"
                placeholder="Password"
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
          <a href="/login" className="formL">
            Already Registered? Login
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default FormInput;
