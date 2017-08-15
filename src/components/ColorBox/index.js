import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './index.less';

marked.setOptions({
  breaks: true,
  tables: true
});

const ColorBox = (props) => {
  return (
    <div className="color_box" dangerouslySetInnerHTML={ {"__html": marked(props.content)} } />
  );
};

export default ColorBox;

ColorBox.propTypes = {
  content: PropTypes.string
};

ColorBox.displayName = 'ColorBox';
