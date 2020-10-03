import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../share/PopOutTitle";
import { ImageContainer } from "../share/ImageContainer";

import customStyle from "../../styles/module/Modal.module.scss";
import { dataSource } from "../../scripts/dataSource/DataSource";
import { apiClient } from "../../scripts/ApiClient";
import { ApiPath } from "../../scripts/WebConstant";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

class CardPopOut extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._renderCoins = this._renderCoins.bind(this);
    this._renderDescriptionLabel = this._renderDescriptionLabel.bind(this);
    this._onClaimReward = this._onClaimReward.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const interval = setInterval((): void => {
        transitionComplete();
        clearInterval(interval);
      }, 500);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide, customData } = this.props;
    const { index, title } = customData;
    const { monthlyReward } = dataSource.playerModel;
    const openReward = monthlyReward[index.toString()];
    const { isRedeem, canClaim } = openReward;

    const roundCardStyle = { opacity: canClaim ? 1 : 0.5 };
    const buttonStyle = { opacity: canClaim && !isRedeem ? 1 : 0.5 };

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label={title} onHide={onHide} />
          <div id="card-pop-out-container" className="column-container center">
            <div id="round-card-image-container" style={roundCardStyle}>
              <ImageContainer
                src={`card/poker_0${index}_round.png`}
                scale={0.5}
              />
            </div>
            <div id="coins-container" className="row-container">
              {this._renderCoins()}
            </div>
            {this._renderDescriptionLabel()}
            <div
              id="coin-button-container"
              style={buttonStyle}
              onClick={this._onClaimReward}
            >
              <span>按此领取奖赏</span>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  private _renderCoins(): JSX.Element[] {
    const { index } = this.props.customData;
    const { monthlyReward } = dataSource.playerModel;
    const openReward = monthlyReward[index.toString()];
    const { accumulate } = openReward;

    const components = [];
    for (let i = 1; i <= 12; i++) {
      const redeemCoin =
        i <= accumulate ? (
          <div className="coin-image">
            <ImageContainer src={"card/coin.png"} scale={0.25} />
          </div>
        ) : null;

      components.push(
        <div className="coin-container">
          <div className="coin-background">
            <span>{i}</span>
          </div>
          {redeemCoin}
        </div>
      );
    }
    return components;
  }

  private _renderDescriptionLabel(): JSX.Element {
    const { index } = this.props.customData;
    const { monthlyReward } = dataSource.playerModel;
    const openReward = monthlyReward[index.toString()];
    const { reward, canClaim } = openReward;

    if (canClaim) {
      return (
        <div id="coin-description-label">
          您已点亮本月招财猫勋章喔!您已累计点亮6枚招财猫勋章,满12个月领取
          <span>{`${reward}元`}</span>招财奖赏。
        </div>
      );
    } else {
      return (
        <div id="coin-description-label">
          您还没点亮本月波斯猫勋章喔!您已累计点亮5枚波斯猫勋章,满12个月领取
          <span>{`${reward}元`}</span>波斯奖赏。
        </div>
      );
    }
  }

  private _onClaimReward(): void {
    const { index } = this.props.customData;
    const { playerModel } = dataSource;
    const { monthlyReward } = playerModel;
    const openReward = monthlyReward[index.toString()];
    const { canClaim, isRedeem } = openReward;

    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (result && !err) {
        dataSource.updatePlayerModel(result);
      }
    };

    if (canClaim && !isRedeem) {
      const { username } = playerModel;
      const params = {
        username,
        index,
      };
      apiClient.callApi(ApiPath.CLAIM_MONTHLY_REWARD, onResultReturn, params);
    }
  }
}

export { CardPopOut };
