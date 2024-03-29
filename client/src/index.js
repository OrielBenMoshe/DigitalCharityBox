import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import './assets/fonts/NotoSerifHebrew-Black.ttf';
import './assets/fonts/NotoSerifHebrew-SemiBold.ttf';
import './assets/fonts/NotoSerifHebrew-Light.ttf';
import './assets/fonts/NotoSerifHebrew-Thin.ttf';

import { BrowserRouter } from "react-router-dom";

import { ConfigProvider } from "antd";
import heIL from "antd/lib/locale/he_IL";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={heIL} direction="rtl">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
