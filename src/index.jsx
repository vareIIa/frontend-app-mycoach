import React from 'react';
import ReactDOM from 'react-dom';
import Chatbot from './components/Chatbot/Chatbot';
import './index.scss';  

const zoomStyle = {
  transform: 'scale(1.0)',
  transformOrigin: '0 0',
  width: '95%',
  height: '100%',
  overflow: 'hidden',
};

ReactDOM.render(
  <React.StrictMode>
    <div style={zoomStyle}>
      <Chatbot />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);