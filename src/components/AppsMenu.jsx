import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActionButton from './ActionButton';
import AppItem from './AppItem';
import { addServer, destroyServer } from '../actions/serverActions';
import { addApp, destroyApp } from '../actions/appActions';
import '../assets/css/AppsMenu.css';

const propTypes = {
  /**
   * Dispatch method to add an app.
   */
  dispatchAddApp: PropTypes.func,
  /**
   * Dispatch method to destroy an app.
   */
  dispatchDestroyApp: PropTypes.func,
  /**
   * Dispatch method to add a server.
   */
  dispatchAddServer: PropTypes.func,
  /**
   * Dispatch method to destroy a server.
   */
  dispatchDestroyServer: PropTypes.func,
};

const AppsMenu = (props) => {
  const {
    dispatchAddApp, dispatchDestroyApp, dispatchAddServer, dispatchDestroyServer,
  } = props;

  return (
    <div className="apps-menu">
      <div className="server-actions">
        <ActionButton onClick={dispatchAddServer} includeCaption size="large" type="add" />
        <ActionButton onClick={dispatchDestroyServer} includeCaption size="large" type="destroy" />
      </div>
      <div className="available-apps-section">
        <div className="app-section-header">
          Available Apps
        </div>
        <AppItem
          addApp={dispatchAddApp}
          code="Hd"
          color="magenta"
          destroyApp={dispatchDestroyApp}
          display="Hadoop"
        />
        <AppItem
          addApp={dispatchAddApp}
          code="Ra"
          color="blueviolet"
          destroyApp={dispatchDestroyApp}
          display="Rails"
        />
        <AppItem
          addApp={dispatchAddApp}
          code="Ch"
          color="deepskyblue"
          destroyApp={dispatchDestroyApp}
          display="Chronos"
        />
        <AppItem
          addApp={dispatchAddApp}
          code="St"
          color="lightgreen"
          destroyApp={dispatchDestroyApp}
          display="Storm"
        />
        <AppItem
          addApp={dispatchAddApp}
          code="Sp"
          color="greenyellow"
          destroyApp={dispatchDestroyApp}
          display="Spark"
        />
      </div>
    </div>
  );
};

AppsMenu.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
  dispatchAddApp: (data) => {
    dispatch(addApp(data));
  },

  dispatchDestroyApp: (data) => {
    dispatch(destroyApp(data));
  },

  dispatchAddServer: () => {
    dispatch(addServer());
  },

  dispatchDestroyServer: () => {
    dispatch(destroyServer());
  },
});

export default connect(null, mapDispatchToProps)(AppsMenu);
