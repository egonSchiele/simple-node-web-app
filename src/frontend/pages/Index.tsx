import "./globals.css";
import React from "react";
import { createRoot } from "react-dom/client";
import classes from "./index.module.css";
import { cls } from "@/common/util.js";

const App = () => {
  return (
    <div className={cls(classes.container)}>
      <a href="https://github.com/egonSchiele/simple-node-web-app">
        <img
          className=" rounded-2xl hover:scale-105 cursor-pointer"
          src="/images/hello.png"
          alt="logo"
        />
      </a>
      <h1 className="text-white font-bold text-3xl">Simple Node Web App</h1>
      <p>
        A template for building web apps in Node, with React and Express.
        <br />
        Learn more on{" "}
        <a href="https://github.com/egonSchiele/simple-node-web-app">Github</a>.
      </p>
    </div>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
