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

interface State {
  tutorialToggle: boolean;
}

class DepositInstructionPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tutorialToggle: false,
    };

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
    const { selectedIndex, balance } = customData;
    switch (selectedIndex) {
      case DepositType.ALIPAY:
        return (
          <AlipayDeposit
            balance={balance}
            onBack={this._onBack}
            onConfirm={this._onConfirm}
          />
        );
      case DepositType.BANK:
        return (
          <BankDeposit
            balance={balance}
            onBack={this._onBack}
            onConfirm={this._onConfirm}
          />
        );
      case DepositType.WECHAT:
        return (
          <WeChatDeposit
            balance={balance}
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
