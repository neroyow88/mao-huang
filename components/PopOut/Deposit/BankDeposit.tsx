import React from "react";

import { copyToClipboard } from "../../../model/Utils";

interface Props {
  balance: number;
  onBack: NoParamReturnNulFunction;
  onConfirm: NoParamReturnNulFunction;
}

interface State {
  copiedId: number;
}

class BankDeposit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      copiedId: -1,
    };

    this._instructionBox = this._instructionBox.bind(this);
    this._descriptionBox = this._descriptionBox.bind(this);
    this._renderButtons = this._renderButtons.bind(this);

    this._onBack = this._onBack.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
    this._onCopyText = this._onCopyText.bind(this);
  }

  public render(): JSX.Element {
    const { balance } = this.props;

    return (
      <div
        id="deposit-instruction-container"
        className="column-container center"
        style={{ background: "url(wallet/bank_bg.png) no-repeat center" }}
      >
        <div id="deposit-instruction-content" className="column-container">
          {this._instructionBox(0, "开户银行", "平安银行")}
          {this._instructionBox(1, "户名", "猫皇皇", true)}
          {this._instructionBox(2, "卡(账)号", "6666555566663333999", true)}
          {this._instructionBox(3, "充值金额", `${balance} 元`, true)}
          {this._instructionBox(4, "附言或备注", "B44B", true, true)}
        </div>
        <div id="deposit-description-content" className="column-container">
          <div className="description-label">
            猫皇财务部已经收到您发出的
            <span>{` ${balance}`}元 </span>
            充值通知，请在
            <span> 10分钟 </span>
            内完成转账。
          </div>
          {this._descriptionBox(
            "转账成功后，您的金额即时到账，并收到到账提示。"
          )}
          {this._descriptionBox(
            "附言或备注的编码由系统随机生成，用作快速核对充值，"
          )}
          {this._descriptionBox("附言或备注如忘记填写，会延迟到账时间。", true)}
          {this._descriptionBox(
            "转账金额必须与充值金额一致，否则无法成功到账。",
            true
          )}
        </div>
        {this._renderButtons()}
      </div>
    );
  }

  private _instructionBox(
    index: number,
    key: string,
    value: string,
    canCopy?: boolean,
    isStar?: boolean
  ): JSX.Element {
    const { copiedId } = this.state;
    const isCopied = copiedId === index;

    const copy = canCopy ? (
      <div
        className="copy-container"
        onClick={(): void => {
          this._onCopyText(index);
        }}
        style={{
          color: isCopied ? "white" : "#ff0000",
          backgroundColor: isCopied ? "#ff0000" : "transparent",
        }}
      >
        {isCopied ? "已复制" : "复制"}
      </div>
    ) : null;
    const star = isStar ? <div className="star-container">*</div> : null;

    return (
      <div className="instruction-label-container row-container">
        {star}
        <div className="instruction-label-stretch">{`${key}`}</div>
        <div className="instruction-label">:</div>
        <div id={`instruction-${index}`} className="instruction-label">
          {value}
        </div>
        {copy}
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

  private _onCopyText(id: number): void {
    const elem = document.getElementById(`instruction-${id}`);
    const succeed = copyToClipboard(elem);

    if (succeed) {
      this.setState({ copiedId: id });
    }
  }
}

export { BankDeposit };
