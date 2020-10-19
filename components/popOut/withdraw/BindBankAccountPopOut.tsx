import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "../../share/FormInputBox";
import { FormButton } from "../../share/FormButton";
import { PopOutTitle } from "../../share/PopOutTitle";

import { popOutHandler } from "../../../scripts/PopOutHandler";
import { PopOutType, ApiPath } from "../../../scripts/WebConstant";
import { callApi } from "../../../scripts/ApiClient";

import customStyle from "../../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  transitionComplete: NoParamReturnNulFunction;
}

interface State {
  bankList: IBankList[];
}

class BindBankAccountPopOut extends React.Component<Props, State> {
  private _bankTypeRef: RefObject<HTMLSelectElement>;
  private _branchName: RefObject<HTMLInputElement>;
  private _accountNameRef: RefObject<HTMLInputElement>;
  private _accountNumberRef: RefObject<HTMLInputElement>;
  private _verifiedAccountNumberRef: RefObject<HTMLInputElement>;
  private _pinNumberRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      bankList: [],
    };

    this._bankTypeRef = React.createRef();
    this._branchName = React.createRef();
    this._accountNameRef = React.createRef();
    this._accountNumberRef = React.createRef();
    this._verifiedAccountNumberRef = React.createRef();
    this._pinNumberRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._backToPrevious = this._backToPrevious.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const onResultReturn = (result, error): void => {
        if (result && !error) {
          const tempBanks = [];
          const data = result.data;
          Object.keys(data).forEach((key: string): void => {
            tempBanks.push({
              bankId: key,
              bankName: data[key],
            });
          });

          console.log(tempBanks);
          this.setState({ bankList: tempBanks });
          transitionComplete();
        }
      };

      callApi({
        path: ApiPath.GET_WITHDRAW_BANK_LIST,
        callback: onResultReturn,
      });
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale } = this.props;
    const { bankList } = this.state;

    const options = bankList.map((bank: IBankList, index) => {
      return (
        <option value={bank.bankId} key={`bank-option-${index}`}>
          {bank.bankName}
        </option>
      );
    });

    return (
      <Modal
        isOpen={toggle}
        toggle={this._backToPrevious}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="添加提款账号" onHide={this._backToPrevious} />
          <div
            id="withdraw-add-form-container"
            className="pop-out-form-container"
          >
            <form autoComplete="off" onSubmit={this._onFormSubmitted}>
              <select required ref={this._bankTypeRef} defaultValue={-1}>
                <option value="-1" disabled selected hidden>
                  请选择开户银行
                </option>
                {options}
              </select>
              <FormInputBox
                id="branchname"
                placeholder="请输入开户支行"
                inputRef={this._branchName}
                number
              />
              <FormInputBox
                id="username"
                placeholder="请输入开户人姓名"
                inputRef={this._accountNameRef}
                number
              />
              <FormInputBox
                id="cardnumber"
                placeholder="请输入银行卡号"
                inputRef={this._accountNumberRef}
                number
              />
              <FormInputBox
                id="verifiedcardnumber"
                placeholder="请再次确认银行卡号"
                inputRef={this._verifiedAccountNumberRef}
                number
              />
              <FormInputBox
                id="pinnumber"
                type="password"
                placeholder="请输入提款密码"
                leftImage={"pop_out/password_logo.png"}
                inputRef={this._pinNumberRef}
                number
              />

              <FormButton
                label="确认绑定"
                backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                submit
              />
            </form>
          </div>
        </div>
      </Modal>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();

    const bankType = this._bankTypeRef.current.value;
    const branchName = this._branchName.current.value;
    const accountName = this._accountNameRef.current.value;
    const accountNumber = this._accountNumberRef.current.value;
    const verifiedAccountNumber = this._verifiedAccountNumberRef.current.value;
    const pinNumber = this._pinNumberRef.current.value;

    const onResultReturn = (result, error): void => {
      if (result && !error) {
        popOutHandler.showPopOut(PopOutType.WITHDRAW_SELECTION);
      }
    };

    const params = new FormData();
    params.append("bank_id", bankType);
    params.append("account_branch", branchName);
    params.append("account_realname", accountName);
    params.append("account_num", accountNumber);
    params.append("account_num_repeat", verifiedAccountNumber);
    params.append("secure_password", pinNumber);

    const config = {
      path: ApiPath.ADD_WITHDRAW_ACCOUNT,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }

  //#region Utils
  private _backToPrevious(): void {
    popOutHandler.showPopOut(PopOutType.WITHDRAW_SELECTION);
  }
  //#endregion
}

export { BindBankAccountPopOut };
