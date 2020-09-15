import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "./PopOutTitle";

import customStyle from "../../styles/module/AccountModal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  showPopOut: (any: number, data?: GenericObjectType) => void;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customPopOutData: GenericObjectType;
}

class WithdrawWalletPopOut extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
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
    const { toggle, scale, hidePopOut } = this.props;
    const components = [];

    return (
      <Modal
        isOpen={toggle}
        toggle={hidePopOut}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="快速提款" hidePopOut={hidePopOut} />
          <div id="withdraw-label">请选择您的银行卡后再进行提款,谢谢。</div>
          <div id="withdraw-bank-container">{components}</div>
        </div>
      </Modal>
    );
  }

  private _renderEmptyAccount(): JSX.Element {}
  private _renderBankAccount(): JSX.Element {}
}

export { WithdrawWalletPopOut };
