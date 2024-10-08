import React from "react";
import ReactDOM from "react-dom/client";
import {BlocksProvider} from "./blocks";
import {HomePage} from "./pages/home";

import "./global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BlocksProvider>
      <HomePage />
    </BlocksProvider>
  </React.StrictMode>
);
