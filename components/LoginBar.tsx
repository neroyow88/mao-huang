import React from "react";
import {
  Nav,
  Button,
  Input,
  NavLink,
  NavItem,
  Form,
  FormGroup,
} from "reactstrap";
import { PopOutType, NoticeType } from "../model/WebConstant";
import { utils } from "../model/Utils";
import { ImageHandler } from "./ImageHandler";

const styles = {
  navStyle: {
    marginLeft: "48%",
  },
  passwordInputStyle: {
    backgroundImage: "url('icon_eye.png')",
    backgroundPosition: "95% 50%",
    backgroundRepeat: "no-repeat",
  },
  loginButtonStyle: {
    color: "#FFFFFF",
    background:
      "transparent linear-gradient(180deg, #FCB715 0%, #E9A400 100%) 0% 0% no-repeat padding-box",
  },
  registerButtonStyle: {
    color: "#606060",
    background:
      "transparent linear-gradient(180deg, #F2F2F2 0%, #D2D2D2 100%) 0% 0% no-repeat padding-box",
  },
};

interface Props {
  showPopOut: (any: number, data?: GenericObjectType) => void;
}

interface State {
  username: string;
  password: string;
}

class LoginBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this._onLoginClicked = this._onLoginClicked.bind(this);
    this._onRegisterClicked = this._onRegisterClicked.bind(this);
    this._onForgotUsernameClicked = this._onForgotUsernameClicked.bind(this);
    this._onForgotPasswordClicked = this._onForgotPasswordClicked.bind(this);
    this._updateUsername = this._updateUsername.bind(this);
    this._updatePassword = this._updatePassword.bind(this);
  }

  public render(): JSX.Element {
    if (utils.isMobile) {
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
    } else {
      return (
        <div id="login-bar-container-browser">
          <Nav style={styles.navStyle}>
            <NavItem>
              <NavLink
                onClick={this._onForgotUsernameClicked}
                style={{ color: "#FCB715", cursor: "pointer" }}
              >
                忘记账号
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={this._onForgotPasswordClicked}
                style={{ color: "#FFFFFF", cursor: "pointer" }}
              >
                忘记密码
              </NavLink>
            </NavItem>
            <Form inline>
              <FormGroup>
                <Input
                  placeholder="猫皇账号"
                  type="text"
                  id="username"
                  onChange={this._updateUsername}
                  className={"input-style"}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="密码"
                  type="password"
                  id="password"
                  onChange={this._updatePassword}
                  className={"input-style"}
                  style={styles.passwordInputStyle}
                ></Input>
              </FormGroup>
              <Button
                onClick={this._onLoginClicked}
                size="sm"
                className={"login-bar-button"}
                style={styles.loginButtonStyle}
              >
                登入
              </Button>
              <Button
                onClick={this._onRegisterClicked}
                size="sm"
                className={"login-bar-button"}
                style={styles.registerButtonStyle}
              >
                注册
              </Button>
            </Form>
          </Nav>
        </div>
      );
    }
  }

  private _onLoginClicked(): void {
    const { showPopOut } = this.props;
    if (utils.isMobile) {
      showPopOut && showPopOut(PopOutType.LOGIN);
    } else {
      const { username, password } = this.state;
      console.log(username, password);
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
