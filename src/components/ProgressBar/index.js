import React from 'react';
import './index.less';

const ProgressBar = (props) => {
  let i = 0;
  let bars = [];
  while(i < props.count && i < 2) {
    bars.push(<div key={i} className="progress_bar_bar progress_bar_bar_complete"></div>);
    i++;
  }
  while(i < 2) {
    bars.push(<div key={i} className="progress_bar_bar"></div>);
    i++;
  }
  return (
    <div className="progress_bar_box">
      <h3 className="progress_bar_instruction">{props.instructionText}</h3>
      <div className="progress_bar_bars">
        { bars }
      </div>
    </div>
  );
};

export default ProgressBar;

ProgressBar.displayName = 'ProgressBar';
