import * as React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import { Row, Col, Container } from "styled-bootstrap-grid";
import { Card } from "../../components/Card";

import { ButtonCircle } from "../../components/ButtonCircle";

import { Button } from "../../components/Button";



import Input from "../../components/Input";

export function PostNewJob() {
  return (
    <>
      <Col>
        <Card mt="5em">
          <Div className="card-header">
            <h1>Post a new job</h1>
          </Div>
          <Div className="card-body" pb="5em" pt="2em">
            <Div className="steps-form" mb="2em">
              <Div className="steps-row setup-panel">
                <Div className="steps-step">
                  <ButtonCircle className="active">1</ButtonCircle>
                </Div>
                <Div className="steps-step">
                  <ButtonCircle>2</ButtonCircle>
                </Div>
              </Div>
            </Div>
            <Row>
              <Col lg={3}></Col>
              <Col lg={6}>
                <Input mt={"20px"} label="Post ID" textInfo="Information of subtitle" />
              </Col>
              <Col lg={3}></Col>
            </Row>
          </Div>
          <Div className="card-footer">
            <Row>
              <Col lg={6}> </Col>
              <Col lg={6}>
                <Button> Next </Button>
              </Col>
            </Row>
          </Div>
        </Card>
      </Col>
    </>
  );
}

export const Div = styled.div`
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: ${(props) => props.mb || "0"};
  padding-bottom: ${(props) => props.pb || "0"};
  padding-top: ${(props) => props.pt || "0"};
`;
