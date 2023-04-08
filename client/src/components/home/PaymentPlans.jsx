import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { getPrices, session } from "../../apiCalls/subs";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { mobile, desktop } from "../../responsive";

const Container = styled.div`
  margin-top: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  background-color: #5882ff;
  color: white;
  padding-bottom: 100px;
  padding-top: 30px;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const Heading = styled.div`
  margin-top: 20px;
  display: block;
  text-align: center;
  font-weight: bold;
  margin-bottom: 60px;
`;

const Plan = styled.div`
  display: block;
  width: 30%;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 30px;
  color: black;
  margin-right: 60px;
  border-radius: 15px;
  padding-bottom: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.595);
`;

const PaymentPlans = () => {
  const [prices, setPrices] = React.useState([]);
  const { user } = useSelector((state) => state.users);
  const history = useHistory();

  const fetchPrices = async () => {
    const response = await getPrices();
    setPrices(response.data);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const onFinish = async (value) => {
    const response = await session({ userId: user.id, priceId: value });
    console.log(response);
    window.location.href = response.url;
  };
  return (
    <Container>
      <Heading>
        <h1>Payment Plans</h1>
        <p>AFFORDABLE PACKAGES</p>
      </Heading>
      <Wrapper>
        <Plan>
          <h1 className="planH">{prices[3]?.nickname}</h1>
          <span className="planPrice">
            <span className="priceS">PKR</span>
            {prices[3]?.unit_amount / 100}
            <span className="priceSs">/mon</span>
          </span>
          <div>
            <ul className="planL">
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
            </ul>
          </div>
          <Button
            // className="planB btn-lg"
            variant="outline-primary"
            onClick={() => {
              onFinish("price_1MicP9IVcmWXjYBzGHwKsZbn");
            }}
          >
            Get Started
          </Button>{" "}
        </Plan>
        <Plan>
          <h1 className="planH">{prices[2]?.nickname}</h1>
          <span className="planPrice">
            <span className="priceS">PKR</span>
            {prices[2]?.unit_amount / 100}
            <span className="priceSs">/mon</span>
          </span>
          <div>
            <ul className="planL">
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
            </ul>
          </div>
          <Button
            // className="planB btn-lg"
            variant="outline-primary"
            onClick={() => {
              onFinish("price_1MicQgIVcmWXjYBzI0c5QiX3");
            }}
          >
            Get Started
          </Button>{" "}
        </Plan>
        <Plan>
          <h1 className="planH">{prices[1]?.nickname}</h1>
          <span className="planPrice">
            <span className="priceS">PKR</span>
            {prices[1]?.unit_amount / 100}
            <span className="priceSs">/mon</span>
          </span>
          <div>
            <ul className="planL">
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
            </ul>
          </div>
          <Button
            // className="planB btn-lg"
            variant="outline-primary"
            onClick={() => {
              onFinish("price_1MicRlIVcmWXjYBzWJ477kGH");
              // onFinish("price_1Ml6WCIVcmWXjYBzk2BaUDH3");
            }}
          >
            Get Started
          </Button>{" "}
        </Plan>
      </Wrapper>
    </Container>
  );
};

export default PaymentPlans;
