import React, { useState, useEffect } from "react";

// Components
import LoginBar from "../components/LoginBar";
import UtilityBar from "../components/UtilityBar";
import GameListBar from "../components/GameListBar";
import Slider from "../components/Slider";

const styles = {
  mainContainer: {
    width: "1920px",
    transformOrigin: "top left",
  },
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);

  const checkView = () => {
    useEffect(() => {
      const { isMobile } = require("react-device-detect");
      setIsMobile(isMobile);
      setScale(window.innerWidth / 1920);
    });
  };
  checkView();

  if (isMobile) {
    return renderMobileView();
  } else {
    return renderBrowserView(scale);
  }
}

function renderMobileView(): JSX.Element {
  return <div id="main-container"></div>;
}

function renderBrowserView(scale: number): JSX.Element {
  return (
    <div
      id="main-container"
      style={Object.assign({}, styles.mainContainer, {
        transform: `scale(${scale})`,
      })}
    >
      {LoginBar()}
      {UtilityBar()}
      {GameListBar()}
      {Slider()}
    </div>
  );
}
