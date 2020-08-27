import React, { useState, useEffect } from "react";

// Components
import { renderLoginBar } from "../components/LoginBar";
import { renderUtilityBar } from "../components/UtilityBar";
import { renderGameListBar } from "../components/GameListBar";
import { renderSlider } from "../components/Slider";
import { renderNoticeBoard } from "../components/NoticeBoard";
import { renderCard } from "../components/Card";
import { renderEventBar } from "../components/EventBar";
import { renderCustomerService } from "../components/CustomerService";
import { renderSponsorBar } from "../components/SponsorBar";
import { renderPopOut } from "../components/PopOut";
import { PopOutType } from "../model/WebConstant";

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
        const maxWidth = isMobile ? 375 : 1920;
        const newScale = (window.innerWidth - scrollBarWidth) / maxWidth;
        setScale(newScale <= 0.66 ? 0.66 : newScale);

        console.log(window.innerWidth);
      };

      onResize();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    });
  };
  checkView();

  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState(0);

  const showPopOut = (popOutType: PopOutType): void => {
    setToggle(true);
    setType(popOutType);
  };

  const hidePopOut = (): void => {
    setToggle(false);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (e): void => {
    setUsername(e.target.value);
  };

  const updatePassword = (e): void => {
    console.log(e);
    setPassword(e.target.value);
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const updateActiveIndex = (value: number): void => {
    setActiveIndex(value);
  };

  const updateAnimating = (value: boolean): void => {
    setAnimating(value);
  };

  const [rewardState, setRewardState] = useState(0);
  const rewardClaim = (): void => {
    const newState = rewardState + 1 > 3 ? 0 : rewardState + 1;
    setRewardState(newState);
  };

  const props: Props = {
    isMobile,
    scale,

    toggle,
    type,
    showPopOut,
    hidePopOut,

    username,
    password,
    updateUsername,
    updatePassword,

    activeIndex,
    updateActiveIndex,
    animating,
    updateAnimating,

    rewardState,
    rewardClaim,
  };

  if (isMobile) {
    return renderMobileView(props);
  } else {
    return renderBrowserView(props);
  }
}

function renderMobileView(props: Props): JSX.Element {
  return (
    <div id="main-container">
      <div id="map-mobile" style={{ transform: `scale(${props.scale})` }}>
        {renderLoginBar(props)}
        {renderSlider(props)}
        {renderNoticeBoard(props)}
        {renderCard(props)}
        {renderEventBar(props)}
        {renderPopOut(props)}
      </div>
    </div>
  );
}

function renderBrowserView(props: Props): JSX.Element {
  return (
    <div id="main-container">
      <div id="map-browser" style={{ transform: `scale(${props.scale})` }}>
        {renderLoginBar(props)}
        {renderUtilityBar()}
        {renderGameListBar()}
        {renderSlider(props)}
        {renderNoticeBoard(props)}
        {renderCard(props)}
        {renderEventBar(props)}
        {renderCustomerService()}
        {renderSponsorBar()}
        {renderPopOut(props)}
      </div>
    </div>
  );
}
