import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { addProducts, editProducts } from "../../actions/productActions";
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
  const [load, setLoad] = useState(false);
  const { register, handleSubmit } = useForm();
  console.log(props);
  const onSubmit = (data) => {
    props.addProducts(data);
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, [load, props]);

  const closeModal = () => {
    props.closeModel(false);
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
            <h5>Order ## {props.data && props.data.id}</h5>
            <button type="button" className="close" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "400px" }}>
              <Row className="my-1">
                <Col xl={4}>
                  {" "}
                  <span className="pull-right"> Order Type </span>
                </Col>
                <Col xl={8}>
                  <Row>{props.data && props.data.order_type.type}</Row>
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={4}>
                  <span className="pull-right"> Customer </span>
                </Col>
                <Col xl={8}>
                  <Row>
                    {props.data && (props.data.guest
                      ? props.data.guest.fname + " " + props.data.guest.lname
                      : props.data.user.fname + " " + props.data.user.lname)}
                  </Row>
                </Col>
              </Row>
              {props.data && props.data.order_type.id === 1 && (
                <Row className="my-1">
                  <Col xl={4}>
                    <span className="pull-right"> Address </span>
                  </Col>
                  <Col xl={8}>
                    <Row>{props.data && props.data.d_address}</Row>
                  </Col>
                </Row>
              )}
              {props.data && props.data.order_type.id === 2 && (
                <Row className="my-1">
                  <Col xl={4}>
                    <span className="pull-right"> Outlate </span>
                  </Col>
                  <Col xl={8}>
                    <Row>{props.data.outlate && props.data.outlate.name}</Row>
                  </Col>
                </Row>
              )}
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  add_product: state.product.add_product,
  loading: state.product.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { addProducts })(NewModel)
);
