import React from "react";
import PropTypes from "prop-types";
import "./ForumCategoryCard.css";


function ForumAnswerCard(props) {
  console.log("Thread Posts", props);

  let newAuthor = JSON.parse(props.oneAnswer.answerAuthorId);
  console.log("Parsed Author Info", newAuthor);

  return (
    <React.Fragment>
      <div className="card text-bg-light mb-3 forumAnswerCard .moving-right">
        <div className="card-body">
          <div className="threadCardBody">
            <h5 className="card-title answer-title">
              {props.oneAnswer.answerDescription}
            </h5>
            <div className="author-details">
              {newAuthor.AvatarUrl && (
                <img
                  src={newAuthor.AvatarUrl}
                  alt="Author Avatar"
                  className="author-avatar"
                />
              )}
              <p className="card-text author-name">
                {newAuthor.FirstName} {newAuthor.LastName}
              </p>
            </div>
            <p className="card-text answer-date">
              Posted on:{" "}
              {new Date(props.oneAnswer.answerDateCreated).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ForumAnswerCard;

ForumAnswerCard.propTypes = {
  oneAnswer: PropTypes.shape({
    answerDescription: PropTypes.string.isRequired,
    answerAuthorId: PropTypes.string.isRequired,
    answerDateCreated: PropTypes.string.isRequired,
    answerId: PropTypes.number,
    answerThreadId: PropTypes.number,
    answerTitle: PropTypes.string,
  }),
  setForumAnswers: PropTypes.func,
};
