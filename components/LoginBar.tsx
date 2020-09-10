import React from "react";
import { ImageHandler } from "./ImageHandler";
import { PopOutType } from "../model/WebConstant";
import { dataSource } from "../model/DataSource";
import { FormInputBox } from "./PopOut/FormInputBox";
import { FormButton } from "./PopOut/FormButton";
import { apiClient } from "../model/ApiClient";

interface Props {
  showPopOut: (any: number, data?: GenericObjectType) => void;
}

interface State {
  username: string;
  password: string;
}

class LoginBar extends React.Component<Props, State> {
  private _loginCount: number = 0;

  constructor(props: Props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this._renderLoginBarMobile = this._renderLoginBarMobile.bind(this);
    this._renderLoginBarBrowser = this._renderLoginBarBrowser.bind(this);

    this._onLoginClicked = this._onLoginClicked.bind(this);
    this._onRegisterClicked = this._onRegisterClicked.bind(this);
    this._onForgotUsernameClicked = this._onForgotUsernameClicked.bind(this);
    this._onForgotPasswordClicked = this._onForgotPasswordClicked.bind(this);

    this._onProfileClicked = this._onProfileClicked.bind(this);
    this._onLogoutClicked = this._onLogoutClicked.bind(this);

    this._updateUsername = this._updateUsername.bind(this);
    this._updatePassword = this._updatePassword.bind(this);
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
      <div id="login-bar-container-mobile">
        <ImageHandler src={"mobile/logo.png"} scale={0.33} />
        <div id="login-label" onClick={this._onLoginClicked}>
          登入
        </div>
        <div id="register-label" onClick={this._onRegisterClicked}>
          注册
        </div>
      </div>
    );
  }

  private _renderLoginBarBrowser(): JSX.Element {
    const { isLogin, username } = dataSource.playerModel;

    if (isLogin) {
      return (
        <div id="login-bar-container-browser">
          <div id="login-bar-row-container" className="login-bar-not-login">
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
              background="transparent linear-gradient(180deg, #F2F2F2 0%, #D2D2D2 100%)"
              color="#606060"
              onClick={this._onLogoutClicked}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div id="login-bar-container-browser">
          <div id="login-bar-row-container" className="login-bar-login">
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
            <form autoComplete="off">
              <FormInputBox
                id="username"
                placeholder="猫皇账号"
                min={4}
                max={11}
              />
              <FormInputBox
                id="password"
                placeholder="密码"
                type="password"
                rightImage={"pop_out/password_eye.png"}
                min={6}
                max={12}
              />
              <FormButton
                label="登入"
                background="transparent linear-gradient(180deg, #FCB715 0%, #E9A400 100%)"
                color="white"
                submit
                onClick={this._onLoginClicked}
              />
              <FormButton
                label="注册"
                background="transparent linear-gradient(180deg, #F2F2F2 0%, #D2D2D2 100%)"
                color="#606060"
                onClick={this._onRegisterClicked}
              />
            </form>
          </div>
        </div>
      );
    }
  }

  private _onLoginClicked(): void {
    const { showPopOut } = this.props;
    const { isMobile } = dataSource.systemModel;
    if (isMobile) {
      showPopOut && showPopOut(PopOutType.LOGIN);
    } else {
      const { username, password } = this.state;
      apiClient.login({ username, password });
      this._loginCount++;
      if (this._loginCount >= 3) {
        showPopOut && showPopOut(PopOutType.LOGIN);
      }
    }
  }

  private _onRegisterClicked(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.REGISTER);
  }

  private _onForgotUsernameClicked(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.FORGOT_USERNAME);
  }

  private _onForgotPasswordClicked(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.FORGOT_PASSWORD);
  }

  private _onProfileClicked(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.PROFILE);
  }

  private _onLogoutClicked(): void {
    // temp
    window.location.replace(window.location.origin);
  }

  private _updateUsername(e): void {
    const username = e.target.value;
    this.setState({ username });
  }

  private _updatePassword(e): void {
    const password = e.target.value;
    this.setState({ password });
  }
}

export { LoginBar };
