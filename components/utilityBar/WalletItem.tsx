import React from "react";

import { convertToTwoDecimal } from "../../scripts/Utils";

interface Props {
  index: number;
  title: string;
  balance: number;
}

interface State {}

class WalletItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { index, title, balance } = this.props;
    const style = { backgroundColor: index % 2 === 1 ? "#1E202F" : "#34363F" };

    return (
      <div
        className="wallet-item-container row-container"
        key={`wallet-item-container-${index}`}
        style={style}
      >
        <div className="wallet-label white" key={`wallet-name-${index}`}>
          {title}
        </div>
        <div className="wallet-label white" key={`wallet-balance-${index}`}>
          {convertToTwoDecimal(balance)}
        </div>
      </div>
    );
  }
}

export { WalletItem };
