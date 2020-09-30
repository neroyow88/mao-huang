import React from "react";

interface Props {
  onClickRetrieve: NoParamReturnNulFunction;
  onClickHistory: NoParamReturnNulFunction;
}

interface State {}

class WalletButtons extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div id="wallet-buttons-container" className="row-container">
        <div className="retrieve-button">
          <span>一键回收</span>
        </div>
        <div className="history-button">
          <span>交易纪录</span>
        </div>
      </div>
    );
  }
}

export { WalletButtons };
