import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { addCategory } from "../../actions/categoryActions";
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

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!props.loading && load && props.category) {
      window.location.reload();
    }

    Modal.setAppElement("body");
  }, [load, props]);

  const closeModal = () => {
    props.closeModel(false);
  };
  const onSubmit = (data) => {
    props.addCategory(data);
    setLoad(true);
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
            <h5>New Category</h5>
            <button type="button" className="close" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "500px" }}>
              {/* <Row className="my-1">
                <Col xl={2}>Image</Col>
                <Col xl={9}>
                  <input type="file" />
                </Col>
              </Row> */}
              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    type="text"
                    label="Category Title"
                    {...register(`name`, {
                      required: true,
                    })}
                  />
                </Col>
              </Row>
              <Row>
                <Col xl={12}>
                  <Button>Add</Button>
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
  category: state.category,
  loading: state.category.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { addCategory })(NewModel)
);
