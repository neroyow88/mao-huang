import React from "react";
import { ImageContainer } from "../../share/ImageContainer";

import { PopOutType } from "../../../scripts/WebConstant";
import { popOutHandler } from "../../../scripts/PopOutHandler";

interface Props {
  index: number;
  detail: IWithdrawDetails;
  locked?: boolean;
}

interface State {
  hoverRemoveBtn: boolean;
}

class BankAccount extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hoverRemoveBtn: false,
    };

    this._onSelectAccount = this._onSelectAccount.bind(this);
    this._onRemoveAccount = this._onRemoveAccount.bind(this);
    this._onMouseEnterRemove = this._onMouseEnterRemove.bind(this);
    this._onMouseExitRemove = this._onMouseExitRemove.bind(this);
  }

  public render(): JSX.Element {
    const { index, detail, locked } = this.props;
    const { bankName, cardType, username, cardNumber } = detail;
    const maskCardNumber = cardNumber.substr(12, 4);

    return (
      <div
        className="withdraw-detail-container row-container center"
        key={`withdraw-detail-container-${index}`}
        style={{ cursor: `${locked ? "context-menu" : "pointer"}` }}
        onClick={(): void => {
          this._onSelectAccount(index);
        }}
      >
        <div className="bank-logo">
          <ImageContainer src="wallet/bank.png" scale={0.4} />
        </div>
        <div className="bank-detail-container column-container">
          <div className="bank-label">{bankName}</div>
          <div className="bank-label">{cardType}</div>
        </div>
        <div className="owner-detail-container column-container center">
          <div className="withdraw-label">{`卡户名 : ${username}`}</div>
          <div className="bank-number-label row-container">
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>{maskCardNumber}</span>
          </div>
        </div>
        <div
          className="remove-label"
          onClick={(): void => {
            this._onRemoveAccount(index);
          }}
          onMouseEnter={this._onMouseEnterRemove}
          onMouseLeave={this._onMouseExitRemove}
        >
          解除
        </div>
      </div>
    );
  }

  private _onSelectAccount(index: number): void {
    const { locked } = this.props;
    const { hoverRemoveBtn } = this.state;
    if (!hoverRemoveBtn && !locked) {
      popOutHandler.showPopOut(PopOutType.WITHDRAW_DETAIL, { index });
    }
  }

  private _onRemoveAccount(index: number): void {
    const { locked } = this.props;
    if (!locked) {
      console.log("remove ", index);
    }
  }

  private _onMouseEnterRemove(): void {
    if (!this.state.hoverRemoveBtn) {
      this.setState({ hoverRemoveBtn: true });
    }
  }

  private _onMouseExitRemove(): void {
    if (this.state.hoverRemoveBtn) {
      this.setState({ hoverRemoveBtn: false });
    }
  }
}

export { BankAccount };
