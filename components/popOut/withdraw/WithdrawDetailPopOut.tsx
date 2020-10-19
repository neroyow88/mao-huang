import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../share/PopOutTitle";
import { BankAccount } from "./BankAccount";
import { FormInputBox } from "../../share/FormInputBox";
import { FormButton } from "../../share/FormButton";

import { popOutHandler } from "../../../scripts/PopOutHandler";
import { PopOutType, ApiPath } from "../../../scripts/WebConstant";

import customStyle from "../../../styles/module/Modal.module.scss";
import { callApi } from "../../../scripts/ApiClient";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

class WithdrawDetailPopOut extends React.Component<Props> {
  private _amountRef: RefObject<HTMLInputElement>;
  private _pinNumberRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this._amountRef = React.createRef();
    this._pinNumberRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._backToPrevious = this._backToPrevious.bind(this);
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
    const { toggle, scale, customData } = this.props;
    const { detail } = customData;

    return (
      <Modal
        isOpen={toggle}
        toggle={this._backToPrevious}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="快速提款" onHide={this._backToPrevious} />
          <div
            id="withdraw-detail-container"
            className="pop-out-form-container column-container center"
          >
            <BankAccount index={0} detail={detail} locked />
            <div id="withdraw-time-label">
              提款时间 : 早上8:00 至次日凌晨2:00。
            </div>
            <div id="withdraw-limit-label">
              单笔提款 : 下限为30元,上限为20万元。
            </div>
            <form autoComplete="off" onSubmit={this._onFormSubmitted}>
              <FormInputBox
                id="phonenumber"
                placeholder="请在此输入提款金额"
                inputRef={this._amountRef}
                number
              />
              <FormInputBox
                id="pinnumber"
                type="password"
                placeholder="请输入猫皇提款密码"
                leftImage={"pop_out/password_logo.png"}
                inputRef={this._pinNumberRef}
                number
              />
              <div id="withdraw-buttons-container" className="row-container">
                <FormButton
                  label="返回上页"
                  backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                  onClick={this._backToPrevious}
                />
                <FormButton
                  label="确认提款"
                  backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                  submit
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const amount = this._amountRef.current.value;
    const pinNumber = this._pinNumberRef.current.value;
    const { detail } = this.props.customData;

    const onResultReturn = (result: GenericObjectType, error: string): void => {
      if (result && !error) {
        popOutHandler.hidePopOut();
      }
    };

    const params = new FormData();
    params.append("withdraw_account_id", detail.accountId);
    params.append("amount", amount);
    params.append("secure_password", pinNumber);

    const config = {
      path: ApiPath.SUBMIT_WITHDRAW,
      result: onResultReturn,
      params: params,
    };
    callApi(config);
  }

  private _backToPrevious(): void {
    popOutHandler.showPopOut(PopOutType.WITHDRAW_SELECTION);
  }
}

export { WithdrawDetailPopOut };
