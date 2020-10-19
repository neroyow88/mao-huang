import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "../share/FormInputBox";
import { FormButton } from "../share/FormButton";
import { PopOutTitle } from "../share/PopOutTitle";

import { callApi } from "../../scripts/ApiClient";
import {
  NoticePopOutConfig,
  ApiPath,
  ValidateState,
} from "../../scripts/WebConstant";
import { ErrorType } from "../../scripts/server/Error";
import { popOutHandler } from "../../scripts/PopOutHandler";

import customStyle from "../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

interface State {
  usernameValidate: ValidateState;
  phoneNumberValidate: ValidateState;
}

class RegisterPopOut extends React.Component<Props, State> {
  private _usernameRef: RefObject<HTMLInputElement>;
  private _passwordRef: RefObject<HTMLInputElement>;
  private _phoneNumberRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;
  private _isSubmitting = false;

  constructor(props: Props) {
    super(props);

    this._usernameRef = React.createRef();
    this._passwordRef = React.createRef();
    this._phoneNumberRef = React.createRef();
    this._verificationCodeRef = React.createRef();

    this.state = {
      usernameValidate: ValidateState.NONE,
      phoneNumberValidate: ValidateState.NONE,
    };

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._validateUsername = this._validateUsername.bind(this);
    this._validatePhoneNumber = this._validatePhoneNumber.bind(this);
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
    const { usernameValidate, phoneNumberValidate } = this.state;

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
                min={4}
                max={11}
                inputRef={this._usernameRef}
                onValidate={this._validateUsername}
                validateState={usernameValidate}
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
                onValidate={this._validatePhoneNumber}
                validateState={phoneNumberValidate}
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

    if (!this._isSubmitting) {
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
          popOutHandler.hidePopOut();
          popOutHandler.showNotice(NoticePopOutConfig.REGISTER_SUCCESS);
        }
        this._isSubmitting = false;
      };

      const params = new FormData();
      params.append("username", username);
      params.append("password", password);
      params.append("password_repeat", password);
      params.append("handphone", phoneNumber);
      params.append("tac", verificationCode);

      const config = {
        path: ApiPath.REGISTER,
        callback: onResultReturn,
        params: params,
      };
      callApi(config);
      this._isSubmitting = true;
    }
  }

  private _validateUsername(username: string): void {
    if (username.length > 0) {
      const onResultReturn = (result: GenericObjectType): void => {
        if (result.exist === 0) {
          this.setState({ usernameValidate: ValidateState.NOT_EXIST });
        } else if (result.exist === 1) {
          this.setState({ usernameValidate: ValidateState.EXIST });
        }
      };

      const params = new FormData();
      params.append("username", username);

      const config = {
        path: ApiPath.VALIDATE_USERNAME,
        callback: onResultReturn,
        params: params,
      };
      callApi(config);
    }
  }

  private _validatePhoneNumber(phoneNumber: string): void {
    if (phoneNumber.length > 0) {
      const onResultReturn = (result: GenericObjectType): void => {
        if (result.exist === 0) {
          this.setState({ phoneNumberValidate: ValidateState.NOT_EXIST });
        } else if (result.exist === 1) {
          this.setState({ phoneNumberValidate: ValidateState.EXIST });
        }
      };

      const params = new FormData();
      params.append("handphone", phoneNumber);

      const config = {
        path: ApiPath.VALIDATE_PHONE_NUMBER,
        callback: onResultReturn,
        params: params,
      };
      callApi(config);
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
      path: ApiPath.REQUEST_TAC,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }
}

export { RegisterPopOut };
