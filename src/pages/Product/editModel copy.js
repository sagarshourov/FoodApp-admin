import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { editProducts, upload } from "../../actions/productActions";

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
  const [load, setLoad] = useState(false);
  const { register, handleSubmit } = useForm();

  const [upload, setUploaded] = useState(false);

  const [file, setFile] = useState(null);

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

    props.editProducts(data);
    setLoad(true);
  };

  useEffect(() => {
    console.log(props);
    Modal.setAppElement("body");
    if (!props.loading && props.uploads && props.uploads.data && upload) {
      setUploaded(false);
      setFile(props.uploads.data);
    }
  }, [load, props, upload]);

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
            <h5>Edit Product</h5>
            <button type="button" className="close" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="hidden"
                {...register("id", {
                  required: true,
                  value: props.id,
                })}
              />
              <Row className="my-1">
                <Col xl={3}>Image</Col>
                <Col xl={9}>
                  <input
                    onChange={(e) => fileUpload(e)}
                    name="file"
                    type="file"
                  />
                  {props.loading && <p>Uploading....</p>}
                  {file && (
                    <input
                      type="hidden"
                      {...register("image", {
                        required: true,
                        value: file.id,
                      })}
                    />
                  )}
                </Col>
              </Row>

              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    type="text"
                    label="Product Title"
                    defaultValue={props.data && props.data.name}
                    {...register("name", {
                      required: true,
                      value: props.data && props.data.detail,
                    })}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    type="text"
                    label="Product details"
                    defaultValue={props.data && props.data.detail}
                    {...register("detail", {
                      required: true,
                      value: props.data && props.data.detail,
                    })}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={6}>
                  <Input
                    type="text"
                    label="Product price"
                    defaultValue={props.data && props.data.price}
                    {...register("price", {
                      required: true,
                      value: props.data && props.data.price,
                    })}
                  />
                </Col>
                <Col xl={6}>
                  <Input
                    type="text"
                    label="Stock"
                    {...register("stock", {
                      required: true,
                      value: props.data && props.data.stock,
                    })}
                    defaultValue={props.data && props.data.stock}
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
  connect(mapStateToProps, { editProducts, upload })(EditModel)
);
