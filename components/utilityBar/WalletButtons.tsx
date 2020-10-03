import React from "react";

interface Props {
  onClickRetrieve: NoParamReturnNulFunction;
  onClickHistory: NoParamReturnNulFunction;
}

interface State {}

class WalletButtons extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this._onClickRetrieve = this._onClickRetrieve.bind(this);
    this._onClickHistory = this._onClickHistory.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div id="wallet-buttons-container" className="row-container">
        <div className="retrieve-button" onClick={this._onClickRetrieve}>
          <span>一键回收</span>
        </div>
        <div className="history-button" onClick={this._onClickHistory}>
          <span>交易纪录</span>
        </div>
      </div>
    );
  }

  private _onClickRetrieve(): void {}

  private _onClickHistory(): void {
    const { onClickHistory } = this.props;
    onClickHistory && onClickHistory();
  }
}

export { WalletButtons };
