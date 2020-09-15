import React from "react";
import { ImageHandler } from "./ImageHandler";
import { PopOutType } from "../model/WebConstant";

interface Props {
  showPopOut: (any: number, data?: GenericObjectType) => void;
}

class UtilityBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._renderUtilityItem = this._renderUtilityItem.bind(this);
    this._onDepositClicked = this._onDepositClicked.bind(this);
    this._onWithdrawClicked = this._onWithdrawClicked.bind(this);
  }

  public render(): JSX.Element {
    const balance = 2432.13;

    return (
      <div id="utility-bar-container">
        <div id="utility-items-container" className="row-container center">
          <div id="logo-container">
            <ImageHandler src={"logo.png"} />
          </div>
          {this._renderUtilityItem("猫皇", undefined, "520-logo2.png")}
          {this._renderUtilityItem("游戏充值", this._onDepositClicked)}
          {this._renderUtilityItem("快速提款", this._onWithdrawClicked)}
          {this._renderUtilityItem("户内转帐")}
          {this._renderUtilityItem("留言信息")}
          {this._renderUtilityItem(`猫皇余额 : ${balance}`)}
        </div>
      </div>
    );
  }

  private _renderUtilityItem(
    label: string,
    onClick?: NoParamReturnNulFunction,
    src?: string
  ): JSX.Element {
    const imageComponent = src ? (
      <div className="utility-image" onClick={onClick}>
        <ImageHandler src={src} />
      </div>
    ) : null;

    return (
      <div className="utility-item-container row-container">
        <div className="utility-label" onClick={onClick}>
          {label}
        </div>
        {imageComponent}
      </div>
    );
  }

  private _onDepositClicked(): void {
    const { showPopOut } = this.props;
    showPopOut &&
      showPopOut(PopOutType.DEPOSIT_WALLET, {
        selectedIndex: 0,
        selectedTransaction: 0,
      });
  }

  private _onWithdrawClicked(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.WITHDRAW_WALLET);
  }
}

export { UtilityBar };
