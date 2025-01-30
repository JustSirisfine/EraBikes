import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import forumSchema from "../../schemas/forumSchema";
import { mapLookUpItem } from "helper/utils";
import lookUpService from "services/lookUpService";
import forumService from "../../services/forumService";
import toastr from "toastr";


function ForumForm() {
  console.log("form is working");

  const [formData] = useState({
    forumCategoryId: null,
    title: "",
    body: " ",
  });

  const [lookUps, setLookUps] = useState({
    blogTypes: [],
    mappedBlogTypes: [],
  });

  const forumSubmit = (values) => {
    let payload = {
      name: values.title,
      forumCategoryId: parseInt(values.forumCategoryId),
      description: values.body,
      isPrivate: false,
    };

    console.log(payload);
    forumService
      .addForumPost(payload)
      .then(onAddingSuccess)
      .catch(onAddingError);
  };
  const onAddingError = (error) => {
    console.log("Error getting types", error);
    toastr.error("Thread could not be created - try again!");
  };

  const onAddingSuccess = (success) => {
    console.log("Success getting types", success);
    toastr.success("Successful!");
  };

  useEffect(() => {
    lookUpService
      .LookUp(["ForumCategories"])
      .then(onLookupSuccess)
      .catch(onLookUpError);
  }, []);

  const onLookUpError = (error) => {
    console.log("Error getting types", error);
  };

  const onLookupSuccess = (data) => {
    console.log(data, "DATA");
    const blogCategories = data.item.forumCategories;
    console.log("BLOG CAT", blogCategories);
    setLookUps((prevState) => {
      let newState = { ...prevState };
      newState.blogTypes = blogCategories;
      newState.mappedBlogTypes = blogCategories.map(mapLookUpItem);
      return newState;
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <Formik
            enableReinitialize={true}
            initialValues={formData}
            onSubmit={forumSubmit}
            validationSchema={forumSchema}
          >
            <div className="row">
              <div className="col-md-6">
                <h1 className="text-left-align mb-4">New Thread</h1>
                <Form>
                  <div className="mb-3">
                    <label htmlFor="forumCategoryId" className="form-label">
                      Forum Category
                    </label>
                    <Field
                      as="select"
                      name="forumCategoryId"
                      className="form-control"
                    >
                      <option value="">Select a Category</option>
                      {lookUps.mappedBlogTypes}
                    </Field>
                    <ErrorMessage
                      name="forumCategoryId"
                      component="div"
                      className="has-error"
                    ></ErrorMessage>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <Field name="title" type="text" className="form-control" />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      Body
                    </label>
                    <Field
                      as="textarea"
                      id="body"
                      name="body"
                      className="form-control"
                      placeholder="Enter your content here"
                    />
                    <ErrorMessage
                      name="body"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  {formData.id ? (
                    <button type="submit" className="btn btn-warning">
                      Update Post
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      Create Post
                    </button>
                  )}
                </Form>
              </div>
            </div>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForumForm;
