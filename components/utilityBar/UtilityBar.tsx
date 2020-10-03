import React from "react";
import Link from "next/link";

import { ImageContainer } from "../share/ImageContainer";
import { UtilityItem } from "./UtilityItem";

import { PopOutType } from "../../scripts/WebConstant";
import { dataSource } from "../../scripts/dataSource/DataSource";
import { popOutHandler } from "../../scripts/PopOutHandler";
import { WalletDropdown } from "./WalletDropdown";
import { convertToTwoDecimal } from "../../scripts/Utils";

interface Props {
  showHome: NoParamReturnNulFunction;
}

interface State {
  toggleWallet: boolean;
}

class UtilityBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toggleWallet: false,
    };

    this._scrollToEventElement = this._scrollToEventElement.bind(this);
    this._onPopOutClicked = this._onPopOutClicked.bind(this);
    this._onWalletToggle = this._onWalletToggle.bind(this);
  }

  public render(): JSX.Element {
    const { toggleWallet } = this.state;
    const { playerModel } = dataSource;
    const balance = playerModel ? playerModel.wallets.maohuang : 0;
    const walletDropdown = playerModel ? (
      <WalletDropdown toggle={toggleWallet} model={playerModel.wallets} />
    ) : null;

    return (
      <div id="utility-bar-container">
        <div id="utility-items-container" className="row-container center">
          <div id="logo-container">
            <ImageContainer src={"logo.png"} />
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
              this._onPopOutClicked(PopOutType.DEPOSIT_WALLET, {
                selectedIndex: 0,
                selectedTransaction: 0,
              });
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
            label={`猫皇余额 : ${convertToTwoDecimal(balance)}`}
            onClick={this._onWalletToggle}
          >
            {walletDropdown}
          </UtilityItem>
        </div>
      </div>
    );
  }

  private _scrollToEventElement(): void {
    const { showHome } = this.props;
    showHome && showHome();

    const element = document.getElementById("event-bar-container-browser");
    element && element.scrollIntoView();
  }

  private _onPopOutClicked(
    type: PopOutType,
    customData?: GenericObjectType
  ): void {
    const { playerModel } = dataSource;
    if (playerModel) {
      popOutHandler.showPopOut(type, customData);
    } else {
      popOutHandler.showPopOut(PopOutType.LOGIN);
    }
  }

  private _onWalletToggle(): void {
    const { playerModel } = dataSource;
    if (playerModel) {
      this.setState({ toggleWallet: !this.state.toggleWallet });
    } else {
      popOutHandler.showPopOut(PopOutType.LOGIN);
    }
  }
}

export { UtilityBar };
