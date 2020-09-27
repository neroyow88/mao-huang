import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "../FormInputBox";
import { FormButton } from "../FormButton";
import { PopOutTitle } from "../PopOutTitle";

import {
  PopOutType,
  NoticePopOutConfig,
  ApiPath,
} from "../../../model/WebConstant";
import { apiClient } from "../../../model/ApiClient";

import customStyle from "../../../styles/module/AccountModal.module.scss";
import { popOutHandler } from "../../../model/PopOutHandler";

interface Props {
  toggle: boolean;
  scale: number;
  transitionComplete: NoParamReturnNulFunction;
}

class BindBankAccountPopOut extends React.Component<Props> {
  private _bankTypeRef: RefObject<HTMLSelectElement>;
  private _bankNameRef: RefObject<HTMLInputElement>;
  private _usernameRef: RefObject<HTMLInputElement>;
  private _cardNumberRef: RefObject<HTMLInputElement>;
  private _verifiedCardNumberRef: RefObject<HTMLInputElement>;
  private _pinNumberRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this._bankTypeRef = React.createRef();
    this._bankNameRef = React.createRef();
    this._usernameRef = React.createRef();
    this._cardNumberRef = React.createRef();
    this._verifiedCardNumberRef = React.createRef();
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
    const { toggle, scale } = this.props;

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
              <select required ref={this._bankTypeRef}>
                <option value="" disabled selected hidden>
                  请选择开户银行
                </option>
                <option value="0">平安银行</option>
                <option value="1">工商银行</option>
              </select>
              <FormInputBox
                id="bankname"
                placeholder="请输入开户支行"
                inputRef={this._bankNameRef}
                number
              />
              <FormInputBox
                id="username"
                placeholder="请输入开户人姓名"
                inputRef={this._usernameRef}
                number
              />
              <FormInputBox
                id="cardnumber"
                placeholder="请输入银行卡号"
                inputRef={this._cardNumberRef}
                number
              />
              <FormInputBox
                id="verifiedcardnumber"
                placeholder="请再次确认银行卡号"
                inputRef={this._verifiedCardNumberRef}
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
    const bankName = this._bankNameRef.current.value;
    const username = this._usernameRef.current.value;
    const cardNumber = this._cardNumberRef.current.value;
    const verifiedCardNumber = this._verifiedCardNumberRef.current.value;
    const pinNumber = this._pinNumberRef.current.value;

    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        if (err === "card") {
          popOutHandler.showNotice(
            NoticePopOutConfig.VERIFICATION_CARD_INCORRECT
          );
        }
      } else {
        const { bankType, bankName, username, cardNumber, pinNumber } = result;
        console.log(
          "account added: ",
          bankType,
          bankName,
          username,
          cardNumber,
          pinNumber
        );
        popOutHandler.showPopOut(PopOutType.WITHDRAW_SELECTION);
      }
    };

    const params = {
      bankType,
      bankName,
      username,
      cardNumber,
      verifiedCardNumber,
      pinNumber,
    };
    apiClient.callApi(ApiPath.ADD_BANK_ACCOUNT, params, onResultReturn);
  }

  //#region Utils
  private _backToPrevious(): void {
    popOutHandler.showPopOut(PopOutType.WITHDRAW_SELECTION);
  }
  //#endregion
}

export { BindBankAccountPopOut };
