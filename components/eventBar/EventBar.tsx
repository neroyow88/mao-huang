import React from "react";

import { EventRewardButton } from "./EventRewardButton";
import { EventBarButton } from "./EventBarButton";
import { ImageContainer } from "../share/ImageContainer";

import { ApiPath } from "../../scripts/WebConstant";
import { callApi } from "../../scripts/ApiClient";
import { isSameDay } from "../../scripts/Utils";

interface Props {
  isMobile: boolean;
  isLogin: boolean;
}

interface State {
  claimValue: number;
  canClaim: boolean;
}

class EventBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      claimValue: 0,
      canClaim: false,
    };

    this._onActivityClicked = this._onActivityClicked.bind(this);
    this._onClaimClicked = this._onClaimClicked.bind(this);
    this._getDailyReward = this._getDailyReward.bind(this);
  }

  public componentDidUpdate(prevProps: Props): void {
    if (!prevProps.isLogin && this.props.isLogin) {
      const onResultReturn = (result, error): void => {
        if (result && !error) {
          const { count, updated_at } = result.data;
          const value = this._getDailyReward(count);
          const currentDate = new Date();
          const claimDate = new Date(updated_at);
          const canClaim = !isSameDay(currentDate, claimDate);
          this.setState({
            claimValue: value,
            canClaim: canClaim,
          });
        }
      };

      const config = {
        path: ApiPath.GET_DAILY_CHECK_IN,
        callback: onResultReturn,
      };
      callApi(config);
    }
  }

  public render(): JSX.Element {
    const { isMobile } = this.props;
    const { claimValue, canClaim } = this.state;

    if (isMobile) {
      return (
        <div id="event-bar-container-mobile">
          <div id="image-container-mobile">
            <ImageContainer
              src={"mobile/event_bar/event_bg.png"}
              scale={0.33}
            />
            <ImageContainer
              src={"mobile/event_bar/event_title.png"}
              scale={0.33}
            />
            <ImageContainer
              src={"mobile/event_bar/event_title_2.png"}
              scale={0.33}
            />
          </div>
          <div id="button-container">
            <ImageContainer src={"mobile/event_bar/yellow_button.png"} />
            <div id="button-label">打卡领现金</div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="event-bar-container-browser">
          <div id="background-image-container">
            <ImageContainer src="event_bar/520_slot_bar.png" />
          </div>
          <div id="number-image-container" className="row-container">
            <EventRewardButton
              value={5}
              canClaim={claimValue === 5 && canClaim}
            />
            <EventRewardButton
              value={2}
              canClaim={claimValue === 2 && canClaim}
            />
            <EventRewardButton
              value={0}
              canClaim={claimValue === 0 && canClaim}
            />
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
    // const { banners } = dataSource.serverModel;
    // popOutHandler.showPopOut(PopOutType.BANNER, {
    //   src: banners[1].popOutSrc,
    // });
  }

  private _onClaimClicked(): void {}

  private _getDailyReward(dailyCount: number): number {
    const count = dailyCount % 3;
    switch (count) {
      case 0:
        return 5;
      case 1:
        return 2;
      case 2:
        return 0;
    }

    return 0;
  }
}

export { EventBar };
