import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
import { PopOutTitle } from "./PopOutTitle";
import { apiClient } from "../../model/ApiClient";
import { NoticePopOutConfig, ApiPath } from "../../model/WebConstant";

import customStyle from "../../styles/module/AccountModal.module.scss";
import { ErrorType } from "../../model/data/Error";
import { popOutHandler } from "../../model/PopOutHandler";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

class RegisterPopOut extends React.Component<Props> {
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
          <PopOutTitle label="注册会员" onHide={onHide} />
          <div id="register-form-container" className="pop-out-form-container">
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
                onClick={(): void => {
                  console.log("Verification code send");
                }}
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
            <div id="register-help-bar" className="row-container center">
              <div id="form-label">注册即表示同意接受</div>
              <div className="form-link">「服务条款」</div>
              <div className="form-link">已有账号? 立即登录</div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const username = this._usernameRef.current.value;
    const password = this._passwordRef.current.value;
    const phoneNumber = this._phoneNumberRef.current.value;
    const verificationCode = this._verificationCodeRef.current.value;

    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        if (err === ErrorType.INVALID_VERIFICATION_CODE) {
          popOutHandler.showNotice(
            NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
          );
        } else if (err === ErrorType.USER_ALREADY_EXIST) {
          popOutHandler.showNotice(NoticePopOutConfig.USERNAME_ALREADY_EXIST);
        }
      } else {
        popOutHandler.showNotice(NoticePopOutConfig.REGISTER_SUCCESS);
      }
    };

    apiClient.callApi(
      ApiPath.REGISTER,
      { username, password, phoneNumber, verificationCode },
      onResultReturn
    );
  }
}

export { RegisterPopOut };
