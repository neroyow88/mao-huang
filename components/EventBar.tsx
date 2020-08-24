import React, { useState } from "react";

const rewardToggles = [true, false, false];

export default function EventBar(): JSX.Element {
  const [rewardState, setRewardState] = useState(0);
  const rewardClaim = (): void => {
    const newState = rewardState + 1 > 3 ? 0 : rewardState + 1;
    setRewardState(newState);

    for (let i = 0; i < rewardToggles.length; i++) {
      if (i === newState) {
        rewardToggles[i] = true;
      } else {
        rewardToggles[i] = false;
      }
    }
  };

  return (
    <div id="event-bar-container">
      <div id="image-container">
        <img src="event_bar/520_slot_bar.png"></img>
      </div>
      <div id="number-image-container" onClick={rewardClaim}>
        <img src={`event_bar/5_${getToggle(rewardToggles[0])}.png`}></img>
        <img src={`event_bar/2_${getToggle(rewardToggles[1])}.png`}></img>
        <img src={`event_bar/0_${getToggle(rewardToggles[2])}.png`}></img>
      </div>
      <div id="title-container">
        <img src="event_bar/title_01.png"></img>
        <img src="event_bar/title_02.png"></img>
      </div>
      <div id="buttons-container">
        {ButtonItem("event_bar/button_blue.png", "活动详情", "#ffffff", 1)}
        {ButtonItem("event_bar/button_yellow.png", "打卡领现金", "#000000", 2)}
      </div>
    </div>
  );
}

function getToggle(isOn: boolean): string {
  return isOn ? "light" : "dark";
}

function ButtonItem(
  background: string,
  label: string,
  fontColor: string,
  index: number
): JSX.Element {
  return (
    <div className="button-container" key={`button-container-${index}`}>
      <img src={background}></img>
      <div
        className="button-label"
        key={`button-label-${index}`}
        style={{ color: fontColor }}
      >
        {label}
      </div>
    </div>
  );
}
