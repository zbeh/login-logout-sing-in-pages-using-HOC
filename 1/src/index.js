import React from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactDOMClient from "react-dom/client";
const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
