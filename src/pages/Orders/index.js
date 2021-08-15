import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { Table } from "./Table";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { getOrders } from "../../actions/orderActions";

import EditModel from "./editModel";

import NewModel from "./newModel";

const Order = (props) => {
  const [load, setLoad] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [newmodalIsOpen, setNewmodalIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    if (!props.loading && props.orders && loading) {
      console.log(props);
      setOrders(props.orders.data);
      setLoading(false);
    }
    if (!load) {
      props.getOrders();
      setLoad(true);
      setLoading(true);
    }
  }, [load, loading, props]);

  const editModel = (data) => {
    console.log(data);
    setIsOpen(true);
    setModelData(data);
  };
  const viewModel = (data) => {
    console.log(data);
    setNewmodalIsOpen(true);
    setModelData(data);
  };
  const renderProduct = () => {
    let html = [];

    if (orders && Object.keys(orders).length > 0) {
      Object.keys(orders).forEach(function (key) {
        html.push(
          <tr key={key}>
            <td>{orders[key].id}</td>

            <td>{orders[key].status ? orders[key].status : "In progress"}</td>
            <td>
              <Button onClick={() => viewModel(orders[key])}>View</Button>
            </td>
            <td>
              <Button
                onClick={() => editModel(orders[key])}
                color="#5a6268"
                hcolor="#545b62"
              >
                Edit
              </Button>
            </td>
            <td>
              <Button color="#c82333" hcolor="#c82333">
                Delete
              </Button>
            </td>
          </tr>
        );
      });
    }
    //  console.log(menus);

    return html;
  };
  const closeModel = () => {
    setIsOpen(false);
  };
  const closeNewModel = () => {
    setNewmodalIsOpen(false);
  };

  return (
    <>
      {modelData && (
        <EditModel
          data={modelData}
          isOpen={modalIsOpen}
          setOrders={setOrders}
          closeModel={() => closeModel(false)}
        />
      )}
      <NewModel
        data={modelData}
        isOpen={newmodalIsOpen}
        closeModel={closeNewModel}
      />
      <Container className="mt-5">
        <Col xl={12} lg={12} sm={12} xs={12}>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th> #id </th>
                  <th> Status </th>
                  <th> View Order</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>{renderProduct()}</tbody>
            </Table>
          </Row>
        </Col>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { getOrders })(Order)
);
