import React from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import classes from "./index.module.scss";
import { cls } from "@/common/util.js";

const App = () => {
  return (
    <h1 className={cls(classes.header, "bg-blue-500", "text-2xl", "font-bold")}>
      Hello World from React!
    </h1>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
