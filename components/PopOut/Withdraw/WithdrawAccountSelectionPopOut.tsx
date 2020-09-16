import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../PopOutTitle";
import { EmptyBankAccount } from "./EmptyBankAccount";
import { BankAccount } from "./BankAccount";

import { dataSource } from "../../../model/DataSource";

import customStyle from "../../../styles/module/AccountModal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  showPopOut: (any: number, data?: GenericObjectType) => void;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

class WithdrawAccountSelectionPopOut extends React.Component<Props> {
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
    const { toggle, scale, showPopOut, hidePopOut } = this.props;
    const { withdrawDetails } = dataSource.playerModel;
    const components = [];

    for (let i = 0; i < 3; i++) {
      const detail = withdrawDetails[i];
      if (detail) {
        components.push(
          <BankAccount index={i} detail={detail} showPopOut={showPopOut} />
        );
      } else {
        components.push(<EmptyBankAccount index={i} showPopOut={showPopOut} />);
      }
    }

    const title =
      withdrawDetails.length > 0 ? (
        <div id="withdraw-label">请选择您的银行卡后再进行提款,谢谢。</div>
      ) : (
        <div id="withdraw-label">
          每位会员最多绑定<span>3</span>张银行卡,若未设置,请先设置提款银行卡。
        </div>
      );

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
          <div id="withdraw-container" className="column-container center">
            {title}
            <div id="withdraw-bank-container">{components}</div>
          </div>
        </div>
      </Modal>
    );
  }
}

export { WithdrawAccountSelectionPopOut };
