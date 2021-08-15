import React, { Component } from "react";

import styled from "styled-components/macro";

import { Row, Col, Container } from "styled-bootstrap-grid";

import { SubTitle } from "../../components/SubTitle";
import { Title } from "../../components/Title";
import { A } from "../../components/A";
import { Table } from "./Table";
import { StyleConstants } from "../../styles/StyleConstants";

import { PostNewJob } from "../PostNewJob/index";

import { connect } from "react-redux";
import { getLocalizedMessages } from "../../actions/localizedMessageActions";
import { getUserSettings } from "../../actions/userActions";
import { Card } from "../../components/Card";
import { messageKeys } from "../../common/messageKeys";
import { useParams } from "react-router-dom";
import { Product } from "../Product/index";

const Home = (props) => {
  return (
    <>
      <Col>
        <Card mt="5em">
          <Div className="card-header">
            <h1>Home</h1>
        
          </Div>
          <Div className="card-body" pb="5em" pt="2em">
            <Col xl={12} lg={12} sm={12} xs={12}></Col>
          </Div>
          <Div className="card-footer">
            <Row>
              <Col lg={6}> </Col>
              <Col lg={6}></Col>
            </Row>
          </Div>
        </Card>
      </Col>
    </>
  );
};
export const Div = styled.div`
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: ${(props) => props.mb || "0"};
  padding-bottom: ${(props) => props.pb || "0"};
  padding-top: ${(props) => props.pt || "0"};
`;
const mapStateToProps = (state) => ({ message: state.message });

export default connect(mapStateToProps, {
  getLocalizedMessages,
  getUserSettings,
})(Home);
