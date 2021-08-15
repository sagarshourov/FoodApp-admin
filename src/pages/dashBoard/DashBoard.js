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

import { messageKeys } from "../../common/messageKeys";

import Product from "../Product/index";

import Home from "../Home/index";
import Category from "../Category/index";
import Outlate from "../Outlate/index";

import Menu from "../Menu/index";

import Order from "../Orders/index";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { urlend: props.match.params.url };
  }

  componentDidMount() {
    // window.history.pushState(null, null, '/')
    document.title = "Food App | Admin panel";
    // this.props.getLocalizedMessages(messageKeys);
    //  this.props.getUserSettings();
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <>
        <Container fluid={true}>
          <Row>
            <Col xl={2} lg={2} sm={2} xs={2}>
              <Row>
                <Sidebar>
                  <Title>Food APP</Title>
                  <A href="/db/home">Dashboard</A>
                  <A href="/db/product"> Products</A>
                  <A href="/db/menu">Menus</A>
                  <A href="/db/category">Category</A>
                  <A href="/db/orders">Orders</A>
                  <A href="/db/outlate">Outlates</A>
                  <A href="/db/user">Users</A>
                </Sidebar>
              </Row>
            </Col>
            <Col xl={10} lg={10} sm={10} xs={10}>
              <Row>
                {this.state.urlend === "home" && <Home />}
                {this.state.urlend === "product" && <Product />}
                {this.state.urlend === "category" && <Category />}
                {this.state.urlend === "menu" && <Menu />}
                {this.state.urlend === "orders" && <Order />}
                {this.state.urlend === "outlate" && <Outlate />}

                {this.state.urlend === "alljob" && (
                  <>
                    <Col xl={12} lg={12} sm={12} xs={12}>
                      <SubTitle>All job</SubTitle>
                      <Table>
                        <thead>
                          <tr>
                            <th> Job name </th>
                            <th> Payment </th>
                            <th> Success % </th>
                            <th> Done</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              TTV-YouTube: Watch + Like + Comment + Subscribe
                            </td>
                            <td>$0.075</td>
                            <td>65</td>
                            <td>25/50</td>
                            <td>+</td>
                          </tr>
                          <tr>
                            <td>
                              TTV-YouTube: Watch + Like + Comment + Subscribe
                            </td>
                            <td>$0.075</td>
                            <td>65</td>
                            <td>25/50</td>
                            <td>+</td>
                          </tr>
                          <tr>
                            <td>
                              TTV-YouTube: Watch + Like + Comment + Subscribe
                            </td>
                            <td>$0.075</td>
                            <td>65</td>
                            <td>25/50</td>
                            <td>+</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ message: state.message });

export default connect(mapStateToProps, {
  getLocalizedMessages,
  getUserSettings,
})(Dashboard);

const Sidebar = styled.div`
  height: calc(100vh);
  background-color: #f2f3f5;
  background-image: linear-gradient(#33728e, #60479c, #955e36);
  padding: 0;
  margin: 0;
  width: 100%;

  h1 {
    padding: 0;
    margin: 0;
    color: ${(p) => p.theme.white};
  }
`;
