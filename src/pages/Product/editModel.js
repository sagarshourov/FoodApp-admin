import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";

import { editProducts, upload, clearState } from "../../actions/productActions";

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

const EditModel = (props) => {
  const [upload, setUploaded] = useState(false);
  const [load, setLoad] = useState(false);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [variation, setVariation] = useState(null);
  const [variObj, setVariObj] = useState([]);
  const { register, unregister, handleSubmit, reset } = useForm();

  const olddata = props.data;

  const onSubmit = (data) => {
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
    console.log("____File ID_____");
    if (file) {
      data.image = file.id;
    }
    data.id = olddata.id;
    props.editProducts(data);
    setLoad(true);
    props.clearState();
    setFile(null);
  };

  useEffect(() => {
    console.log(props);

    Modal.setAppElement("body");
    if (!props.loading && props.uploads && props.uploads.data && upload) {
      setUploaded(false);

      console.log(props.uploads.data);

      setFile(props.uploads.data);
    }
    if (
      !props.loading &&
      props.edit_product &&
      props.edit_product.data &&
      load
    ) {
      setLoad(false);

      props.setProduct(props.edit_product.data);
      props.setModelDataFunc(null);
      props.closeModel(false);
      setFile(null);

      setVariObj([]);
      setVariation(null);

      //window.location.reload();
    }

    if (!open) {
      setVariObj(props.data.variation);
      setOpen(true);
    }
  }, [load, open, props, reset, upload]);

  const closeModal = () => {
    props.closeModel(false);
  };

  const fileUpload = (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    props.upload(formData);
    setUploaded(true);
    setFile(null);
    props.clearState();
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
      id: 0,
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
              <input
                type="hidden"
                {...register(`vari.${key}.id`, {
                  required: true,
                  value: variObjs[key].id,
                })}
              />
              <input
                required
                type="text"
                {...register(`vari.${key}.name`, {
                  required: true,
                  value: variObjs[key].name,
                })}
                label="Name"
              />
            </Col>
            <Col xl={3}>
              <input
                required
                type="number"
                {...register(`vari.${key}.price`, {
                  required: true,
                  value: variObjs[key].price,
                })}
                label=" price"
              />
            </Col>
            <Col xl={3}>
              <input
                required
                type="number"
                {...register(`vari.${key}.stock`, {
                  required: true,
                  value: variObjs[key].stock,
                })}
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
    olddata && (
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
                    {/* {file && (
                    <input
                      type="hidden"
                      {...register("image", {
                        required: true,
                        value: file.id,
                      })}
                    />
                  )} */}
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
                    <input
                      type="text"
                      label="Product Title"
                      {...register("name", {
                        required: true,
                        value: olddata && olddata.name,
                      })}
                    />
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col xl={12}>
                    <input
                      type="text"
                      label="Product details"
                      {...register("detail", {
                        required: true,
                        value: olddata && olddata.detail,
                      })}
                    />
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col xl={6}>
                    <input
                      type="text"
                      label="Product price"
                      {...register("price", {
                        required: true,
                        value: olddata && olddata.price,
                      })}
                    />
                  </Col>
                  <Col xl={6}>
                    <input
                      type="text"
                      label="Stock"
                      {...register("stock", {
                        required: true,
                        value: olddata && olddata.stock,
                      })}
                    />
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col xl={6}>
                    <select
                      defaultValue={props.data.cat_id}
                      required
                      {...register("cat_id")}
                    >
                      <option value="0">Select Category</option>
                      {renderCategory()}
                    </select>
                  </Col>
                  <Col xl={6}>
                    <select
                      defaultValue={props.data.menu_id}
                      required
                      {...register("menu_id")}
                    >
                      <option value="0">Select Menu</option>
                      {renderMenu()}
                    </select>
                  </Col>
                </Row>
                <h5>Select options</h5>

                {variation ? variation : renderVariation(olddata.variation)}
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

                <Row>
                  <Col xl={12}>
                    <Button type="submit">Update</Button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

const mapStateToProps = (state) => ({
  edit_product: state.product.edit_product,
  uploads: state.product.upload,
  category:
    state.category && state.category.category && state.category.category.data,
  menus: state.menus && state.menus.menu && state.menus.menu.data,
  loading: state.product.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { editProducts, upload, clearState })(EditModel)
);
