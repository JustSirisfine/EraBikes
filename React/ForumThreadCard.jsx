import PropTypes from "prop-types";
import React from "react";
import debug from "sabio-debug";
import "./onethread.css";
import { useNavigate } from "react-router-dom";

const _logger = debug.extend("ForumPosts");
function ForumThreadCard(props) {
  const navigate = useNavigate();
  _logger("Threads", props);

  const navigateToForum = async () => {
    navigate(`/dashboard/forum/${props.oneThread.id}`);
  };

  return (
    <React.Fragment>
      <button
        className="card col-12 m-1 w-background"
        onClick={navigateToForum}
      >
        <div className="w-100 mb-3 text-start">
          <div className="card-body d-flex align-items-start text-start">
            <div className="me-3">
              <img
                src={props.oneThread?.authorInfo?.avatarUrl}
                alt={`${props.oneThread?.authorInfo?.firstName} ${props.oneThread?.authorInfo?.lastName}`}
                className="rounded-circle mb-2"
                style={{ width: "60px", height: "60px" }}
              />
              <div>
                {props.oneThread?.authorInfo?.firstName}{" "}
                {props.oneThread?.authorInfo?.lastName}
              </div>
            </div>
            <div className="flex-grow-1 text-start">
              <div className="">
                <h5 className="card-title mb-1">{props.oneThread.name}</h5>
              </div>

              <p
                className="card-text text-truncate"
                title={props.oneThread.description}
              >
                {props.oneThread.description}
              </p>
              <div className="d-flex">
                <span className="text-primary">
                  {props.oneThread.forumCategoryId?.name}
                </span>
              </div>
              <p className="text-muted mb-2">
                <small>
                  {
                    new Date(props.oneThread.dateCreated)
                      .toLocaleString()
                      .split("T")[0]
                  }
                </small>
              </p>
            </div>
          </div>
        </div>
      </button>
    </React.Fragment>
  );
}

export default ForumThreadCard;

ForumThreadCard.propTypes = {
  oneThread: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateCreated: PropTypes.string,
    authorInfo: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
    forumCategoryId: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
  setForumData: PropTypes.func,
};
