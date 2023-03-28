import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { subscriptions } from "../../apiCalls/subs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Caro = () => {
  const { user } = useSelector((state) => state.users);
  const history = useHistory();

  const subscriptionAccessTheory = async () => {
    const response = await subscriptions({ userId: user.id });
    if (response === "Standard") {
      history.push("/theorypapers");
    } else if (response === "Basic") {
      history.push("/theorypapers");
    } else if (response === "Premium") {
      history.push("/theorypapers");
    } else {
      history.push("/paymentplans");
    }
  };
  return (
    <Carousel variant="light">
      <Carousel.Item interval={2000}>
        <img
          className="d-flex  carouselimg"
          src="https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="First slide"
        />
        <Carousel.Caption>
          <h1 className="sliderHeading">MCQ PAPERS</h1>
          <p className="sliderP">
            Past papers practice for Cambridge Mcq Exams
          </p>
          <Link
            to="/mcqpapers"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button
              style={{ marginBottom: 30 }}
              className="sliderB"
              variant="light"
            >
              MCQ Papers
            </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-flex  carouselimg"
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="sliderHeading">THEORY PAPERS</h3>
          <p className="sliderP">
            Past papers practice for Cambridge Theory Exams
          </p>

          <Button
            onClick={() => {
              subscriptionAccessTheory();
            }}
            style={{ marginBottom: 30 }}
            className="sliderB"
            variant="light"
          >
            Theory Papers
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-flex  carouselimg"
          src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="sliderHeading">REPORTS</h3>
          <p className="sliderP">View your Exam Reports</p>
          <Link
            to="/reports"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button
              style={{ marginBottom: 30 }}
              className="sliderB"
              variant="light"
            >
              Reports
            </Button>{" "}
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Caro;
