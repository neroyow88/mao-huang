import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "../share/FormInputBox";
import { FormButton } from "../share/FormButton";
import { PopOutTitle } from "../share/PopOutTitle";

import { callApi } from "../../scripts/ApiClient";
import { NoticePopOutConfig, ApiPath } from "../../scripts/WebConstant";
import { ErrorType } from "../../scripts/server/Error";
import { popOutHandler } from "../../scripts/PopOutHandler";

import customStyle from "../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

class ForgotPasswordPopOut extends React.Component<Props> {
  private _usernameRef: RefObject<HTMLInputElement>;
  private _passwordRef: RefObject<HTMLInputElement>;
  private _phoneNumberRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this._usernameRef = React.createRef();
    this._passwordRef = React.createRef();
    this._phoneNumberRef = React.createRef();
    this._verificationCodeRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._getVerificationCode = this._getVerificationCode.bind(this);
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
          <PopOutTitle label="忘记密码" onHide={onHide} />
          <div
            id="forgot-password-form-container"
            className="pop-out-form-container"
          >
            <form autoComplete="off" onSubmit={this._onFormSubmitted}>
              <FormInputBox
                id="username"
                placeholder="请输入用户名"
                leftImage={"pop_out/account_logo.png"}
                rightImage={"pop_out/check.png"}
                min={4}
                max={11}
                inputRef={this._usernameRef}
              />
              <FormInputBox
                id="password"
                placeholder="请设置新密码"
                type="password"
                leftImage={"pop_out/password_logo.png"}
                min={6}
                max={12}
                inputRef={this._passwordRef}
              />
              <FormInputBox
                id="phonenumber"
                placeholder="请输入您的手机号码"
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
        </div>
      </Modal>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const username = this._usernameRef.current.value;
    const newPassword = this._passwordRef.current.value;
    const phoneNumber = this._phoneNumberRef.current.value;
    const verificationCode = this._verificationCodeRef.current.value;

    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        if (err === ErrorType.INVALID_USER) {
          popOutHandler.showNotice(
            NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
          );
        }
      } else {
        popOutHandler.hidePopOut();
        popOutHandler.showNotice(NoticePopOutConfig.CHANGE_PASSWORD_SUCCESS);
      }
    };

    const params = new FormData();
    params.append("username", username);
    params.append("password", newPassword);
    params.append("password_repeat", newPassword);
    params.append("handphone", phoneNumber);
    params.append("tac", verificationCode);

    const config = {
      path: ApiPath.FORGOT_PASSWORD,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }

  private _getVerificationCode(): void {
    const username = this._usernameRef.current.value;
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
    params.append("username", username);
    params.append("handphone", phoneNumber);

    const config = {
      path: ApiPath.REQUEST_FORGOT_PASSWORD_TAC,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }
}

export { ForgotPasswordPopOut };
