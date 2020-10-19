import React from "react";
import Link from "next/link";

import { ImageContainer } from "../share/ImageContainer";
import { UtilityItem } from "./UtilityItem";
import { WalletDropdown } from "./WalletDropdown";

import {
  ApiPath,
  GameIdList,
  PlatformId,
  PopOutType,
} from "../../scripts/WebConstant";
import { popOutHandler } from "../../scripts/PopOutHandler";
import { callApi } from "../../scripts/ApiClient";
import { convertToTwoDecimal } from "../../scripts/Utils";
import { PlatformsModel } from "../../scripts/dataSource/PlatformsModel";

interface Props {
  isLogin: boolean;
  showHome: NoParamReturnNulFunction;
  model: PlatformsModel;
}

interface State {
  toggleWallet: boolean;
  walletList: { [keys: string]: IWalletList };
}

class UtilityBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toggleWallet: false,
      walletList: { "1": { constant: "MH", title: "猫皇余额", balance: 0 } },
    };

    this._scrollToEventElement = this._scrollToEventElement.bind(this);
    this._onPopOutClicked = this._onPopOutClicked.bind(this);
    this._onWalletToggle = this._onWalletToggle.bind(this);
    this._getBalance = this._getBalance.bind(this);
  }

  public componentDidUpdate(prevProps: Props): void {
    if (!prevProps.isLogin && this.props.isLogin) {
      this._getBalance();
    }
  }

  public render(): JSX.Element {
    const { isLogin } = this.props;
    const { toggleWallet, walletList } = this.state;

    const walletDropdown = isLogin ? (
      <WalletDropdown
        toggle={toggleWallet}
        walletList={walletList}
        onRefreshCallback={this._getBalance}
      />
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
                selectedIndex: "1",
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
              this._onPopOutClicked(PopOutType.TRANSFER_WALLET, {
                getBalance: this._getBalance,
              });
            }}
          />
          <UtilityItem
            label="留言信息"
            onClick={(): void => {
              this._onPopOutClicked(PopOutType.MAILBOX);
            }}
          />
          <UtilityItem
            label={`${
              walletList[PlatformId.MAOHUANG].title
            } : ${convertToTwoDecimal(
              walletList[PlatformId.MAOHUANG].balance
            )}`}
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
    const { isLogin } = this.props;
    if (isLogin) {
      popOutHandler.showPopOut(type, customData);
    } else {
      popOutHandler.showPopOut(PopOutType.LOGIN);
    }
  }

  private _onWalletToggle(): void {
    const { isLogin } = this.props;
    if (isLogin) {
      this.setState({ toggleWallet: !this.state.toggleWallet });
    } else {
      popOutHandler.showPopOut(PopOutType.LOGIN);
    }
  }

  private _getBalance(
    callback?: (value: { [keys: string]: IWalletList }) => void
  ): void {
    const onResultReturn = (result, error): void => {
      if (result && !error) {
        const { model } = this.props;
        const walletList = Object.create(null);

        GameIdList.forEach((id: PlatformId): void => {
          const wallet = model.getGameListById(id);
          walletList[id] = {
            constant: wallet ? wallet.constant : "MH",
            title: wallet ? wallet.name : "猫皇余额",
            balance: parseInt(result.data[id]),
          };
        });
        this.setState({ walletList: walletList });
        callback && callback(walletList);
      }
    };

    const config = {
      path: ApiPath.GET_TRANSFER_BALANCES,
      callback: onResultReturn,
    };
    callApi(config);
  }
}

export { UtilityBar };
