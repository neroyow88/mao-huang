import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../share/PopOutTitle";
import { EmptyBankAccount } from "./EmptyBankAccount";
import { BankAccount } from "./BankAccount";

import { dataSource } from "../../../scripts/dataSource/DataSource";

import customStyle from "../../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
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
    const { toggle, scale, onHide } = this.props;
    const { bankAccounts } = dataSource.playerModel;
    const components = [];

    for (let i = 0; i < 3; i++) {
      const detail = bankAccounts[i];
      if (detail) {
        components.push(<BankAccount index={i} detail={detail} />);
      } else {
        components.push(<EmptyBankAccount index={i} />);
      }
    }

    const title =
      bankAccounts.length > 0 ? (
        <div id="withdraw-label">请选择您的银行卡后再进行提款,谢谢。</div>
      ) : (
        <div id="withdraw-label">
          每位会员最多绑定<span>3</span>张银行卡,若未设置,请先设置提款银行卡。
        </div>
      );

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="快速提款" onHide={onHide} />
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
