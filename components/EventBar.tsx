import React from "react";
import { utils } from "../model/Utils";

const rewardToggles = [true, false, false];

interface Props {}

interface State {
  reward: number;
}

class EventBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      reward: 0,
    };

    this._renderButtonItem = this._renderButtonItem.bind(this);
    this._onRewardClaim = this._onRewardClaim.bind(this);
  }

  public render(): JSX.Element {
    if (utils.isMobile) {
      return (
        <div id="event-bar-container-mobile">
          <div id="image-container-mobile">
            <img src="mobile/event_bar/event_bg.png"></img>
          </div>
          <div id="number-image-container">
            <img src="mobile/event_bar/event_title.png"></img>
          </div>
          <div id="number-image-container">
            <img src="mobile/event_bar/event_title_2.png"></img>
          </div>
        </div>
      );
    } else {
      const { reward } = this.state;

      for (let i = 0; i < rewardToggles.length; i++) {
        if (i === reward) {
          rewardToggles[i] = true;
        } else {
          rewardToggles[i] = false;
        }
      }

      return (
        <div id="event-bar-container-browser">
          <div id="image-container-browser">
            <img src="event_bar/520_slot_bar.png"></img>
          </div>
          <div id="number-image-container" onClick={this._onRewardClaim}>
            <img
              src={`event_bar/5_${rewardToggles[0] ? "light" : "dark"}.png`}
            />
            <img
              src={`event_bar/2_${rewardToggles[1] ? "light" : "dark"}.png`}
            />
            <img
              src={`event_bar/0_${rewardToggles[2] ? "light" : "dark"}.png`}
            />
          </div>
          <div id="title-container">
            <img src="event_bar/title_01.png"></img>
            <img src="event_bar/title_02.png"></img>
          </div>
          <div id="buttons-container">
            {this._renderButtonItem(
              "button_blue.png",
              "活动详情",
              "#ffffff",
              1
            )}
            {this._renderButtonItem(
              "button_yellow.png",
              "打卡领现金",
              "#000000",
              2
            )}
          </div>
        </div>
      );
    }
  }

  private _renderButtonItem(
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

  private _onRewardClaim(): void {
    const { reward } = this.state;
    const newReward = reward + 1 > 3 ? 0 : reward + 1;
    this.setState({ reward: newReward });
  }
}

export { EventBar };
