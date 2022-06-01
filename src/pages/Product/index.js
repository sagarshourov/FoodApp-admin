import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { Table } from "./Table";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { getProducts, deleteProduct } from "../../actions/productActions";
import { getCategory } from "../../actions/categoryActions";
import { getMenus } from "../../actions/menuActions";
import EditModel from "./editModel";

import NewModel from "./newModel";

const URL = process.env.REACT_APP_API_BASE_URL;

const IMGURL = process.env.REACT_APP_API_BASE_IMG;



const Product = (props) => {
  const [load, setLoad] = useState(false);
  const [del, setDel] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newmodalIsOpen, setNewmodalIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    if (!props.loading && props.products && loading) {
      setProduct(props.products.data);
      setLoading(false);
    }
    if (!props.loading && props.delete && del) {
      console.log(props.delete.data);
      setProduct(props.delete.data);
      setLoading(false);
    }
    if (!load) {
      props.getProducts();
      props.getCategory();
      props.getMenus();
      setLoad(true);
      setLoading(true);
    }
  }, [del, load, loading, props]);

  const editModel = (data) => {
    console.log("____edit product___");
    console.log(data);
    setIsOpen(true);
    setModelData(data);
  };
  const deletePro = (key) => {
    console.log(key);
    props.deleteProduct(key);
    setDel(true);
  };

  const varioations = (data) => {
    let html = [];

    if (data && Object.keys(data).length > 0) {
      Object.keys(data).forEach(function (key) {
        html.push(
          <Row key={key}>
            <Col xl={12}>{data[key].name}</Col>
          </Row>
        );
      });
    }
    return html;
  };

  const renderProduct = () => {
    let html = [];

    if (product && Object.keys(product).length > 0) {
      Object.keys(product).forEach(function (key) {
        html.push(
          <tr key={key}>
            <td>
              <img
                width="50px"
                alt="product"
                src={
                  product[key] &&
                  product[key].get_image &&
                  IMGURL + "/" + product[key].get_image.path
                }
              />
            </td>
            <td>{product[key].name}</td>

            <td>
              {product[key].variation && varioations(product[key].variation)}
            </td>

            <td>{product[key].get_menu && product[key].get_menu.name}</td>
            <td>{product[key].get_cat && product[key].get_cat.name}</td>

            <td>
              <Button
                onClick={() => editModel(product[key])}
                color="#5a6268"
                hcolor="#545b62"
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                onClick={() => deletePro(product[key].id)}
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
    setModelData(null);
  };
  const closeNewModel = () => {
    setNewmodalIsOpen(false);
    
  };
  const modelDataFunc = () => {
    setModelData(null);
  };
  return (
    <>
      {modelData && (
        <EditModel
          data={modelData}
          setModelDataFunc={modelDataFunc}
          isOpen={modalIsOpen}
          setProduct={setProduct}
          closeModel={closeModel}
        />
      )}
      <NewModel
        isOpen={newmodalIsOpen}
        setProduct={setProduct}
        closeModel={closeNewModel}
      />
      <Container className="mt-5">
        <Row>
          <Col xl={9}></Col>
          <Col xl={3}>
            <Button
              onClick={() => setNewmodalIsOpen(true)}
              className="pull-right my-1"
            >
              Add new Product
            </Button>
          </Col>
        </Row>
        <Col xl={12} lg={12} sm={12} xs={12}>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th> Image </th>
                  <th> Product Name </th>
                  <th> Variations </th>
                  <th>Menu</th>
                  <th>Category</th>
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
  products: state.product.products,
  delete: state.product.delete,
  loading: state.product.loading,
});

export default withTranslation()(
  connect(mapStateToProps, {
    getProducts,
    getCategory,
    getMenus,
    deleteProduct,
  })(Product)
);
