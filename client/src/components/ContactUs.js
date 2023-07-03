import React from "react";
import { Card, Container } from "semantic-ui-react";

const ContactUs = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Card centered>
        <Card.Content className="our-contact">
          <Card.Header>Thanks for checking out Python Pages!</Card.Header>
          <Card.Description>
            <p>
              Please feel free to reach out to us for any inquiries or
              questions.
            </p>

            <p>Our GitHubs</p>
            <p>
              <a href="https://github.com/salvat36">
                https://github.com/salvat36
              </a>
            </p>
            <p>
              <a href="https://github.com/sturco42">
                https://github.com/sturco42
              </a>
            </p>
            <p>
              <a href="https://github.com/Chaospearl64">
              https://github.com/Chaospearl64
              </a>
            </p>
          </Card.Description>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default ContactUs;
