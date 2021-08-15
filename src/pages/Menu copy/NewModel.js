import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Input from "../../components/Input";
import { Row, Col, Container } from "styled-bootstrap-grid";
import { Button } from "../../components/Button";

import Accordion from "./Accordion";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    minWidth : '600px',
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const EditModel = (props) => {
  console.log(props);
  const [load, setLoad] = useState(false);

  let category = props.category;

  useEffect(() => {
    Modal.setAppElement("body");
  }, [load, props]);

  const closeModal = () => {
    props.closeModel(false);
  };
  const RenderCategory = () => {
    let html = [];

    if (category && Object.keys(category).length > 0) {
      Object.keys(category).forEach(function (key) {
        html.push(<Accordion key={key} data={category[key]} />);
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
            <h4>Menu Name : <input type="text" name="name" /></h4>
            <h4>Menu Image : <input type="file" name="image" /></h4>
            <button type="button" className="close" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="modal-body">{RenderCategory()}</div>
          <div className="modal-footer center">

            <Button className="center">Save</Button>

          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditModel;
