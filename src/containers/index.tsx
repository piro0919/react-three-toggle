import Pages from "containers/pages";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "../reportWebVitals";

ReactDOM.render(
  <StrictMode>
    <Pages />
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
