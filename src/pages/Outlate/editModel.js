import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import TimePicker from "react-time-picker";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { updateOutlate } from "../../actions/outlateActions";
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
  
  const [start, onChange] = useState(props.data.start);
  const [close, onChangeClose] = useState(props.data.end);

  const { register, handleSubmit, reset } = useForm();
  const [upload, setUploaded] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {


    if (!props.loading && load && props.up_outlate) {
      window.location.reload();
    }

    if (
      upload &&
      !props.uploads.loading &&
      props.uploads &&
      props.uploads.upload.data
    ) {
      setUploaded(false);
      setFile(props.uploads.upload.data);
    }

    Modal.setAppElement("body");
  }, [load, props, upload]);

  const closeModal = () => {
    reset();
    props.closeModel(false);
  };
  const onSubmit = (data) => {
    if (start) {
      data.start = start;
    } else {
      alert("Start time required");
      return;
    }
    if (close) {
      data.end = close;
    } else {
      alert("Close time required");
      return;
    }
    if (file) {
      data.banner = file.id;
    }
    data.id = props.data.id;
    props.updateOutlate(data);
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
            <h5>Edit Outlate</h5>
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
                  <input
                    type="text"
                    required
                    label="Outlate Title"
                    defaultValue ={props.data && props.data.name}
                    {...register(`name`, {
                      defaultValue: props.data && props.data.name,
                    })}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <input
                    type="text"
                    label="Phone"
                    required
                    defaultValue ={props.data && props.data.phone}
                    {...register(`phone`, {
                      defaultValue: props.data && props.data.phone,
                    })}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={6}>
                  <TimePicker
                    required
                    value={start}
                    name="start"
                    // locale="sv-sv"
                    disableClock
                    onChange={onChange}
                  />
                </Col>
                <Col xl={6}>
                  <TimePicker
                    // locale="sv-sv"
                    required
                    value={close}
                    disableClock
                    onChange={onChangeClose}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <input
                    type="text"
                    required
                    label="Address"
                    defaultValue ={props.data && props.data.address}
                    {...register(`address`, {
                      defaultValue: props.data && props.data.address,
                    })}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <input
                    type="text"
                    required
                    label="location"
                    defaultValue={props.data && props.data.location}
                    {...register(`location`, {
                      defaultValue: props.data && props.data.location,
                    })}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <input
                    type="text"
                    required
                    label="zip"
                    defaultValue={props.data && props.data.zip}
                    {...register(`zip`,{
                      defaultValue: props.data && props.data.zip,
                    })}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <Row>
                    <Col xl={12}>
                      {" "}
                      <label>Description</label>
                    </Col>
                  </Row>
                  <input
                    type="textarea"
                    required
                    defaultValue={props.data && props.data.description}
                    {...register(`description`,{
                      defaultValue: props.data && props.data.description,
                    })}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <select defaultValue={props.data.status} required {...register("status")}>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
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
  up_outlate: state.outlate.up_outlate,
  uploads: state.product,
  loading: state.outlate.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { updateOutlate, upload })(EditModel)
);
