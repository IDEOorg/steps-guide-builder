import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './index.less';
import { getTranslation } from '../../globals/utils';

marked.setOptions({
  breaks: true
});

const hrLine = (<hr className="timeline-hr" />);

const TimelineBox = (props) => {
  let sections = props.content;
  let items = [];
  if (window.innerWidth < 1065) items.push(hrLine);
  for (let i = 0; i < sections.length; i++) {
    items.push((
      <div className="timeline_content_box" dangerouslySetInnerHTML={{ "__html": marked(getTranslation(sections[i].content, props.language)) }} key={`${i}`} />
    ));
    if (window.innerWidth > 1065) {
      items.push((
        <img src={require('../../assets/timeline-arrow.svg')} />
      ));
    } else {
      items.push(hrLine);
    }
  }
  if (items.length) {
    items.pop();
  }

  return (
    <div className="timeline_box">
      <div className="timeline_title" dangerouslySetInnerHTML={{ "__html": marked(props.title, props.language) }} />
      <div className="timeline_content_section">
        {items}
      </div>
    </div>
  );
};

export default TimelineBox;

TimelineBox.propTypes = {
  content: PropTypes.string
};

TimelineBox.displayName = 'TimelineBox';
