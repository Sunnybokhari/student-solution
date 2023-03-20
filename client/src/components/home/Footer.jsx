import React from "react";
import styled from "styled-components";
import { Facebook } from "react-bootstrap-icons";
import { Google } from "react-bootstrap-icons";
import { Twitter } from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";
import { Telephone } from "react-bootstrap-icons";
import { Envelope } from "react-bootstrap-icons";

const Container = styled.div`
  display: flex;
  background-color: #3e3e3e;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  color: white;
`;

const Desc = styled.p`
  margin: 20px 0px;
  color: gray;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  color: white;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  color: gray;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: gray;
`;

const Payment = styled.img`
  width: 50%;
  height: 20px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>ABOUT US</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook size={25} />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Google size={25} />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter size={25} />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>

          <ListItem>O-Levels</ListItem>
          <ListItem>My Profile</ListItem>
          <ListItem>A-Levels</ListItem>
          <ListItem>About Us</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <GeoAlt size={20} /> Islamabad, Pakistan
        </ContactItem>
        <ContactItem>
          <Telephone size={20} />
          +1 234 56 78
        </ContactItem>
        <ContactItem>
          <Envelope size={20} />
          contact@SCANDAL.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
