import React from "react";

import { InstructionBox } from "./InstructionBox";

interface Props {
  bankName: string;
  bankAccName: string;
  bankAccNumber: string;
  amount: string;
  remark: string;
  onBack: NoParamReturnNulFunction;
  onConfirm: NoParamReturnNulFunction;
}

class BankDeposit extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._descriptionBox = this._descriptionBox.bind(this);
    this._renderButtons = this._renderButtons.bind(this);

    this._onBack = this._onBack.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
  }

  public render(): JSX.Element {
    const { bankName, bankAccName, bankAccNumber, amount, remark } = this.props;

    return (
      <div
        id="deposit-instruction-container"
        className="column-container center"
        style={{ background: "url(wallet/bank_bg.png) no-repeat center" }}
      >
        <div id="deposit-instruction-content" className="column-container">
          <InstructionBox index={0} title="开户银行" value={bankName} />
          <InstructionBox index={1} title="户名" value={bankAccName} canCopy />
          <InstructionBox
            index={2}
            title="卡(账)号"
            value={bankAccNumber}
            canCopy
          />
          <InstructionBox
            index={3}
            title="充值金额"
            value={`${amount}`}
            optionalText="元"
            canCopy
          />
          <InstructionBox
            index={4}
            title="附言或备注"
            value={remark}
            canCopy
            isStar
          />
        </div>
        <div id="deposit-description-content" className="column-container">
          <div className="description-label">
            猫皇财务部已经收到您发出的
            <span>{` ${amount}`}元 </span>
            充值通知，请在
            <span> 10分钟 </span>
            内完成转账。
          </div>
          {this._descriptionBox(
            "转账成功后，您的金额即时到账，并收到到账提示。"
          )}
          {this._descriptionBox(
            "附言或备注的编码由系统随机生成，用作快速核对充值，",
            true
          )}
          {this._descriptionBox("附言或备注如忘记填写，会延迟到账时间。", true)}
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

export { BankDeposit };
