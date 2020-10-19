import React from "react";

import { ImageContainer } from "../share/ImageContainer";
import { audioHandler } from "../../scripts/AudioHandler";
import { ApiPath, AudioList } from "../../scripts/WebConstant";
import { callApi } from "../../scripts/ApiClient";

interface Props {
  value: number;
  canClaim: boolean;
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
    const { value, canClaim } = this.props;
    const src = `event_bar/${value}_${canClaim ? "light" : "dark"}.png`;

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
        style={{
          cursor: canClaim ? "pointer" : "auto",
        }}
      >
        <ImageContainer src={src} />
        {rewardAnim}
      </div>
    );
  }

  private _onClaimReward(): void {
    const { value, canClaim } = this.props;

    if (canClaim) {
      const onResultReturn = (
        result: GenericObjectType,
        error: string
      ): void => {
        if (result && !error) {
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
        }
      };

      const config = {
        path: ApiPath.DAILY_CHECK_IN,
        callback: onResultReturn,
      };
      callApi(config);
    }
  }
}

export { EventRewardButton };
