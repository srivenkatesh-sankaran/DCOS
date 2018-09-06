import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import Server from './Server';
import { addServerSucceeded, destroyServerSucceeded } from '../actions/serverActions';
import '../assets/css/Server.css';

const propTypes = {
  /**
   * Redux state indicating an attempt to add an app.
   */
  addApp: Proptypes.number,
  /**
   * Redux state associated while adding an app.
   */
  appData: Proptypes.object,
  /**
   * Redux state indicating an attempt to add a server.
   */
  addServer: Proptypes.bool,
  /**
   * Redux state indicating the code for the app to destroy.
   */
  deleteCode: Proptypes.string,
  /**
   * Redux state indicating an attempt to destroy an app.
   */
  destroyApp: Proptypes.number,
  /**
   * Redux state indicating an attempt to destroy a server.
   */
  destroyServer: Proptypes.bool,
  /**
   * Dispatch method to indicate successful server addition.
   */
  dispatchAddServerSucceeded: Proptypes.func,
  /**
   * Dispatch method to indicate successful server destroy.
   */
  dispatchDestroyServerSucceeded: Proptypes.func,
};


class ServerCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.baseServerName = 'Server';
    this.lastUpdateDate = new Date();

    this.addNewApp = this.addNewApp.bind(this);
    this.addNewServer = this.addNewServer.bind(this);
    this.destroyLastServer = this.destroyLastServer.bind(this);
    this.findNextFreeServer = this.findNextFreeServer.bind(this);
    this.generateInitialServerList = this.generateInitialServerList.bind(this);

    this.state = {
      serverList: this.generateInitialServerList(),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      addApp, addServer, destroyApp, destroyServer,
    } = this.props;
    const { serverList } = this.state;

    const now = new Date();
    const milliSeconds = (now.getTime() - this.lastUpdateDate.getTime());

    // debounce addNewApp call.
    if (prevProps.addApp !== addApp && milliSeconds > 100) {
      this.addNewApp();
    }

    // debounce addNewApp call.
    if (prevProps.destroyApp !== destroyApp && milliSeconds > 100) {
      this.destroyLastApp();
    }

    if (addServer === true && prevState.serverList.length === serverList.length) {
      this.addNewServer();
    }

    if (destroyServer === true && prevState.serverList.length === serverList.length) {
      this.destroyLastServer();
    }

    // record lastUpdateDate for debounce.
    this.lastUpdateDate = new Date();
  }

  /**
   *  Add new app with the app data (comes from redux state).
   */
  addNewApp() {
    const serverIndex = this.findNextFreeServer();

    if (serverIndex < 0) {
      return;
    }

    const { appData } = this.props;
    const { serverList } = this.state;

    if (appData !== undefined && serverList[serverIndex].apps.length < 2) {
      appData.id = serverList[serverIndex].apps.length;
      appData.serverId = serverIndex;
      serverList[serverIndex].apps.push(appData);

      if (serverList[serverIndex].isEmpty) {
        serverList[serverIndex].isEmpty = false;
      }
    }

    this.setState({ serverList });
  }

  /**
   *  Add new server to the canvas.
   */
  addNewServer() {
    const { dispatchAddServerSucceeded } = this.props;
    const { serverList } = this.state;
    const serverId = serverList.length;

    const newServer = {
      id: serverId,
      name: this.baseServerName + serverId,
      apps: [],
      isEmpty: true,
    };

    this.setState({ serverList: serverList.concat(newServer) });
    dispatchAddServerSucceeded();
  }

  /**
   * Destroy the newly created instance of an app.
   */
  destroyLastApp() {
    const { deleteCode } = this.props;
    const { serverList } = this.state;
    let filteredApps = [];

    // filter all apps based on the deletecode.
    serverList.forEach((server) => {
      if (!server.isEmpty) {
        filteredApps = filteredApps.concat(server.apps.filter(app => app.code === deleteCode));
      }
    });

    if (filteredApps.length > 0) {
      // find the app to destroy from the filtered list based on time.
      const appToDestroy = filteredApps.reduce((prev, curr) => (
        prev.time > curr.time ? prev : curr
      ));

      const serverInstance = serverList[appToDestroy.serverId];
      // remove the app form the list.
      serverInstance.apps.splice(appToDestroy.id, 1);

      // update app related information based on new arrangement.
      serverInstance.isEmpty = serverInstance.apps.length === 0;
      if (!serverInstance.isEmpty) {
        serverInstance.apps.forEach((value, index) => { value.id = index; });
      }
    }

    this.setState({ serverList });
  }

  /**
   * Finds the next free available server from the list of servers.
   */
  findNextFreeServer() {
    const { serverList } = this.state;

    for (let i = 0; i < serverList.length; i += 1) {
      if (serverList[i].isEmpty) {
        return i;
      }

      if (serverList[i].apps.length === 1) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Destroy the last server from the list of servers.
   */
  destroyLastServer() {
    const { dispatchDestroyServerSucceeded } = this.props;
    const { serverList } = this.state;

    if (serverList.length > 0) {
      const { apps } = serverList[serverList.length - 1];

      if (apps.length > 0) {
        let newServerIndex = null;
        let newAppIndex = null;

        for (const app of apps) {
          if (!newAppIndex || newAppIndex >= 1) {
            newServerIndex = this.findNextFreeServer();
            if (newServerIndex < 0) {
              break;
            }
          }

          // re-allocate the apps from the server about to be destroyed.
          const newServerApps = serverList[newServerIndex].apps;

          newAppIndex = newServerApps.length;
          app.id = newAppIndex;
          app.serverId = newServerIndex;
          newServerApps[newAppIndex] = app;
          newAppIndex += 1;

          if (serverList[newServerIndex].isEmpty) {
            serverList[newServerIndex].isEmpty = false;
          }
        }
      }
    }

    // delete the last server after re-allocating apps.
    const newServerList = serverList.slice(0, -1);
    this.setState({ serverList: newServerList });
    dispatchDestroyServerSucceeded();
  }

  /**
   * Generate 4 servers to initialize the canvas.
   */
  generateInitialServerList() {
    const initialServerList = [];

    for (let i = 0; i < 4; i += 1) {
      initialServerList.push({
        id: i,
        name: `${this.baseServerName}${i}`,
        apps: [],
        isEmpty: true,
      });
    }
    return initialServerList;
  }

  render() {
    const { serverList } = this.state;

    return (
      <div className="server-canvas">
        <div className="server-canvas-title">
          Server Canvas
        </div>
        <div className="server-canvas-wrapper">
          {
            serverList.map(server => (
              <Server
                app1={server.apps && server.apps[0]}
                app2={server.apps && server.apps[1]}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

ServerCanvas.propTypes = propTypes;

const mapStateToProps = state => ({
  addApp: state.appState.addApp,
  addServer: state.serverState.addServer,
  appData: state.appState.appData,
  deleteCode: state.appState.deleteCode,
  destroyApp: state.appState.destroyApp,
  destroyServer: state.serverState.destroyServer,
});

const mapDispatchToProps = dispatch => ({
  dispatchAddServerSucceeded: () => {
    dispatch(addServerSucceeded());
  },

  dispatchDestroyServerSucceeded: () => {
    dispatch(destroyServerSucceeded());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerCanvas);
