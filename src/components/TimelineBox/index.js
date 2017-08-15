import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './index.less';

marked.setOptions({
  breaks: true
});

const TimelineBox = (props) => {
  let sections = props.content;
  let items = [];
  for(let i = 0; i < sections.length; i++) {
    items.push((
        <div className="timeline_content_box" dangerouslySetInnerHTML={ {"__html": marked(sections[i].content)} } />
    ));
    items.push((
      <img src={require('../../assets/timeline-arrow.svg')} />
    ));
  }
  if(items.length) {
    items.pop();
  }
  return (
    <div className="timeline_box">
      <div className="timeline_title" dangerouslySetInnerHTML={ {"__html": marked(props.title)} } />
      <div className="timeline_content_section">
        { items }
      </div>
    </div>
  );
};

export default TimelineBox;

TimelineBox.propTypes = {
  content: PropTypes.string
};

TimelineBox.displayName = 'TimelineBox';
