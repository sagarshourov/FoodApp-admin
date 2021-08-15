import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { Table } from "./Table";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import {
  addCategory,
  deleteCat,
  getCategory,
} from "../../actions/categoryActions";
import EditModel from "./editModel";
import NewModel from "./newModel";
const Category = (props) => {
  const [load, setLoad] = useState(false);
  const [delload, setDelLoad] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [modelData, setModelData] = useState(null);
  const [newOpen, setNewOpen] = useState(false);

  useEffect(() => {
    if (
      !props.loading &&
      props.category &&
      props.category.category &&
      loading
    ) {
      setCategory(props.category.category.data);
      setLoading(false);
    }

    if(props.del_cat && !props.del_cat.loading && delload ){
      setCategory(props.del_cat.data);
      setDelLoad(false);
      window.location.reload();
    }

    if (!load) {
      props.getCategory();
      setLoad(true);
      setLoading(true);
    }
  }, [delload, load, loading, props]);

  const editModel = (data) => {
    console.log(data);
    setIsOpen(true);
    setModelData(data);
  };

  const deleteCat = (id) => {
    props.deleteCat(id);
    setDelLoad(true);
  };

  const renderCategory = () => {
    let html = [];

    if (category && Object.keys(category).length > 0) {
      Object.keys(category).forEach(function (key) {
        html.push(
          <tr key={key}>
            <td>{category[key].name}</td>

            <td>
              <Button
                onClick={() => editModel(category[key])}
                color="#5a6268"
                hcolor="#545b62"
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                onClick={() => deleteCat(category[key].id)}
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
    setIsOpen(false);
  };

  return (
    <>
      <EditModel
        data={modelData}
        isOpen={modalIsOpen}
        closeModel={closeModel}
      />

      <NewModel isOpen={newOpen} closeModel={() => setNewOpen(false)} />

      <Container className="mt-5">
        <Row>
          <Col xl={9}></Col>
          <Col xl={3}>
            <Button
              className="pull-right my-1"
              onClick={() => setNewOpen(true)}
            >
              Add new Category
            </Button>
          </Col>
        </Row>
        <Col xl={12} lg={12} sm={12} xs={12}>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th> Category Name </th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>{renderCategory()}</tbody>
            </Table>
          </Row>
        </Col>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  category: state.category,
  loading: state.category.loading,
  del_cat: state.category.del_cat,
});

export default withTranslation()(
  connect(mapStateToProps, { getCategory, deleteCat, addCategory })(Category)
);
