import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import TimePicker from "react-time-picker";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { addOutlate } from "../../actions/outlateActions";
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
  const [start, onChange] = useState(null);
  const [close, onChangeClose] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [upload, setUploaded] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(props);

    if (!props.loading && load && props.add_outlate) {
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
    } else {
      alert("Please  select image");
      return;
    }

    props.addOutlate(data);
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
            <h5>New Outlate</h5>
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
                  <Input
                    type="text"
                    required
                    label="Outlate Title"
                    {...register(`name`)}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    type="text"
                    label="Phone"
                    required
                    {...register(`phone`)}
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
                  <Input
                    type="text"
                    required
                    label="Address"
                    {...register(`address`)}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    type="text"
                    required
                    label="location"
                    {...register(`location`)}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col xl={12}>
                  <Input
                    type="text"
                    required
                    label="zip"
                    {...register(`zip`)}
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

                  <input  required {...register(`description `)} />
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
  add_outlate: state.outlate.add_outlate,
  uploads: state.product,
  loading: state.outlate.loading,
});

export default withTranslation()(
  connect(mapStateToProps, { addOutlate, upload })(NewModel)
);
