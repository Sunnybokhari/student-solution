import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { loginUser } from "../../apiCalls/users";
import { Form, message, Button } from "antd";
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
const LoginInput = () => {
  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
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
          <Heading>Login</Heading>
          <Form
            name="normal_login"
            className="login-form formI"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item className="" name="email" label="Email">
              <input className=" forminput" placeholder="Email" type="text" />
            </Form.Item>
            <Form.Item className="" name="password" label="Password">
              <input
                className=" forminput"
                placeholder="Password"
                type="password"
              />
            </Form.Item>

            <div className="">
              <Button
                classname="formB"
                type="primary"
                size="large"
                htmlType="submit"
                block
              >
                Login
              </Button>
            </div>
          </Form>
        </Col>
        <Col
          sm={6}
          className=".d-flex align-items-center justify-content-center"
        >
          <img
            alt="student on desk"
            className="formImg"
            src="https://img.freepik.com/premium-vector/man-with-laptop-studying-working-concept_113065-167.jpg?w=2000"
          ></img>
          <a href="/signup" className="formL">
            Not Registered? Sign Up
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginInput;
