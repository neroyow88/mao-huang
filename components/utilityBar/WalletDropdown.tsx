import React from "react";

import { WalletButtons } from "./WalletButtons";
import { WalletList } from "./WalletList";

import { convertToTwoDecimal } from "../../scripts/Utils";
import { popOutHandler } from "../../scripts/PopOutHandler";
import { ApiPath, PopOutType } from "../../scripts/WebConstant";
import { callApi } from "../../scripts/ApiClient";

interface Props {
  toggle: boolean;
  walletList: { [keys: string]: IWalletList };
  onRefreshCallback: NoParamReturnNulFunction;
}

interface State {
  isLoading: boolean;
  autoTransferOn: boolean;
}

class WalletDropdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      autoTransferOn: true,
      isLoading: true,
    };

    this._onAutoTransferClicked = this._onAutoTransferClicked.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._onClickRetrieve = this._onClickRetrieve.bind(this);
    this._onClickHistory = this._onClickHistory.bind(this);
  }

  public componentDidMount(): void {
    const onResultReturn = (result, error): void => {
      if (result && !error) {
        this.setState({ autoTransferOn: result.data.value === "1" });
      }
    };
    const config = {
      path: ApiPath.GET_AUTO_TRANSFER_STATUS,
      callback: onResultReturn,
    };
    callApi(config);
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.walletList !== this.props.walletList) {
      this.setState({ isLoading: false });
    }
  }

  public render(): JSX.Element {
    const { toggle, walletList } = this.props;
    const { autoTransferOn } = this.state;
    const toggleButtonStyle = {
      transform: `translateX(${autoTransferOn ? "150%" : "0%"})`,
    };

    let totalBalance = 0;
    Object.keys(walletList).forEach((key: string): void => {
      totalBalance += walletList[key].balance;
    });

    return (
      <div
        id="wallet-container"
        className="column-container"
        style={{ display: toggle ? "block" : "none" }}
      >
        <div id="wallet-title-container" className="row-container">
          <div id="wallet-title" className="yellow">
            自动转帐
          </div>
          <div id="toggle-container" onClick={this._onAutoTransferClicked}>
            <div
              id="toggle-on"
              style={{
                backgroundColor: autoTransferOn ? "#01a201" : "#ff0000",
              }}
            ></div>
            <div
              id="toggle-label"
              className="white"
              style={{ left: autoTransferOn ? "0px" : "15px" }}
            >
              {autoTransferOn ? "ON" : "OFF"}
            </div>
            <div id="toggle-button" style={toggleButtonStyle}></div>
          </div>
        </div>
        <div id="wallet-title-description" className="white">
          启动后, 馀额将自动转换到游戏里
        </div>
        <div
          id="wallet-total-balance-container"
          className="wallet-item-container row-container"
        >
          <div className="wallet-label yellow">总馀额</div>
          <div className="wallet-label row-container white">
            <div id="refresh-button" onClick={this._onRefresh}>
              <span>刷新</span>
            </div>
            {convertToTwoDecimal(totalBalance)}
          </div>
        </div>
        <div id="separator"></div>
        <WalletList walletList={walletList} />
        <WalletButtons
          onClickRetrieve={this._onClickRetrieve}
          onClickHistory={this._onClickHistory}
        />
      </div>
    );
  }

  private _onAutoTransferClicked(): void {
    const { isLoading, autoTransferOn } = this.state;
    if (!isLoading) {
      const onResultReturn = (result, error): void => {
        if (result && !error) {
          this.setState({
            autoTransferOn: result.data.value === "1",
            isLoading: false,
          });
        }
      };
      const config = {
        path: ApiPath.UPDATE_AUTO_TRANSFER_STATUS,
        callback: onResultReturn,
      };
      callApi(config);
      this.setState({
        autoTransferOn: !autoTransferOn,
        isLoading: true,
      });
    }
  }

  private _onRefresh(): void {
    const { isLoading } = this.state;
    if (!isLoading) {
      const { onRefreshCallback } = this.props;
      this.setState({ isLoading: true });
      onRefreshCallback && onRefreshCallback();
    }
  }

  private _onClickRetrieve(): void {
    const { isLoading } = this.state;
    if (!isLoading) {
      const onResultReturn = (result, error): void => {
        if (result && !error) {
          const { onRefreshCallback } = this.props;
          onRefreshCallback && onRefreshCallback();
        }
      };

      const config = {
        path: ApiPath.RESTORE_BALANCE,
        callback: onResultReturn,
      };
      callApi(config);
      this.setState({ isLoading: true });
    }
  }

  private _onClickHistory(): void {
    popOutHandler.showPopOut(PopOutType.HISTORY);
  }
}

export { WalletDropdown };
