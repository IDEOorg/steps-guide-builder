import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './index.less';

marked.setOptions({
  breaks: true,
  tables: true
});

const ContentBox = (props) => {
  return (
    <div className="content_box" dangerouslySetInnerHTML={{"__html": marked(props.content)}} />
  );
};

export default ContentBox;

ContentBox.propTypes = {
  content: PropTypes.string.isRequired
};

ContentBox.displayName = 'ContentBox';
