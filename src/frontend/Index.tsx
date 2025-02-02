import React from "react";
import { createRoot } from "react-dom/client";
import "./globals.scss";
import classes from "./index.module.scss";
import { cls } from "../common/util.js";

const App = () => {
  return <h1 className={cls(classes.header)}>Hello World from React!</h1>;
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
