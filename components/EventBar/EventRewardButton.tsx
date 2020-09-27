import React from "react";
import { apiClient } from "../../model/ApiClient";
import { audioHandler } from "../../model/AudioHandler";
import { dataSource } from "../../model/DataSource";
import { ApiPath, AudioList } from "../../model/WebConstant";
import { ImageHandler } from "../ImageHandler";

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
      <div id="reward-anim">{`+${value}`}</div>
    ) : null;

    return (
      <div
        className="reward-button"
        key={`reward-button-${value}`}
        onClick={this._onClaimReward}
      >
        <ImageHandler src={src} />
        {rewardAnim}
      </div>
    );
  }

  private _onClaimReward(): void {
    const { value } = this.props;
    const { playerModel } = dataSource;
    const isOn = playerModel && playerModel.dailyReward === value;

    if (isOn) {
      const onResultReturn = (result: GenericObjectType, err: string): void => {
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
          dataSource.updatePlayerModel(result);
        }
      };

      apiClient.callApi(
        ApiPath.CLAIM_DAILY_REWARD,
        { username: playerModel.username, value },
        onResultReturn
      );
    }
  }
}

export { EventRewardButton };
