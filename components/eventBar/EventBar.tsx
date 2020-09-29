import React from "react";
import { ImageHandler } from "../share/ImageHandler";
import { EventRewardButton } from "./EventRewardButton";

import { dataSource } from "../../scripts/dataSource/DataSource";
import { EventBarButton } from "./EventBarButton";
import { popOutHandler } from "../../scripts/PopOutHandler";
import { PopOutType } from "../../scripts/WebConstant";

interface Props {}

class EventBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onActivityClicked = this._onActivityClicked.bind(this);
    this._onClaimClicked = this._onClaimClicked.bind(this);
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
            <EventBarButton
              index={1}
              src={"button_blue.png"}
              label={"活动详情"}
              fontColor={"white"}
              onClick={this._onActivityClicked}
            />
            <EventBarButton
              index={2}
              src={"button_yellow.png"}
              label={"打卡领现金"}
              fontColor={"black"}
              onClick={this._onClaimClicked}
            />
          </div>
        </div>
      );
    }
  }

  private _onActivityClicked(): void {
    const { banners } = dataSource.serverModel;
    popOutHandler.showPopOut(PopOutType.BANNER, {
      src: banners[1].popOutSrc,
    });
  }

  private _onClaimClicked(): void {}
}

export { EventBar };
