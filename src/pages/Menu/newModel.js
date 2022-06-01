import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { addMenu } from "../../actions/menuActions";
import { upload } from "../../actions/productActions";
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
  const [upload, setUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const { register, setValue, handleSubmit, reset } = useForm();

  useEffect(() => {

    console.log(props)
    if (!props.uploads.loading && props.uploads.upload && props.uploads.upload.data && upload) {
      setUploaded(false);
      setFile(props.uploads.upload.data);
    }
    if (!props.menu.loading && props.menu.add_menu && props.menu.add_menu.data ) {
      window.location.reload();
    }

    Modal.setAppElement("body");
  }, [load, props, upload]);

  const closeModal = () => {
    props.closeModel(false);
  };
  const onSubmit = (data) => {
    if (file) {
      data.banner = file.id;
    }
    props.addMenu(data);
    setLoad(true);
  };
  const fileUpload = (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    props.upload(formData);
    setUploaded(true);
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
            <h5>New Menu</h5>
            <button type="button" className="close" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "700px" }}>
              <Row className="my-1">
                <Col xl={2}>Image</Col>
                <Col xl={9}>
                  <input
                    onChange={(e) => fileUpload(e)}
                    name="file"
                    type="file"
                  />
                  {upload && <p>File Uploading .. Please wait ..</p>}
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    type="text"
                    label="Menu Title"
                    name="name"
                    register={register}
                 
                  />
                </Col>
              </Row>
              <Row>
                <Col xl={12}>
                  <Button type="submit">Add</Button>
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
  menu: state.menus,
  uploads : state.product,
  loading: state.menus.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { upload, addMenu })(NewModel)
);
