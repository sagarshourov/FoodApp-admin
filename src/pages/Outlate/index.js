import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { Table } from "./Table";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import {
  getOutlate,
  deleteOutlate,
  addOutlate,
} from "../../actions/outlateActions";
import EditModel from "./editModel";
import NewModel from "./newModel";
const Outlate = (props) => {
  const [load, setLoad] = useState(false);
  const [delload, setDelLoad] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [outlate, setOutlate] = useState(null);
  const [modelData, setModelData] = useState(null);
  const [newOpen, setNewOpen] = useState(false);

  useEffect(() => {
    console.log(props);
    if (!props.loading && props.outlates && loading) {
      setOutlate(props.outlates.data);
      setLoading(false);
    }

    if (props.del_outlate && !props.del_outlate.loading && delload) {
      setOutlate(props.del_outlate.data);
      setDelLoad(false);
      window.location.reload();
    }

    if (!load) {
      props.getOutlate();
      setLoad(true);
      setLoading(true);
    }
  }, [delload, load, loading, props]);

  const editModel = (data) => {
    console.log(data);
    setIsOpen(true);
    setModelData(data);
  };

  const deleteOut = (id) => {
    props.deleteOutlate(id);
    setDelLoad(true);
  };

  const renderOutlate = () => {
    let html = [];

    if (outlate && Object.keys(outlate).length > 0) {
      Object.keys(outlate).forEach(function (key) {
        html.push(
          <tr key={key}>
            <td>{outlate[key].name}</td>

            <td>
              <Button
                onClick={() => editModel(outlate[key])}
                color="#5a6268"
                hcolor="#545b62"
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                onClick={() => deleteOut(outlate[key].id)}
                color="#c82333"
                hcolor="#c82333"
              >
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
    setModelData(null);
    setIsOpen(false);
  };

  return (
    <>
      {modelData && (
        <EditModel
          data={modelData}
          isOpen={modalIsOpen}
          closeModel={closeModel}
        />
      )}

      <NewModel isOpen={newOpen} closeModel={() => setNewOpen(false)} />

      <Container className="mt-5">
        <Row>
          <Col xl={9}></Col>
          <Col xl={3}>
            <Button
              className="pull-right my-1"
              onClick={() => setNewOpen(true)}
            >
              Add new outlate
            </Button>
          </Col>
        </Row>
        <Col xl={12} lg={12} sm={12} xs={12}>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th> Outlate Name </th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>{renderOutlate()}</tbody>
            </Table>
          </Row>
        </Col>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  outlates: state.outlate.outlates,
  outlate: state.outlate.outlate,
  loading: state.outlate.loading,
  del_outlate: state.outlate.del_outlate,
});

export default withTranslation()(
  connect(mapStateToProps, { getOutlate, deleteOutlate, addOutlate })(Outlate)
);
