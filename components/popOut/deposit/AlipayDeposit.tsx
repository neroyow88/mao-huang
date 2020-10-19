import React, { RefObject } from "react";

import { FormInputBox } from "../../share/FormInputBox";
import { FormButton } from "../../share/FormButton";
import { ImageContainer } from "../../share/ImageContainer";
import { ApiPath } from "../../../scripts/WebConstant";
import { callApi } from "../../../scripts/ApiClient";

interface Props {
  amount: string;
  accountId: string;
  depositId: string;
  qrUrl: string;
  onBack: NoParamReturnNulFunction;
  onConfirm: NoParamReturnNulFunction;
}

interface State {
  copiedId: number;
}

class AlipayDeposit extends React.Component<Props, State> {
  private _transactionIdRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      copiedId: -1,
    };

    this._transactionIdRef = React.createRef();

    this._onBack = this._onBack.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
  }

  public render(): JSX.Element {
    const { amount, qrUrl } = this.props;
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
            <ImageContainer src={qrUrl} />
          </div>
          <div id="deposit-amount-label">
            充值金额 <span>{amount}</span>元
          </div>
          <FormInputBox
            id="invoice"
            placeholder="扫码支付成功后,请在此输入订单号后4位数字"
            inputRef={this._transactionIdRef}
          />
          <div id="deposit-sample-container" className="row-container">
            <div id="deposit-sample-label-left" style={searchStyle}>
              支付宝app扫一扫
              <div id="sample-image-left">
                <ImageContainer src="wallet/alipay_sample.jpg" scale={0.3} />
              </div>
            </div>
            <div id="deposit-sample-label-right" style={searchStyle}>
              订单号样本
              <div id="sample-image-right">
                <ImageContainer src="wallet/invoice_sample.jpg" scale={0.5} />
              </div>
            </div>
          </div>
          <div id="alipay-buttons-container" className="row-container">
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
    const { amount, accountId, depositId, onBack } = this.props;

    const onResultReturn = (result, error): void => {
      if (result && !error) {
        onBack && onBack();
      }
    };
    const params = new FormData();
    params.append("account_id", accountId);
    params.append("amount", amount);
    params.append("deposit_id", depositId);
    params.append("cancel_type", "4");

    const config = {
      path: ApiPath.DEPOSIT_CANCEL,
      callback: onResultReturn,
      params: params,
    };

    callApi(config);
  }

  private _onConfirm(e): void {
    e.preventDefault();
    const transactionId = this._transactionIdRef.current.value;
    const { amount, accountId, depositId } = this.props;

    const onResultReturn = (result, error): void => {
      if (result && !error) {
        const { onConfirm } = this.props;
        //TODO: notice pop out
        onConfirm && onConfirm();
      }
    };

    const params = new FormData();
    params.append("account_id", accountId);
    params.append("amount", amount);
    params.append("deposit_id", depositId);
    params.append("transactionId", transactionId);

    const config = {
      path: ApiPath.DEPOSIT_CONFIRM,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }
}

export { AlipayDeposit };
