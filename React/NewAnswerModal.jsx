import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logger from "sabio-debug";

const _logger = logger.extend("New Answer Modal");

const threadValidationSchema = Yup.object().shape({
  description: Yup.string().min(1).max(4000),
});

const NewAnswerModal = ({ isShow, handleClose, handleSave }) => {
  _logger("New Answer Modal");

  function onButtonClicked(values) {
    handleSave(values);
  }

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Comment</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          description: "",
        }}
        validationSchema={threadValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onButtonClicked(values);
          resetForm();
          handleClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="form-group">
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className="form-control"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Post
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

NewAnswerModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default NewAnswerModal;
