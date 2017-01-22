import React from 'react';
import ReactDOM from 'react-dom';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export const DevTools = createDevTools(
  <DockMonitor
    fluid
    defaultSize={1}
    changePositionKey="ctrl-shift-y"
    toggleVisibilityKey="ctrl-shift-h"
  >
    <LogMonitor />
  </DockMonitor>,
);

export const showDevTools = (store: any) => {
  const popup = window.open(null, 'Redux DevTools', 'menubar=no,location=no,resizable=yes,scrollbars=no,status=no');

  // Reload in case it already exists
  popup.location.reload();

  setTimeout(() => {
    popup.document.write('<div id="react-devtools-root"></div>');
    ReactDOM.render(<DevTools store={store} />, popup.document.getElementById('react-devtools-root'));
  }, 10);
};
