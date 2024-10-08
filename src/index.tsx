import ReactDOM from "react-dom/client";
import {BlocksProvider} from "./blocks";
import {HomePage} from "./pages/home";

import "./global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BlocksProvider>
    <HomePage />
  </BlocksProvider>
);
