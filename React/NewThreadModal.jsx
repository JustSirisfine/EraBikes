import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logger from "sabio-debug";
import lookUpService from "../../services/lookUpService";
import "./ForumCategoryCard.css";

const _logger = logger.extend("forum");

// Validation Schema for Formik Form
const threadValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string()
    .min(20)
    .max(4000)
    .required("Description is required"),
});

const NewThreadModal = ({ isShow, handleClose, handleSave }) => {
  _logger("behold");
  const [lookUps, setLookUps] = useState({
    forumTypes: [],
  });

  useEffect(() => {
    lookUpService
      .LookUp(["ForumCategories"])
      .then(onLookupSuccess)
      .catch(onLookUpError);
  }, []);
  const onLookUpError = (error) => {
    _logger("Error getting types", error);
  };

  const onLookupSuccess = (data) => {
    _logger("datadatadatas", data.item.forumCategories);

    const forumCategories = data.item.forumCategories;
    setLookUps((prevState) => {
      let newState = { ...prevState };
      newState.forumTypes = forumCategories;
      return newState;
    });
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Start a Discussion</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: "",
          description: "",
          isPrivate: false,
        }}
        validationSchema={threadValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSave(values);
          resetForm();
          handleClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="form-group">
                <h3 htmlFor="name">Title</h3>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
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
              <label htmlFor="forumCategoryId">Category</label>
              <div className="form-group">
                <Field
                  className="form-select"
                  as="select"
                  id="forumCategoryId"
                  name="forumCategoryId"
                >
                  <option value="">Select an option...</option>
                  {lookUps.forumTypes.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="conditionId" component="div" />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Save
              </Button>
              <Button variant="dark" type="submit">
                Clear
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

NewThreadModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default NewThreadModal;
