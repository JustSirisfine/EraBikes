import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logger from "sabio-debug";
import NewAnswerModal from "./NewAnswerModal";
import { toast } from "react-toastify";
import ForumAnswerCard from "./ForumAnswerCard";
import { Button } from "react-bootstrap";
import forumService from "services/forumService";
import { useNavigate } from "react-router-dom";
import "./onethread.css";
import PropTypes from "prop-types";

const _logger = logger.extend("weird");

function OneThread(props) {
  const params = useParams();
  const navigate = useNavigate();
  _logger("params", params);

  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(0);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const [forumAnswers, setForumAnswers] = useState({
    answerData: [],
    mappedAnswers: [],
  });

  const mapForumAnswers = (oneAnswer) => {
    _logger("MAP FORUM ANSWERS", oneAnswer);
    return (
      <ForumAnswerCard
        key={oneAnswer.id}
        oneAnswer={oneAnswer}
      ></ForumAnswerCard>
    );
  };

  useEffect(() => {
    _logger(forumAnswers, "Forum Answers useEffect");

    forumService
      .getByAnswerId(params.forumid)
      .then(onGetByAnswerIdSuccess)
      .catch(onGetByAnswerIdError);
  }, [params.forumid, submitted]);

  const onGetByAnswerIdSuccess = (response) => {
    _logger("Answer Id Success", response);
    const originalData = response.data.item;

    setForumAnswers((prevState) => {
      let newState = { ...prevState };
      newState.answerData = originalData;
      newState.mappedAnswers = originalData?.answers?.map(mapForumAnswers);
      return newState;
    });
  };

  const onGetByAnswerIdError = (response) => {
    _logger("Get Answer Id Error", response);
    toast.error("Action failed, please try again.");
  };

  const handleSaveThread = (values) => {
    _logger("New Thread Data:", values, props.currentUser.id, params.forumid);

    let payload = {};
    payload.answerTitle = "";

    payload.answerDescription = values.description;
    payload.answerAuthorId = props.currentUser.id;

    payload.answerThreadId = params.forumid;
    forumService.addForumAnswer(payload).then(onAddSuccess).catch(onAddError);
  };

  const onAddSuccess = (response) => {
    _logger("successs", response);
    toast.success("Success!");
    setSubmitted((prevState) => prevState + 1);
  };

  const onAddError = (response) => {
    _logger(response);
    toast.error("Failure adding, please try again");
  };

  const navigateToForum = () => {
    navigate(`/dashboard/forum`);
  };

  return (
    <React.Fragment>
      <div className="button-row">
        <Button
          id="newThread"
          size="sm"
          variant="primary"
          className="me-1 mb-2 left-button"
          onClick={navigateToForum}
        >
          BACK TO CATEGORIES
        </Button>
        <div className="col-9"></div>
        <Button
          id="newThread"
          size="sm"
          variant="primary"
          className="me-1 mb-2 right-button"
          onClick={handleModalShow}
        >
          REPLY TO THIS TOPIC
        </Button>
      </div>
      <div className="oneThreadCard w-100 mb-3">
        <div className="card-body d-flex align-items-start">
          <div className="text-center me-3">
            <img
              src={forumAnswers.answerData?.authorInfo?.avatarUrl}
              alt={`${forumAnswers.answerData?.authorInfo?.firstName} ${forumAnswers.answerData?.authorInfo?.lastName}`}
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px" }}
            />
            <div>
              {forumAnswers.answerData?.authorInfo?.firstName}{" "}
              {forumAnswers.answerData?.authorInfo?.lastName}
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-1">
                {forumAnswers.answerData?.name}
              </h5>
            </div>
            <p className="text-muted mb-2">
              <small>
                {new Date(
                  forumAnswers.answerData?.dateCreated
                ).toLocaleString()}
              </small>
            </p>
            <p
              className="card-text text-truncate"
              title={forumAnswers.answerData?.description}
            >
              {forumAnswers.answerData?.description}
            </p>
            <div className="d-flex justify-content-between">
              <span className="text-primary">
                {forumAnswers.answerData?.forumCategoryId?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
      {forumAnswers.mappedAnswers}
      <NewAnswerModal
        isShow={showModal}
        handleClose={handleModalClose}
        handleSave={handleSaveThread}
      ></NewAnswerModal>
    </React.Fragment>
  );
}
export default OneThread;

OneThread.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};
