import React, { RefObject } from "react";

import { FormButton } from "../../share/FormButton";
import { FormInputBox } from "../../share/FormInputBox";

import { NoticePopOutConfig, ApiPath } from "../../../scripts/WebConstant";
import { callApi } from "../../../scripts/ApiClient";
import { popOutHandler } from "../../../scripts/PopOutHandler";
import { ErrorType } from "../../../scripts/server/Error";

interface Props {}

class ProfileSetPinNumber extends React.Component<Props> {
  private _pinRef: RefObject<HTMLInputElement>;
  private _verifiedPinRef: RefObject<HTMLInputElement>;
  private _phoneNumberRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;
  private _isSubmitting = false;

  constructor(props: Props) {
    super(props);

    this._phoneNumberRef = React.createRef();
    this._verificationCodeRef = React.createRef();
    this._pinRef = React.createRef();
    this._verifiedPinRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._getVerificationCode = this._getVerificationCode.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div id="set-pin-container" className="pop-out-form-container">
        <form autoComplete="off" onSubmit={this._onFormSubmitted}>
          <FormInputBox
            id="pin"
            placeholder="请设置新提款密码"
            type="password"
            leftImage={"pop_out/password_logo.png"}
            min={6}
            max={12}
            inputRef={this._pinRef}
          />
          <FormInputBox
            id="verifiedpin"
            placeholder="请再次确认新提款密码"
            type="password"
            leftImage={"pop_out/password_logo.png"}
            min={6}
            max={12}
            inputRef={this._verifiedPinRef}
          />
          <FormInputBox
            id="phonenumber"
            placeholder="请输入注册手机号码"
            inputRef={this._phoneNumberRef}
          />
          <FormButton
            label="获取短信验证码"
            backgroundColor="#83D300"
            onClick={this._getVerificationCode}
          />
          <FormInputBox
            id="verificationcode"
            placeholder="请输入短信验证码"
            inputRef={this._verificationCodeRef}
          />
          <FormButton
            label="提交"
            backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
            submit
          />
        </form>
      </div>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();

    if (!this._isSubmitting) {
      const pin = this._pinRef.current.value;
      const verifiedPin = this._verifiedPinRef.current.value;
      const phoneNumber = this._phoneNumberRef.current.value;
      const verificationCode = this._verificationCodeRef.current.value;

      const onResultReturn = (result: GenericObjectType, err: string): void => {
        if (err && !result) {
          if (err === ErrorType.INVALID_USER) {
            popOutHandler.showNotice(
              NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
            );
          } else if (err === ErrorType.INVALID_VERIFICATION_CODE) {
            popOutHandler.showNotice(
              NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
            );
          } else if (err === ErrorType.PASSWORD_NOT_VERIFIED) {
            popOutHandler.showNotice(NoticePopOutConfig.PIN_NOT_VERIFIED);
          }
        } else {
          this._pinRef.current.value = "";
          this._verifiedPinRef.current.value = "";
          this._phoneNumberRef.current.value = "";
          this._verificationCodeRef.current.value = "";
          popOutHandler.showNotice(NoticePopOutConfig.SET_PIN_SUCCESS);
        }
        this._isSubmitting = false;
      };

      const params = new FormData();
      params.append("secure_password", pin);
      params.append("secure_password_repeat", verifiedPin);
      params.append("handphone", phoneNumber);
      params.append("tac", verificationCode);

      const config = {
        path: ApiPath.UPDATE_PIN,
        callback: onResultReturn,
        params: params,
      };
      callApi(config);
      this._isSubmitting = true;
    }
  }

  private _getVerificationCode(): void {
    const phoneNumber = this._phoneNumberRef.current.value;
    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        if (err === ErrorType.INVALID_PHONE_NUMBER) {
          popOutHandler.showNotice(
            NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
          );
        }
      }
    };

    const params = new FormData();
    params.append("handphone", phoneNumber);

    const config = {
      path: ApiPath.REQUEST_UPDATE_PIN_TAC,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }
}

export { ProfileSetPinNumber };
