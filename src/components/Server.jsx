import React from 'react';
import PropTypes from 'prop-types';

import Timer from './Timer';
import '../assets/css/Server.css';

const propTypes = {
  app1: PropTypes.object,
  app2: PropTypes.object,
};

const Server = (props) => {
  const { app1, app2 } = props;
  let renderApp1 = null;
  let renderApp2 = null;

  if (app1) {
    renderApp1 = (
      <div className={`app-details app-details-${app1.color}`}>
        <div className="app-code">
          {app1.code}
        </div>
        <div className="app-display">
          {app1.display}
        </div>
        <div className="app-timer">
          {/* send start time for app re-allocation during server deletion */}
          <Timer startTime={Math.round((new Date().getTime() - app1.time) / (1000 * 60))} />
        </div>
      </div>
    );
  }

  if (app2) {
    renderApp2 = (
      <div className={`app-details app-details-${app2.color}`}>
        <div className="app-code">
          {app2.code}
        </div>
        <div className="app-display">
          {app2.display}
        </div>
        <div className="app-timer">
          {/* send start time for app re-allocation during server deletion */}
          <Timer startTime={Math.round((new Date().getTime() - app1.time) / (1000 * 60))} />
        </div>
      </div>
    );
  }

  return (
    <div className="server-instance">
      {renderApp1}
      {renderApp2}
    </div>
  );
};

Server.propTypes = propTypes;

export default Server;
