import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { Table } from "./Table";

import Modal from "react-modal";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import NewModel from "./NewModel";

import { getCategory } from "../../actions/categoryActions";
import { getMenus } from "../../actions/menuActions";

const Menus = (props) => {
  const [load, setLoad] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    console.log(props);
    // category props

    if (!props.loading && props.category) {
      console.log(props.category);
      setCategory(props.category);
    }

    Modal.setAppElement("body");

    if (!load) {
      props.getCategory();
      props.getMenus();
      setLoad(true);
    }
  }, [load, props]);

  const addMenu = () => {
    setAddModal(true);
  };
  const closeAddMenu = () => {
    setAddModal(false);
  };




  return (
    <>
     { category && <NewModel category={category.data} isOpen={addModal} closeModel={closeAddMenu} /> }
      <Container className="mt-5">
        <Row>
          <Col xl={9}></Col>
          <Col xl={3}>
            <Button onClick={addMenu} className="pull-right my-1">
              Add new Menu
            </Button>
          </Col>
        </Row>
        <Col xl={12} lg={12} sm={12} xs={12}>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th> Image </th>
                  <th> Menu Name </th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="" />
                  </td>
                  <td>$0.075</td>

                  <td>
                    <Button color="#5a6268" hcolor="#545b62">
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button color="#c82333" hcolor="#c82333">
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export const Div = styled.div`
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: ${(props) => props.mb || "0"};
  padding-bottom: ${(props) => props.pb || "0"};
  padding-top: ${(props) => props.pt || "0"};
`;
const mapStateToProps = (state) => ({
  category: state.category.category,
  loading: state.category.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { getCategory, getMenus })(Menus)
);
