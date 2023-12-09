/// <reference types="react-scripts" />
import React from "react";
import ReactDOM from "react-dom/client";
import CatRoutes from "./client/components/Routes";
import "./client/asset/App.css";

const ROOT = ReactDOM.createRoot(document.getElementById("root"));
ROOT.render(
  <React.StrictMode>
    <CatRoutes> </CatRoutes>
  </React.StrictMode>
);

// import reportWebVitals from './client/reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//reportWebVitals();
