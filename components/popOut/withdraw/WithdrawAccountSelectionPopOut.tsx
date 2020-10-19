import React from "react";
import { Modal } from "reactstrap";

import { EmptyBankAccount } from "./EmptyBankAccount";
import { BankAccount } from "./BankAccount";

import { PopOutTitle } from "../../share/PopOutTitle";
import { callApi } from "../../../scripts/ApiClient";
import { ApiPath } from "../../../scripts/WebConstant";

import customStyle from "../../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

interface State {
  bankAccounts: IBankAccount[];
}

class WithdrawAccountSelectionPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      bankAccounts: [],
    };

    this._getAccount = this._getAccount.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      this._getAccount(transitionComplete);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide } = this.props;
    const { bankAccounts } = this.state;
    const components = [];

    for (let i = 0; i < 3; i++) {
      const detail = bankAccounts[i];
      if (detail) {
        components.push(
          <BankAccount
            index={i}
            detail={detail}
            onRemoveCallback={this._getAccount}
            key={`bank-account-${i}`}
          />
        );
      } else {
        components.push(
          <EmptyBankAccount index={i} key={`bank-account-${i}`} />
        );
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

  private _getAccount(callback?: NoParamReturnNulFunction): void {
    const onResultReturn = (result, error): void => {
      if (result && !error) {
        const tempAcc = [];
        const data = result.data;
        const keys = Object.keys(data);
        if (keys.length > 0) {
          keys.forEach((key: string): void => {
            tempAcc.push({
              accountId: key,
              bankName: data[key].bank_name,
              bankAccName: data[key].account_realname,
              bankAccNumber: data[key].account_num,
              bankAccBranch: data[key].account_branch,
              iconUrl: data[key].icon_url,
            });
          });
        }

        this.setState({ bankAccounts: tempAcc });
        callback && callback();
      }
    };

    const config = {
      path: ApiPath.GET_WITHDRAW_ACCOUNTS,
      callback: onResultReturn,
    };
    callApi(config);
  }
}

export { WithdrawAccountSelectionPopOut };
