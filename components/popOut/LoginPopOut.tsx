import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "../share/FormInputBox";
import { FormButton } from "../share/FormButton";
import { PopOutTitle } from "../share/PopOutTitle";

import { callApi, callMultipleApi } from "../../scripts/ApiClient";
import {
  ApiPath,
  NoticePopOutConfig,
  PopOutType,
} from "../../scripts/WebConstant";
import { popOutHandler } from "../../scripts/PopOutHandler";

import customStyle from "../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  loginCallback: (value: boolean, name?: string) => void;
}

interface State {
  captchaImg: string;
  needVerify: boolean;
}

class LoginPopOut extends React.Component<Props, State> {
  private _usernameRef: RefObject<HTMLInputElement>;
  private _passwordRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;
  private _isSubmitting = false;

  constructor(props: Props) {
    super(props);

    this._usernameRef = React.createRef();
    this._passwordRef = React.createRef();
    this._verificationCodeRef = React.createRef();

    this.state = {
      captchaImg: undefined,
      needVerify: false,
    };

    this._renderCaptcha = this._renderCaptcha.bind(this);
    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._onRegisterClicked = this._onRegisterClicked.bind(this);
    this._onForgotPasswordClicked = this._onForgotPasswordClicked.bind(this);
    this._onForgotUsernameClicked = this._onForgotUsernameClicked.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const onResultReturn = (result, error): void => {
        if (result && !error) {
          this.setState({
            needVerify: result[0].data.need_verify,
            captchaImg: result[1].data,
          });
          transitionComplete();
        }
      };

      const config = [
        {
          path: ApiPath.GET_LOGIN_CAPTCHA_STATUS,
        },
        {
          path: ApiPath.GET_LOGIN_CAPTCHA,
        },
      ];
      callMultipleApi(config, onResultReturn);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, onHide, scale } = this.props;

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="登入" onHide={onHide} />
          <div
            id="login-form-container"
            className="pop-out-form-container column-container"
          >
            <form
              autoComplete="off"
              className="column-container center"
              onSubmit={this._onFormSubmitted}
            >
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
              {this._renderCaptcha()}
              <FormButton
                label="提交"
                backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                submit
              />
            </form>
            <div id="login-help-bar" className="row-container center">
              <div className="form-link" onClick={this._onRegisterClicked}>
                立即注册
              </div>
              <div
                className="form-link"
                onClick={this._onForgotPasswordClicked}
              >
                忘记密码
              </div>
              <div
                className="form-link"
                onClick={this._onForgotUsernameClicked}
              >
                忘記账号
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  private _renderCaptcha(): JSX.Element {
    const { captchaImg, needVerify } = this.state;
    if (needVerify) {
      return (
        <div id="captcha-container" className="row-container">
          <FormInputBox
            id="verificationcode"
            placeholder="请输入验证码"
            min={4}
            max={4}
            inputRef={this._verificationCodeRef}
          />
          <div id="captcha-image">
            <img src={`${captchaImg}`} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();

    if (!this._isSubmitting) {
      const { onHide, loginCallback } = this.props;
      const { needVerify } = this.state;
      const username = this._usernameRef.current.value;
      const password = this._passwordRef.current.value;

      const onResultReturn = (result: GenericObjectType, err: string): void => {
        if (err && !result) {
          popOutHandler.showNotice(
            NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
          );
        } else {
          loginCallback && loginCallback(true, username);
          onHide && onHide();
        }
        this._isSubmitting = false;
      };

      const params = new FormData();
      params.append("username", username);
      params.append("password", password);

      if (needVerify) {
        const verificationCode = this._verificationCodeRef.current.value;
        params.append("verifyCode", verificationCode);
      }

      const config = {
        path: ApiPath.LOGIN,
        callback: onResultReturn,
        params: params,
      };
      callApi(config);
      this._isSubmitting = true;
    }
  }

  private _onRegisterClicked(): void {
    popOutHandler.showPopOut(PopOutType.REGISTER);
  }

  private _onForgotPasswordClicked(): void {
    popOutHandler.showPopOut(PopOutType.FORGOT_PASSWORD);
  }

  private _onForgotUsernameClicked(): void {
    popOutHandler.showPopOut(PopOutType.FORGOT_USERNAME);
  }
}

export { LoginPopOut };
