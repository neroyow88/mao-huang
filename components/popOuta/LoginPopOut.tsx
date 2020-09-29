import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "../share/FormInputBox";
import { FormButton } from "../share/FormButton";
import { PopOutTitle } from "../share/PopOutTitle";

import { apiClient } from "../../scripts/ApiClient";
import {
  ApiPath,
  NoticePopOutConfig,
  PopOutType,
} from "../../scripts/WebConstant";
import { dataSource } from "../../scripts/dataSource/DataSource";
import { popOutHandler } from "../../scripts/PopOutHandler";

import customStyle from "../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

class LoginPopOut extends React.Component<Props> {
  private _usernameRef: RefObject<HTMLInputElement>;
  private _passwordRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this._usernameRef = React.createRef();
    this._passwordRef = React.createRef();
    this._verificationCodeRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._onRegisterClicked = this._onRegisterClicked.bind(this);
    this._onForgotPasswordClicked = this._onForgotPasswordClicked.bind(this);
    this._onForgotUsernameClicked = this._onForgotUsernameClicked.bind(this);
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
          <div id="login-form-container" className="pop-out-form-container">
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
              <FormInputBox
                id="verificationcode"
                placeholder="请输入验证码"
                min={5}
                max={5}
                inputRef={this._verificationCodeRef}
              />
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

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const username = this._usernameRef.current.value;
    const password = this._passwordRef.current.value;
    // const verificationCode = this._verificationCodeRef.current.value;

    const { onHide } = this.props;
    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        popOutHandler.showNotice(
          NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
        );
      } else {
        dataSource.updatePlayerModel(result);
        onHide && onHide();
      }
    };

    const params = { username, password };
    apiClient.callApi(ApiPath.LOGIN, onResultReturn, params);
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
