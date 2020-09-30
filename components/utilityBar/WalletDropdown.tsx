import React from "react";

import { WalletButtons } from "./WalletButtons";
import { WalletList } from "./WalletList";

import { IWalletModel } from "../../scripts/dataSource/PlayerModel";
import { convertToTwoDecimal } from "../../scripts/Utils";

interface Props {
  toggle: boolean;
  model: IWalletModel;
}

interface State {
  autoTransferOn: boolean;
}

class WalletDropdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      autoTransferOn: true,
    };

    this._onAutoTransferClicked = this._onAutoTransferClicked.bind(this);
    this._onClickRetrieve = this._onClickRetrieve.bind(this);
    this._onClickHistory = this._onClickHistory.bind(this);
  }

  public render(): JSX.Element {
    const { toggle, model } = this.props;
    const { autoTransferOn } = this.state;
    const toggleButtonStyle = {
      transform: `translateX(${autoTransferOn ? "150%" : "0%"})`,
    };

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
            <div id="toggle-on"></div>
            <div id="toggle-label" className="white">
              ON
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
            <div id="refresh-button">
              <span>刷新</span>
            </div>
            {convertToTwoDecimal(model.maohuang)}
          </div>
        </div>
        <div id="separator"></div>
        <WalletList model={model} />
        <WalletButtons
          onClickRetrieve={this._onClickRetrieve}
          onClickHistory={this._onClickHistory}
        />
      </div>
    );
  }

  private _onAutoTransferClicked(): void {
    this.setState({ autoTransferOn: !this.state.autoTransferOn });
  }

  private _onClickRetrieve(): void {}
  private _onClickHistory(): void {}
}

export { WalletDropdown };
