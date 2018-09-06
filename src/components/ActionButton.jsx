import React from 'react';
import Proptypes from 'prop-types';

import '../assets/css/ActionButton.css';

const propTypes = {
  /**
   * The color for the action button.
   */
  color: Proptypes.string,
  /**
   * Boolean indicating whether the button should include a caption or not.
   */
  includeCaption: Proptypes.bool,
  /**
   * Onclick event callback for the action button.
   */
  onClick: Proptypes.func,
  /**
   * Size of the action button - large or small.
   */
  size: Proptypes.string,
  /**
   * Type of the action button - add or destroy.
   */
  type: Proptypes.string,
};

const defaultProps = {
  size: 'large',
  type: 'add',
};

const ActionButton = (props) => {
  const {
    color, includeCaption, onClick, size, type,
  } = props;

  return (
    <div className="action-button-group">
      <div className={`action-button ${size} action-button-${color} ${type}`} onClick={onClick}>
        {type === 'add' && '+'}
        {type === 'destroy' && '\u2013'}
      </div>
      {
        includeCaption
        && (
          <div className={`action-caption action-caption-${size} ${type}`}>
            {type === 'add' && 'Add Server'}
            {type === 'destroy' && 'Destroy'}
          </div>
        )
      }
    </div>
  );
};

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;

export default ActionButton;
