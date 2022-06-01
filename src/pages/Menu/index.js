import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { Table } from "./Table";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { addMenu, getMenus, deleteMenu } from "../../actions/menuActions";
import EditModel from "./editModel";
import NewModel from "./newModel";
const URL = process.env.REACT_APP_API_BASE_URL;

const IMGURL = process.env.REACT_APP_API_BASE_IMG;

const Menu = (props) => {
  const [load, setLoad] = useState(false);
  const [delLoad, setDelLoad] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(null);
  const [modelData, setModelData] = useState(null);
  const [newOpen, setNewOpen] = useState(false);

  useEffect(() => {
    if (!props.loading && props.menu && loading) {
      setMenu(props.menu.data);
      setLoading(false);
      //
    }

    if (props.del_menu && !props.del_menu.loading && delLoad) {
      props.del_menu && setMenu(props.del_menu.data);
      console.log(props.del_menu.data);
      setDelLoad(false);
      window.location.reload();
      //
    }

    if (!load) {
      props.getMenus();
      setLoad(true);
      setLoading(true);
    }
  }, [delLoad, load, loading, props]);

  const editModel = (data) => {
    console.log("edit menu");
    console.log(data);
    setIsOpen(true);
    setModelData(data);
  };

  const deleteMenu = (id) => {
    props.deleteMenu(id);
    setDelLoad(true);
  };

  const renderMenu = () => {
    let html = [];

    if (menu && Object.keys(menu).length > 0) {
      Object.keys(menu).forEach(function (key) {
        html.push(
          <tr key={key}>
            <td>
              <img
                width="50px"
                alt="product"
                src={
                  menu[key] &&
                  menu[key].get_image &&
                  IMGURL + "/" + menu[key].get_image.path
                }
              />
            </td>
            <td>{menu[key].name}</td>

            <td>
              <Button
                onClick={() => editModel(menu[key])}
                color="#5a6268"
                hcolor="#545b62"
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                onClick={() => deleteMenu(menu[key].id)}
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
              <tbody>{renderMenu()}</tbody>
            </Table>
          </Row>
        </Col>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  menu: state.menus.menu,
  del_menu: state.menus.del_menu,
  loading: state.menus.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { addMenu, deleteMenu, getMenus })(Menu)
);
