import "./globals.css";
import React from "react";
import { createRoot } from "react-dom/client";
const App = () => {
  return <h1>About me</h1>;
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
