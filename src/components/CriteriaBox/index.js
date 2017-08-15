import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './index.less';

marked.setOptions({
  breaks: true,
  tables: true
});

const CriteriaBox = (props) => {
  return (
    <div className="criteria_box" dangerouslySetInnerHTML={{"__html": marked(props.content)}} />
  );
};

export default CriteriaBox;

CriteriaBox.propTypes = {
  content: PropTypes.string.isRequired
};

CriteriaBox.displayName = 'CriteriaBox';
