import React from "react";

const rewardToggles = [true, false, false];

function renderEventBar(props: Props): JSX.Element {
  const { rewardState, rewardClaim } = props;

  for (let i = 0; i < rewardToggles.length; i++) {
    if (i === rewardState) {
      rewardToggles[i] = true;
    } else {
      rewardToggles[i] = false;
    }
  }

  return (
    <div id="event-bar-container">
      <div id="image-container">
        <img src="event_bar/520_slot_bar.png"></img>
      </div>
      <div id="number-image-container" onClick={rewardClaim}>
        <img src={`event_bar/5_${_getToggle(rewardToggles[0])}.png`}></img>
        <img src={`event_bar/2_${_getToggle(rewardToggles[1])}.png`}></img>
        <img src={`event_bar/0_${_getToggle(rewardToggles[2])}.png`}></img>
      </div>
      <div id="title-container">
        <img src="event_bar/title_01.png"></img>
        <img src="event_bar/title_02.png"></img>
      </div>
      <div id="buttons-container">
        {_buttonItem("event_bar/button_blue.png", "活动详情", "#ffffff", 1)}
        {_buttonItem("event_bar/button_yellow.png", "打卡领现金", "#000000", 2)}
      </div>
    </div>
  );
}

function _getToggle(isOn: boolean): string {
  return isOn ? "light" : "dark";
}

function _buttonItem(
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

export { renderEventBar };
