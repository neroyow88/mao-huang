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
import { PopOutType } from "../model/WebConstant";

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

function renderLoginBar(props: Props) {
  const { isMobile } = props;

  if (isMobile) {
    return loginBarMobile(props);
  } else {
    return loginBarBrowser(props);
  }
}

function loginBarBrowser(props: Props): JSX.Element {
  const {
    username,
    password,
    updateUsername,
    updatePassword,
    showPopOut,
  } = props;

  const forgotUsername = () => {
    showPopOut(PopOutType.FORGOT_USERNAME);
  };

  const forgotPassword = () => {
    showPopOut(PopOutType.FORGOT_PASSWORD);
  };

  const register = () => {
    showPopOut(PopOutType.REGISTER);
  };

  return (
    <div id="login-bar-container">
      <Nav style={styles.navStyle}>
        <NavItem>
          <NavLink
            onClick={forgotUsername}
            style={{ color: "#FCB715", cursor: "pointer" }}
          >
            忘记账号
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={forgotPassword}
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
              onChange={updateUsername}
              className={"input-style"}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="密码"
              type="password"
              id="password"
              onChange={updatePassword}
              className={"input-style"}
              style={styles.passwordInputStyle}
            ></Input>
          </FormGroup>
          <Button
            onClick={() => {
              _onLoginClick(username, password);
            }}
            size="sm"
            className={"login-bar-button"}
            style={styles.loginButtonStyle}
          >
            登入
          </Button>
          <Button
            onClick={register}
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

function loginBarMobile(props: Props): JSX.Element {
  const { showPopOut } = props;

  const register = () => {
    showPopOut(PopOutType.REGISTER);
  };

  return (
    <div id="login-bar-container-mobile">
      <img src={"mobile/logo.png"} />
      <div id="login-bar-label" onClick={register}>
        登入 / 注册
      </div>
    </div>
  );
}

function _onLoginClick(username: string, password: string): void {
  console.log(username, password);
}

export { renderLoginBar };
