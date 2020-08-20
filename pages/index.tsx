import React, { useState, useEffect } from "react";

// Components
import LoginBar from "../components/LoginBar";
import UtilityBar from "../components/UtilityBar";
import GameListBar from "../components/GameListBar";
import Slider from "../components/Slider";
import NoticeBoard from "../components/NoticeBoard";
import Card from "../components/Card";
import EventBar from "../components/EventBar";

const styles = {
  mainContainer: {
    position: "relative",
  },
  map: {
    position: "absolute",
    width: "1920px",
    transformOrigin: "top left",
    backgroundColor: "#1E202F",
  },
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);

  const checkView = () => {
    useEffect(() => {
      const { isMobile } = require("react-device-detect");
      setIsMobile(isMobile);

      const onResize = () => {
        const scrollBarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        console.log(scrollBarWidth);
        const newScale = (window.innerWidth - scrollBarWidth) / 1920;
        console.log(newScale);
        setScale(newScale <= 0.66 ? 0.66 : newScale);
      };

      onResize();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
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
    <div id="main-container" style={styles.mainContainer}>
      <div
        id="map"
        style={Object.assign({}, styles.map, {
          transform: `scale(${scale})`,
        })}
      >
        {LoginBar()}
        {UtilityBar()}
        {GameListBar()}
        {Slider()}
        {NoticeBoard()}
        {Card()}
        {EventBar()}
      </div>
    </div>
  );
}
