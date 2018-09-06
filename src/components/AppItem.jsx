import React from 'react';
import Proptypes from 'prop-types';

import ActionButton from './ActionButton';
import '../assets/css/AppItem.css';

const propTypes = {
  /**
   * The call back method for adding an app.
   */
  addApp: Proptypes.func,
  /**
   * The app code value.
   */
  code: Proptypes.string,
  /**
   * The color property of the app.
   */
  color: Proptypes.string,
  /**
   * The call back method for destroying an app.
   */
  destroyApp: Proptypes.func,
  /**
   * The display property of the app.
   */
  display: Proptypes.string,
};

/**
 * Constructs the required data associated with an app while adding.
 * @param {string} code - the code for the app.
 * @param {string} color - the color property.
 * @param {string} display - the display value.
 */
function constructAppData(code, color, display) {
  return (
    {
      code,
      color,
      display,
      time: new Date().getTime(),
    }
  );
}

const AppItem = (props) => {
  const {
    addApp, code, color, destroyApp, display,
  } = props;

  return (
    <div className={`app-item app-item-${color}`}>
      <span className="app-name">
        {display}
      </span>
      <div className="app-action-group">
        <ActionButton
          onClick={() => destroyApp(code)}
          size="small"
          type="destroy"
        />
        <ActionButton
          onClick={() => addApp(constructAppData(code, color, display))}
          color={color}
          size="small"
          type="add"
        />
      </div>
    </div>
  );
};

AppItem.propTypes = propTypes;

export default AppItem;
