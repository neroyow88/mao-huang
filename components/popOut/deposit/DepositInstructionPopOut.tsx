import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../share/PopOutTitle";
import { BankDeposit } from "./BankDeposit";
import { WeChatDeposit } from "./WeChatDeposit";
import { AlipayDeposit } from "./AlipayDeposit";

import { DepositType, PopOutType } from "../../../scripts/WebConstant";
import { popOutHandler } from "../../../scripts/PopOutHandler";

import customStyle from "../../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

interface State {}

class DepositInstructionPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this._renderContent = this._renderContent.bind(this);
    this._onBack = this._onBack.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const interval = setInterval((): void => {
        transitionComplete();
        clearInterval(interval);
      }, 500);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide } = this.props;

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="游戏充值" onHide={onHide} />
          {this._renderContent()}
        </div>
      </Modal>
    );
  }

  private _renderContent(): JSX.Element {
    const { customData } = this.props;
    const { selectedIndex, amount } = customData;
    switch (selectedIndex) {
      case DepositType.ALIPAY:
        const { accountId, depositId, qrUrl } = customData;
        return (
          <AlipayDeposit
            amount={amount}
            accountId={accountId}
            depositId={depositId}
            qrUrl={qrUrl}
            onBack={this._onBack}
            onConfirm={this._onConfirm}
          />
        );
      case DepositType.BANK:
        const { bankName, bankAccName, bankAccNumber, remark } = customData;
        return (
          <BankDeposit
            bankName={bankName}
            bankAccName={bankAccName}
            bankAccNumber={bankAccNumber}
            amount={amount}
            remark={remark}
            onBack={this._onBack}
            onConfirm={this._onConfirm}
          />
        );
      case DepositType.WECHAT:
        return (
          <WeChatDeposit
            amount={amount}
            onBack={this._onBack}
            onConfirm={this._onConfirm}
          />
        );
      default:
        return null;
    }
  }

  private _onBack(): void {
    const { customData } = this.props;
    const { selectedIndex, selectedTransaction } = customData;
    popOutHandler.showPopOut(PopOutType.DEPOSIT_WALLET, {
      selectedIndex,
      selectedTransaction,
    });
  }

  private _onConfirm(): void {
    const { onHide } = this.props;
    onHide && onHide();
  }
}

export { DepositInstructionPopOut };
