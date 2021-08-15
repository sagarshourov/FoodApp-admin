import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { upMenu } from "../../actions/menuActions";
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

const EditModel = (props) => {
  const [load, setLoad] = useState(false);
  const [upload, setUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
   
    if (
      !props.uploads.loading &&
      props.uploads.upload &&
      props.uploads.upload.data &&
      upload
    ) {
      setUploaded(false);
      setFile(props.uploads.upload.data);
    }

    if(load && !props.loading && props.menu){
      window.location.reload();
      setLoad(false);
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
    if(!data.name){
      data.name=props.data.name;
    }
    data.id = props.data.id;
    props.upMenu(data);
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
            <h5>Edit Menu</h5>
            <button type="button" className="close" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "500px" }}>
              <Row className="my-1">
                <Col xl={2}>Image</Col>
                <Col xl={9}>
                  <input
                    onChange={(e) => fileUpload(e)}
                    name="file"
                    type="file"
                  />
                  {upload && <p>Uploading....</p>}
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    type="text"
                    label="Menu Title"
                    defaultValue={props.data && props.data.name}
                    {...register(`name`, {
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
  menu: state.menus,
  uploads: state.product,
  loading: state.menus.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { upload, upMenu })(EditModel)
);
