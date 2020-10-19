import React from "react";

interface Props {
  index: number;
  model: ITransactionHistory;
}

class HistoryDetail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { index, model } = this.props;
    const { createDate, type, status, amount } = model;
    const bgColor = index % 2 === 0 ? "" : "dark-background";

    return (
      <div
        className={`history-item-container history-content-font column-container ${bgColor}`}
      >
        <div className={`history-item-content row-container`}>
          <div className="date">{createDate}</div>
          <div className="transaction">
            <span>{type}</span>
          </div>
          <div className="status yellow">
            <span>{status}</span>
          </div>
          <div className="balance">
            <span>{amount}</span>
          </div>
        </div>
      </div>
    );
  }
}

export { HistoryDetail };
