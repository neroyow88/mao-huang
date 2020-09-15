import React, { RefObject } from "react";

import { FormInputBox } from "../FormInputBox";
import { FormButton } from "../FormButton";
import { ImageHandler } from "../../ImageHandler";

interface Props {
  balance: number;
  onBack: NoParamReturnNulFunction;
  onConfirm: NoParamReturnNulFunction;
}

interface State {
  copiedId: number;
}

class AlipayDeposit extends React.Component<Props, State> {
  private _invoicRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      copiedId: -1,
    };

    this._invoicRef = React.createRef();

    this._onBack = this._onBack.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
  }

  public render(): JSX.Element {
    const { balance } = this.props;
    const searchStyle = {
      backgroundImage: "url(wallet/search.png)",
      backgroundPosition: "100% 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "15px",
    };

    return (
      <div
        id="deposit-qr-instruction-container"
        className="column-container center"
      >
        <form autoComplete="off" onSubmit={this._onConfirm}>
          <div id="qr-code-instruction">打开支付宝APP扫一扫,向我付款</div>
          <div id="qr-code-image">
            <ImageHandler src={"wallet/alipay_qrcode.png"} scale={0.4} />
          </div>
          <div id="deposit-balance-label">
            充值金额 <span>{balance}</span>元
          </div>
          <FormInputBox
            id="invoice"
            placeholder="扫码支付成功后,请在此输入订单号后4位数字"
            inputRef={this._invoicRef}
          />
          <div id="deposit-sample-container" className="row-container">
            <div id="deposit-sample-label-left" style={searchStyle}>
              支付宝app扫一扫
              <div id="sample-image-left">
                <ImageHandler src="wallet/alipay_sample.jpg" scale={0.3} />
              </div>
            </div>
            <div id="deposit-sample-label-right" style={searchStyle}>
              订单号样本
              <div id="sample-image-right">
                <ImageHandler src="wallet/invoice_sample.jpg" scale={0.5} />
              </div>
            </div>
          </div>
          <div id="deposit-buttons-container" className="row-container">
            <FormButton
              label={"返回上页"}
              color="white"
              backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
              onClick={this._onBack}
            />
            <FormButton
              label={"提交订单号"}
              color="white"
              backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
              submit
            />
          </div>
        </form>
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

export { AlipayDeposit };
