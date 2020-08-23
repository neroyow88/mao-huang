import React, { useState, useEffect } from "react";

// Components
import LoginBar from "../components/LoginBar";
import UtilityBar from "../components/UtilityBar";
import GameListBar from "../components/GameListBar";
import Slider from "../components/Slider";
import NoticeBoard from "../components/NoticeBoard";
import Card from "../components/Card";
import EventBar from "../components/EventBar";
import CustomerService from "../components/CustomerService";
import SponsorBar from "../components/SponsorBar";

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
        const newScale = (window.innerWidth - scrollBarWidth) / 1920;
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
    <div id="main-container">
      <div id="map" style={{ transform: `scale(${scale})` }}>
        {LoginBar()}
        {UtilityBar()}
        {GameListBar()}
        {Slider()}
        {NoticeBoard()}
        {Card()}
        {EventBar()}
        {CustomerService()}
        {SponsorBar()}
      </div>
    </div>
  );
}
