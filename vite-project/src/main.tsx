import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root") as Element); // asで型をElementに変えることができる

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);