import React, { useState, useEffect } from "react";
import ForumCategoryCard from "./ForumCategoryCard";
import lookUpService from "../../services/lookUpService";
import ForumThreadCard from "./ForumThreadCard";
import FooterWithLinks from "layouts/marketing/footers/FooterWithLinks";
import { Button } from "react-bootstrap";
import forumService from "../../services/forumService";

const ForumCategories = () => {
  console.log("Forum Categories")

  const [forumData, setForumData] = useState({
    originalData: [],
    components: [],
  });

  const [lookUps, setLookUps] = useState({
    forumTypes: [],
    mappedForumTypes: [],
  });

  const [selectedCat, setSelectedCat] = useState(0);

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

    const forumCategories = data.item.forumCategories;
    setLookUps((prevState) => {
      let newState = { ...prevState };
      newState.forumTypes = forumCategories;
      newState.mappedForumTypes = forumCategories.map(mapForumCat);
      return newState;
    });
  };

  useEffect(() => {
    if (selectedCat) {
      forumService
        .getByCategoryId(selectedCat, 0, 19)
        .then(onGetByIdSuccess)
        .catch(onGetByIdError);
    }
  }, [selectedCat]);

  const onGetByIdSuccess = (response) => {
    console.log("onGetByIdSuccess", response);
    const idData = response.data.item.pagedItems;
    setForumData((prevState) => {
      let newState = { ...prevState };
      newState.originalData = idData;
      newState.components = idData.map(mappingThreads);
      return newState;
    });
  };

  const mappingThreads = (oneThread) => {
    return <ForumThreadCard oneThread={oneThread}></ForumThreadCard>;
  };

  const onGetByIdError = (response) => {
    console.log("onGerByIdError", response);
  };

  const mapForumCat = (oneForumCat) => {
    return (
      <ForumCategoryCard
        key={oneForumCat.id}
        setSelectedCat={setSelectedCat}
        oneForumCat={oneForumCat}
      ></ForumCategoryCard>
    );
  };

  return (
    <React.Fragment>
      <h1
        style={{
          color: "white",
          backgroundColor: "darkblue",
          textAlign: "center",
          border: "0px",
        }}
      >
        Forum
      </h1>

      <div className="container">
        <div className="row">
          <div className="col-4">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button
              className="btn btn-outline-success"
              id="Search"
              type="submit"
              style={{ textAlign: "left", color: "white" }}
            >
              Search
            </Button>
          </div>
          <div className="col-1">
            <Button
              id="newThread"
              size="sm"
              variant="primary"
              className="me-1 mb-2"
            >
              Start New Thread
            </Button>
          </div>
        </div>
        <div className="row justify-content-md-center" style={{}}>
          {lookUps.mappedForumTypes}
        </div>
      </div>
      {forumData.components}
      <FooterWithLinks></FooterWithLinks>
    </React.Fragment>
  );
};

export default ForumCategories;
