import React from "react";
import Link from "next/link";

import { ImageHandler } from "../ImageHandler";
import { UtilityItem } from "./UtilityItem";

import { PopOutType } from "../../model/WebConstant";
import { dataSource } from "../../model/DataSource";

interface Props {
  showPopOut: (any: number, data?: GenericObjectType) => void;
}

interface State {
  toggleBalance: boolean;
}

class UtilityBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toggleBalance: false,
    };

    this._scrollToEventElement = this._scrollToEventElement.bind(this);
    this._onPopOutClicked = this._onPopOutClicked.bind(this);
    this._onBalanceHovered = this._onBalanceHovered.bind(this);
  }

  public render(): JSX.Element {
    const { balance } = dataSource.playerModel;

    return (
      <div id="utility-bar-container">
        <div id="utility-items-container" className="row-container center">
          <div id="logo-container">
            <ImageHandler src={"logo.png"} />
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          <UtilityItem
            label="猫皇"
            src="520-logo2.png"
            onClick={this._scrollToEventElement}
          />
          <UtilityItem
            label="游戏充值"
            onClick={(): void => {
              this._onPopOutClicked(PopOutType.DEPOSIT_WALLET);
            }}
          />
          <UtilityItem
            label="快速提款"
            onClick={(): void => {
              this._onPopOutClicked(PopOutType.WITHDRAW_SELECTION);
            }}
          />
          <UtilityItem
            label="户内转帐"
            onClick={(): void => {
              this._onPopOutClicked(PopOutType.TRANSFER_WALLET);
            }}
          />
          <UtilityItem
            label="留言信息"
            onClick={(): void => {
              this._onPopOutClicked(PopOutType.MAILBOX);
            }}
          />
          <UtilityItem
            label={`猫皇余额 : ${balance}`}
            onHover={this._onBalanceHovered}
          />
        </div>
      </div>
    );
  }

  private _scrollToEventElement(): void {
    const element = document.getElementById("event-bar-container-browser");
    element && element.scrollIntoView();
  }

  private _onPopOutClicked(type: PopOutType): void {
    const { showPopOut } = this.props;
    const { isLogin } = dataSource.playerModel;
    if (isLogin) {
      showPopOut && showPopOut(type);
    } else {
      showPopOut && showPopOut(PopOutType.LOGIN);
    }
  }

  private _onBalanceHovered(toggle: boolean): void {
    this.setState({ toggleBalance: toggle });
  }
}

export { UtilityBar };
