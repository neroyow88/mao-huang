import React from "react";

import { ImageContainer } from "../share/ImageContainer";

import { apiClient } from "../../scripts/ApiClient";
import { audioHandler } from "../../scripts/AudioHandler";
import { dataSource } from "../../scripts/dataSource/DataSource";
import { ApiPath, AudioList } from "../../scripts/WebConstant";

interface Props {
  value: number;
}

interface State {
  animated: boolean;
}

class EventRewardButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      animated: false,
    };

    this._onClaimReward = this._onClaimReward.bind(this);
  }

  public render(): JSX.Element {
    const { value } = this.props;
    const { playerModel } = dataSource;
    const isOn = playerModel && playerModel.dailyReward === value;
    const src = `event_bar/${value}_${isOn ? "light" : "dark"}.png`;

    const { animated } = this.state;
    const rewardAnim = animated ? (
      <div id="reward-anim">
        {value === 0 ? (
          <div id="heart-image">
            <ImageContainer src={"event_bar/heart.png"} scale={0.6} />
          </div>
        ) : (
          <div id="reward-number">{`+${value}`}</div>
        )}
      </div>
    ) : null;

    return (
      <div
        className="reward-button"
        key={`reward-button-${value}`}
        onClick={this._onClaimReward}
      >
        <ImageContainer src={src} />
        {rewardAnim}
      </div>
    );
  }

  private _onClaimReward(): void {
    const { value } = this.props;
    const { playerModel } = dataSource;

    if (playerModel) {
      const { dailyReward, username } = playerModel;
      if (dailyReward === value) {
        const onResultReturn = (
          result: GenericObjectType,
          err: string
        ): void => {
          console.log(result, err);
          if (err) {
          } else {
            this.setState({ animated: true });
            const interval = setInterval((): void => {
              this.setState({ animated: false });
              clearInterval(interval);
            }, 500);

            if (value === 0) {
              audioHandler.playAudio(AudioList.KISS);
            } else {
              audioHandler.playAudio(AudioList.MONEY);
            }
            // dataSource.updatePlayerModel(result);
          }
        };

        const params = {
          username,
          value,
        };
        apiClient.callApi(ApiPath.CLAIM_DAILY_REWARD, onResultReturn, params);
      }
    }
  }
}

export { EventRewardButton };
