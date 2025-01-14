import React from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";

const _logger = debug.extend("ForumPosts");
function ForumPosts(props) {
  _logger("Thread Posts", props);

  const onCategoryClick = () => {
    props.setSelectedCat(props.oneForumCat.id);
  };

  return (
    <React.Fragment>
      <button
        id="categoryButton"
        className="card col-2 m-1"
        onClick={onCategoryClick}
      >
        <div className="card-body">
          <h3 className="card-title">{props.oneForumCat.name}</h3>
        </div>
      </button>
    </React.Fragment>
  );
}

export default ForumPosts;

ForumPosts.propTypes = {
  oneForumCat: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  setSelectedCat: PropTypes.func,
};
