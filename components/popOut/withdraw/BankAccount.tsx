import React from "react";
import { callApi } from "../../../scripts/ApiClient";
import { popOutHandler } from "../../../scripts/PopOutHandler";
import { ApiPath, PopOutType } from "../../../scripts/WebConstant";
import { ImageContainer } from "../../share/ImageContainer";

interface Props {
  index: number;
  detail: IBankAccount;
  locked?: boolean;
  onRemoveCallback?: NoParamReturnNulFunction;
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
    const { bankName, bankAccName, bankAccNumber, iconUrl } = detail;
    const maskCardNumber = bankAccNumber.substr(bankAccNumber.length - 4, 4);

    const { hoverRemoveBtn } = this.state;
    const removeLabel = locked ? null : (
      <div
        className="remove-label"
        onClick={this._onRemoveAccount}
        onMouseEnter={this._onMouseEnterRemove}
        onMouseLeave={this._onMouseExitRemove}
        style={{ color: hoverRemoveBtn ? "black" : "#a6a6a6" }}
      >
        解除
      </div>
    );

    return (
      <div
        className="withdraw-detail-container row-container center"
        key={`withdraw-detail-container-${index}`}
        style={{ cursor: `${locked ? "context-menu" : "pointer"}` }}
        onClick={this._onSelectAccount}
      >
        <div className="bank-logo">
          <ImageContainer src={`bank_logo/${iconUrl}`} scale={0.5} />
        </div>
        <div className="bank-detail-container column-container">
          <div className="bank-label">{bankName}</div>
          <div className="bank-label">储蓄卡</div>
        </div>
        <div className="owner-detail-container column-container center">
          <div className="withdraw-label">{`卡户名 : ${bankAccName}`}</div>
          <div className="bank-number-label row-container">
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>{maskCardNumber}</span>
          </div>
        </div>
        {removeLabel}
      </div>
    );
  }

  private _onSelectAccount(): void {
    const { locked, detail } = this.props;
    const { hoverRemoveBtn } = this.state;
    if (!hoverRemoveBtn && !locked) {
      popOutHandler.showPopOut(PopOutType.WITHDRAW_DETAIL, {
        detail: detail,
      });
    }
  }

  private _onRemoveAccount(): void {
    const { locked, detail, onRemoveCallback } = this.props;
    if (!locked) {
      const onResultReturn = (result, error): void => {
        if (result && !error) {
          onRemoveCallback && onRemoveCallback();
        }
      };

      const params = new FormData();
      params.append("withdraw_account_id", detail.accountId);

      const config = {
        path: ApiPath.DELETE_WITHDRAW_ACCOUNT,
        callback: onResultReturn,
        params: params,
      };
      callApi(config);
    }
  }

  private _onMouseEnterRemove(): void {
    const { locked } = this.props;
    const { hoverRemoveBtn } = this.state;
    if (!hoverRemoveBtn && !locked) {
      this.setState({ hoverRemoveBtn: true });
    }
  }

  private _onMouseExitRemove(): void {
    const { locked } = this.props;
    const { hoverRemoveBtn } = this.state;
    if (hoverRemoveBtn && !locked) {
      this.setState({ hoverRemoveBtn: false });
    }
  }
}

export { BankAccount };
