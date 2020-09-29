import React, { RefObject } from "react";

import { ImageHandler } from "../share/ImageHandler";
import { FormInputBox } from "../share/FormInputBox";
import { FormButton } from "../share/FormButton";

import { dataSource } from "../../scripts/dataSource/DataSource";
import { apiClient } from "../../scripts/ApiClient";
import { ErrorType } from "../../scripts/server/Error";
import { popOutHandler } from "../../scripts/PopOutHandler";
import {
  PopOutType,
  NoticePopOutConfig,
  ApiPath,
} from "../../scripts/WebConstant";

interface Props {}

class LoginBar extends React.Component<Props> {
  private _usernameRef: RefObject<HTMLInputElement>;
  private _passwordRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this._usernameRef = React.createRef();
    this._passwordRef = React.createRef();

    this._renderLoginBarMobile = this._renderLoginBarMobile.bind(this);
    this._renderLoginBarBrowser = this._renderLoginBarBrowser.bind(this);

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._onRegisterClicked = this._onRegisterClicked.bind(this);
    this._onForgotUsernameClicked = this._onForgotUsernameClicked.bind(this);
    this._onForgotPasswordClicked = this._onForgotPasswordClicked.bind(this);
    this._onProfileClicked = this._onProfileClicked.bind(this);

    this._onLogin = this._onLogin.bind(this);
    this._onLogout = this._onLogout.bind(this);
  }

  public render(): JSX.Element {
    const { isMobile } = dataSource.systemModel;
    if (isMobile) {
      return this._renderLoginBarMobile();
    } else {
      return this._renderLoginBarBrowser();
    }
  }

  private _renderLoginBarMobile(): JSX.Element {
    return (
      <div id="login-bar-container-mobile" className="row-container center">
        <ImageHandler src={"mobile/logo.png"} scale={0.33} />
        <div id="login-label" onClick={this._onLogin}>
          登入
        </div>
        <div id="register-label" onClick={this._onRegisterClicked}>
          注册
        </div>
      </div>
    );
  }

  private _renderLoginBarBrowser(): JSX.Element {
    const { playerModel } = dataSource;

    if (playerModel) {
      const { username } = playerModel;
      return (
        <div id="login-bar-container-browser">
          <div id="login-bar" className="row-container">
            <div id="username-label">{`欢迎您 , ${username}`}</div>
            <div id="image-container">
              <ImageHandler src={"member.png"} />
            </div>
            <div
              id="profile-button"
              className="yellow"
              onClick={this._onProfileClicked}
            >
              会员中心
            </div>
            <FormButton
              label="登出"
              backgroundGradient="linear-gradient(180deg, #F2F2F2 0%, #D2D2D2 100%)"
              color="#606060"
              onClick={this._onLogout}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div id="login-bar-container-browser">
          <div id="login-bar" className="row-container center">
            <div
              className="label-button yellow"
              onClick={this._onForgotUsernameClicked}
            >
              忘记账号
            </div>
            <div
              className="label-button white"
              onClick={this._onForgotPasswordClicked}
            >
              忘记密码
            </div>
            <form
              autoComplete="off"
              className="row-container"
              onSubmit={this._onFormSubmitted}
            >
              <FormInputBox
                id="username"
                placeholder="猫皇账号"
                min={4}
                max={11}
                inputRef={this._usernameRef}
              />
              <FormInputBox
                id="password"
                placeholder="密码"
                type="password"
                min={6}
                max={12}
                inputRef={this._passwordRef}
              />
              <FormButton
                label="登入"
                backgroundGradient="linear-gradient(180deg, #FCB715 0%, #E9A400 100%)"
                color="white"
                submit
              />
              <FormButton
                label="注册"
                backgroundGradient="linear-gradient(180deg, #F2F2F2 0%, #D2D2D2 100%)"
                color="#606060"
                onClick={this._onRegisterClicked}
              />
            </form>
          </div>
        </div>
      );
    }
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    this._onLogin();
  }

  private _onRegisterClicked(): void {
    popOutHandler.showPopOut(PopOutType.REGISTER);
  }

  private _onForgotUsernameClicked(): void {
    popOutHandler.showPopOut(PopOutType.FORGOT_USERNAME);
  }

  private _onForgotPasswordClicked(): void {
    popOutHandler.showPopOut(PopOutType.FORGOT_PASSWORD);
  }

  private _onLogin(): void {
    const { isMobile } = dataSource.systemModel;

    if (isMobile) {
      popOutHandler.showPopOut(PopOutType.LOGIN);
    } else {
      const username = this._usernameRef.current.value;
      const password = this._passwordRef.current.value;
      const onResultReturn = (result: GenericObjectType, err: string): void => {
        if (err && !result) {
          if (err === ErrorType.INVALID_USER) {
          } else if (err === ErrorType.INVALID_PASSWORD) {
          }
        } else {
          dataSource.updatePlayerModel(result);
        }
      };

      const params = {
        username,
        password,
        verificationCode: -1,
      };
      apiClient.callApi(ApiPath.LOGIN, onResultReturn, params);
    }
  }

  private _onProfileClicked(): void {
    popOutHandler.showPopOut(PopOutType.PROFILE);
  }

  private _onLogout(): void {
    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        console.error("Logout failed: ", err);
      } else {
        dataSource.updatePlayerModel(undefined);
        popOutHandler.showNotice(NoticePopOutConfig.LOGOUT_SUCCESS);
      }
    };
    apiClient.callApi(ApiPath.LOGOUT, onResultReturn);
  }
}

export { LoginBar };
