import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import Comments from "./components/Comments";
import Posts from "./components/Posts";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <h1>Resources</h1>
        <p>API comes with 2 resources:</p>
        <p>
          <button onClick={fetchDataPosts}>/posts</button> --- 100 posts
        </p>
        <p>
          <button>/comments</button> --- 500 comments
        </p>
        <div></div>
      </BrowserRouter>
    </>
  );
}
