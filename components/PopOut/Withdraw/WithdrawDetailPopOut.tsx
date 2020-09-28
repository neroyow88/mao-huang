import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../Utility/PopOutTitle";
import { BankAccount } from "./BankAccount";
import { FormInputBox } from "../../Utility/FormInputBox";
import { FormButton } from "../../Utility/FormButton";

import { popOutHandler } from "../../../model/PopOutHandler";
import { dataSource } from "../../../model/DataSource";
import { apiClient } from "../../../model/ApiClient";
import {
  PopOutType,
  ApiPath,
  NoticePopOutConfig,
} from "../../../model/WebConstant";

import customStyle from "../../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

class WithdrawDetailPopOut extends React.Component<Props> {
  private _detail: IWithdrawDetails;
  private _amountRef: RefObject<HTMLInputElement>;
  private _pinNumberRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    const { index } = props.customData;
    const { bankAccounts } = dataSource.playerModel;
    this._detail = bankAccounts[index];

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
    const { index } = customData;
    const detail = this._detail;

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
            <BankAccount index={index} detail={detail} locked />
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
    const detail = this._detail;

    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        popOutHandler.showNotice(NoticePopOutConfig.PIN_INCORRECT);
      } else {
        const { invoice } = result;
        popOutHandler.showPopOut(PopOutType.WITHDRAW_SUCCESS, { invoice });
      }
    };

    const params = {
      amount,
      pinNumber,
      detail,
    };
    apiClient.callApi(ApiPath.WITHDRAW, params, onResultReturn);
  }

  private _backToPrevious(): void {
    popOutHandler.showPopOut(PopOutType.WITHDRAW_SELECTION);
  }
}

export { WithdrawDetailPopOut };
