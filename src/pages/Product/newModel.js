import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { addProducts, upload, clearState } from "../../actions/productActions";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const NewModel = (props) => {
  const [upload, setUploaded] = useState(false);
  const [load, setLoad] = useState(false);
  const [file, setFile] = useState(null);
  const [variation, setVariation] = useState(null);
  const [variObj, setVariObj] = useState([]);
  const { register, unregister, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (props.loading) {
      alert("Please wait");
      return;
    }
    if (parseInt(data.cat_id) === 0) {
      alert("Select an category");
      return;
    }
    if (parseInt(data.menu_id) === 0) {
      alert("Select an Menu");
      return;
    }
    if (file) {
      data.image = file.id;
    }

    props.addProducts(data);
    setLoad(true);
    props.clearState();
    setFile(null);
  };

  useEffect(() => {
    Modal.setAppElement("body");
    if (!props.loading && props.uploads && props.uploads.data && upload) {
      setUploaded(false);
      setFile(props.uploads.data);
    }
    if (!props.loading && props.add_product && props.add_product.data && load) {
      setLoad(false);
      props.setProduct(props.add_product.data);
      props.closeModel(false);
      setVariObj([]);
      reset(props.add_product.data);
      window.location.reload();
    }
  }, [load, props, reset, upload]);

  const closeModal = () => {
    props.closeModel(false);
  };

  const fileUpload = (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    props.upload(formData);
    setUploaded(true);
  };

  const renderMenu = () => {
    let html = [];

    if (props.menus && Object.keys(props.menus).length > 0) {
      Object.keys(props.menus).forEach(function (key) {
        html.push(
          <option key={key} value={props.menus[key].id}>
            {props.menus[key].name}
          </option>
        );
      });
    }
    return html;
  };
  const renderCategory = () => {
    let html = [];

    if (props.category && Object.keys(props.category).length > 0) {
      Object.keys(props.category).forEach(function (key) {
        html.push(
          <option key={key} value={props.category[key].id}>
            {props.category[key].name}
          </option>
        );
      });
    }
    return html;
  };

  const incrementRender = (key) => {
    let newVariObjs = variObj;
    newVariObjs.push({
      price: 0,
      stock: 0,
      name: "",
    });
    setVariObj(newVariObjs);
    let vari = renderVariation(newVariObjs);
    setVariation(vari);
  };
  const deleteVari = (key) => {
    let newVariObjs = variObj;
    newVariObjs.splice(key, 1);
    setVariObj(newVariObjs);
    let vari = renderVariation(newVariObjs);
    setVariation(vari);
    unregister(`vari.${key}.id`);
    unregister(`vari.${key}.name`);
    unregister(`vari.${key}.price`);
    unregister(`vari.${key}.stock`);
  };
  const renderVariation = (variObjs) => {
    let html = [];

    if (variObjs && Object.keys(variObjs).length > 0) {
      Object.keys(variObjs).forEach(function (key) {
        html.push(
          <Row key={key} className="my-1">
            <Col xl={5}>
              <Input
                required
                type="text"
                {...register(`vari.${key}.name`, {
                  required: true,
                })}
                label="Name"
              />
            </Col>
            <Col xl={3}>
              <Input
                required
                type="number"
                {...register(`vari.${key}.price`, {
                  required: true,
                })}
                label=" price"
              />
            </Col>
            <Col xl={3}>
              <Input
                required
                type="number"
                {...register(`vari.${key}.stock`)}
                label="stock"
              />
            </Col>
            <Col xl={1}>
              <span onClick={() => deleteVari(key)}>X</span>
            </Col>
          </Row>
        );
      });
    }

    return html;
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="CLose Modal"
    >
      <div className="modal-dialog modal-animations">
        <div className="modal-content pl-4 pr-4 pb-4">
          <div className="modal-header">
            <h5>New Product</h5>
            <button type="button" className="close" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="my-1">
                <Col xl={3}>Image</Col>
                <Col xl={9}>
                  <input
                    onChange={(e) => fileUpload(e)}
                    name="file"
                    type="file"
                  />
                  {props.loading && <p>Uploading....</p>}
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <select required {...register("status")}>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    required
                    type="text"
                    {...register("name")}
                    label="Product Title"
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    required
                    type="text"
                    {...register("detail")}
                    label="Product details"
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={6}>
                  <Input
                    required
                    type="text"
                    {...register("price")}
                    label="Product price"
                  />
                </Col>
                <Col xl={6}>
                  <Input
                    required
                    type="text"
                    label="Stock"
                    {...register("stock")}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={6}>
                  <select required {...register("cat_id")}>
                    <option value="0">Select Category</option>
                    {renderCategory()}
                  </select>
                </Col>
                <Col xl={6}>
                  <select required {...register("menu_id")}>
                    <option value="0">Select Menu</option>
                    {renderMenu()}
                  </select>
                </Col>
              </Row>
              <h5>Select options</h5>

              {variation && variation}

              <Row>
                <Button
                  onClick={() => incrementRender()}
                  className="center"
                  color="#5F479B"
                  hcolor="#525397"
                  type="button"
                >
                  +
                </Button>
              </Row>

              <Row className="my-3">
                <Col xl={12}>
                  <Button type="submit">Update</Button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  add_product: state.product.add_product,
  uploads: state.product.upload,
  category:
    state.category && state.category.category && state.category.category.data,
  menus: state.menus && state.menus.menu && state.menus.menu.data,
  loading: state.product.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { addProducts, upload, clearState })(NewModel)
);
