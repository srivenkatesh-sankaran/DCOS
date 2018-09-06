import React from 'react';

import AppsMenu from './AppsMenu';
import ServerCanvas from './ServerCanvas';
import '../assets/css/Master.css';

const AppContainer = () => (
  <div className="master-view">
    <AppsMenu />
    <ServerCanvas />
  </div>
);

export default AppContainer;
