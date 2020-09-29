import React from "react";

import { InstructionBox } from "./InstructionBox";

interface Props {
  balance: number;
  onBack: NoParamReturnNulFunction;
  onConfirm: NoParamReturnNulFunction;
}

class WeChatDeposit extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._descriptionBox = this._descriptionBox.bind(this);
    this._renderButtons = this._renderButtons.bind(this);

    this._onBack = this._onBack.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
  }

  public render(): JSX.Element {
    const { balance } = this.props;

    return (
      <div
        id="deposit-instruction-container"
        className="column-container center"
        style={{
          background: "url(wallet/pay_wechat_bg.png) no-repeat center",
        }}
      >
        <div id="deposit-instruction-content" className="column-container">
          <InstructionBox index={0} title="开户银行" value="平安银行" />
          <InstructionBox index={1} title="户名" value="猫皇皇" canCopy />
          <InstructionBox
            index={2}
            title="卡(账)号"
            value="6666555566663333999"
            canCopy
          />
          <InstructionBox
            index={3}
            title="充值金额"
            value={`${balance}`}
            optionalText="元"
            canCopy
          />
        </div>
        <div id="deposit-description-content" className="column-container">
          <div className="description-label">
            猫皇财务部已经收到您发出的
            <span>{`${balance}`}元</span>
            充值通知，请在
            <span>10分钟</span>
            内完成转账。
          </div>
          {this._descriptionBox(
            "转账成功后，您的金额即时到账，并收到到账提示。"
          )}
          {this._descriptionBox(
            "转账金额必须与充值金额一致，否则无法成功到账。"
          )}
        </div>
        {this._renderButtons()}
      </div>
    );
  }

  private _descriptionBox(label: string, isStar?: boolean): JSX.Element {
    if (isStar) {
      return (
        <div className="description-label">
          <div className="star-container">*</div>
          {label}
        </div>
      );
    } else {
      return <div className="description-label">{label}</div>;
    }
  }

  private _renderButtons(): JSX.Element {
    return (
      <div id="deposit-buttons-container" className="row-container center">
        <div className="deposit-button center" onClick={this._onBack}>
          <div className="deposit-button-label">返回上页</div>
        </div>
        <div className="deposit-button center" onClick={this._onConfirm}>
          <div className="deposit-button-label">完成转帐</div>
        </div>
      </div>
    );
  }

  private _onBack(): void {
    const { onBack } = this.props;
    onBack && onBack();
  }

  private _onConfirm(): void {
    const { onConfirm } = this.props;
    onConfirm && onConfirm();
  }
}

export { WeChatDeposit };
