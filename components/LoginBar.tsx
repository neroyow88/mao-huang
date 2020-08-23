import React, { useState } from "react";
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
  loginBarContainer: {
    height: "40px",
    width: "100%",
    background: "transparent linear-gradient(0deg, #8E0002 0%, #AD0002 100%)",
  },
  navStyle: {
    marginLeft: "48%",
  },
  inputStyle: {
    width: "150px",
    height: "30px",
    marginLeft: "5px",
    marginRight: "5px",
    borderRadius: "0px",
  },
  passwordInputStyle: {
    backgroundImage: "url('icon_eye.png')",
    backgroundPosition: "95% 50%",
    backgroundRepeat: "no-repeat",
  },
  buttonStyle: {
    width: "75px",
    marginLeft: "5px",
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

export default function LoginBar(showPopOutCallback) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (e): void => {
    setUsername(e.target.value);
  };

  const updatePassword = (e): void => {
    setPassword(e.target.value);
  };

  const forgotUsername = () => {
    showPopOutCallback(PopOutType.FORGOT_USERNAME);
  };

  const forgotPassword = () => {
    showPopOutCallback(PopOutType.FORGOT_PASSWORD);
  };

  const register = () => {
    showPopOutCallback(PopOutType.REGISTER);
  };

  return (
    <div id="login-bar-container" style={styles.loginBarContainer}>
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
              style={styles.inputStyle}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="密码"
              type="password"
              id="password"
              onChange={updatePassword}
              style={Object.assign(
                {},
                styles.inputStyle,
                styles.passwordInputStyle
              )}
            ></Input>
          </FormGroup>
          <Button
            onClick={() => {
              onLoginClick(username, password);
            }}
            size="sm"
            style={Object.assign(
              {},
              styles.buttonStyle,
              styles.loginButtonStyle
            )}
          >
            登入
          </Button>
          <Button
            onClick={register}
            size="sm"
            style={Object.assign(
              {},
              styles.buttonStyle,
              styles.registerButtonStyle
            )}
          >
            注册
          </Button>
        </Form>
      </Nav>
    </div>
  );
}

function onLoginClick(username, password): void {
  console.log(username, password);
}
