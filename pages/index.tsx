import React, { useState, useEffect } from "react";
import LoginBar from "../components/LoginBar";
import UtilityBar from "../components/UtilityBar";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const checkView = () => {
    useEffect(() => {
      const { isMobile } = require("react-device-detect");
      setIsMobile(isMobile);
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  };
  checkView();

  if (isMobile) {
    return renderMobileView();
  } else {
    return renderBrowserView(width, height);
  }
}

function renderMobileView(): JSX.Element {
  return <div id="main-container"></div>;
}

function renderBrowserView(width: number, height: number): JSX.Element {
  return (
    <div id="main-container" style={{ width: width, height: height }}>
      {LoginBar()}
      {UtilityBar()}
    </div>
  );
}
