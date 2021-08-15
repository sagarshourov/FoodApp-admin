import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { updateStatus } from "../../actions/orderActions";

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
  console.log(props.data);
  const [load, setLoad] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if(!props.loading && props.status && props.status.data && load){
      console.log('__________');
      props.closeModel(false);
      setLoad(false);
      props.setOrders(props.status.data)
    }



    Modal.setAppElement("body");
  }, [load, props]);

  const closeModal = () => {
    props.closeModel(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (parseInt(data.status) === 0) {
      alert("Select an order status");
    }else{
      props.updateStatus(data);
      setLoad(true);
    }

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
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "300px" }}>
              <Row className="my-1">
                <Col xl={12}>
                  <select {...register("status")}>
                    <option value="0">Select Status</option>
                    <option value="1">Assigning Driver</option>
                    <option value="2">On Going</option>
                    <option value="3">Picked Up</option>
                    <option value="4">Completed</option>
                  </select>
                  <input
                    type="hidden"
                    defaultValue={props.data && props.data.id}
                    {...register("id", {
                      required: true,
                      value: props.data && props.data.id,
                    })}
                  />
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
  status: state.order.status,
  loading: state.order.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { updateStatus })(EditModel)
);
