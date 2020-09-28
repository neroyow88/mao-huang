import React from "react";
import { ImageHandler } from "../ImageHandler";
import { EventRewardButton } from "./EventRewardButton";

import { dataSource } from "../../model/DataSource";

interface Props {}

class EventBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._renderButtonItem = this._renderButtonItem.bind(this);
  }

  public render(): JSX.Element {
    const { isMobile } = dataSource.systemModel;
    if (isMobile) {
      return (
        <div id="event-bar-container-mobile">
          <div id="image-container-mobile">
            <ImageHandler src={"mobile/event_bar/event_bg.png"} scale={0.33} />
            <ImageHandler
              src={"mobile/event_bar/event_title.png"}
              scale={0.33}
            />
            <ImageHandler
              src={"mobile/event_bar/event_title_2.png"}
              scale={0.33}
            />
          </div>
          <div id="button-container">
            <ImageHandler src={"mobile/event_bar/yellow_button.png"} />
            <div id="button-label">打卡领现金</div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="event-bar-container-browser">
          <div id="background-image-container">
            <ImageHandler src="event_bar/520_slot_bar.png" />
          </div>
          <div id="number-image-container" className="row-container">
            <EventRewardButton value={5} />
            <EventRewardButton value={2} />
            <EventRewardButton value={0} />
          </div>
          <div id="title-container" className="row-container center">
            <img src="event_bar/title_01.png"></img>
            <img src="event_bar/title_02.png"></img>
          </div>
          <div id="buttons-container" className="row-container center">
            {this._renderButtonItem("button_blue.png", "活动详情", "white", 1)}
            {this._renderButtonItem(
              "button_yellow.png",
              "打卡领现金",
              "black",
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
}

export { EventBar };
