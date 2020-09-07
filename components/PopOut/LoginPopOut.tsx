import React from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";

import customStyle from "../../styles/module/accountModal.module.scss";
import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";

interface Props {
  toggle: boolean;
  scale: number;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

class LoginPopOut extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
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
    const { toggle, hidePopOut, scale } = this.props;
    const warning = {
      backgroundImage: "url(pop_out/warning.png)",
      backgroundPosition: "0% 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "15px",
    };

    return (
      <Modal
        isOpen={toggle}
        toggle={hidePopOut}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <div id="pop-out-title-container">
            <ImageHandler src="pop_out/title_bg.png" scale={0.47} />
            <div id="pop-out-title">登入</div>
            <ImageHandler
              src="pop_out/close_button.png"
              scale={0.44}
              onClick={hidePopOut}
            />
          </div>
          <div id="login-form-container" className="pop-out-form-container">
            <form autoComplete="off">
              <FormInputBox
                id="username"
                placeholder="请输入用户名"
                leftImage={"pop_out/account_logo.png"}
                rightImage={"pop_out/check.png"}
                min={4}
                max={11}
              />
              <div className="form-warning" style={warning}>
                用户名由4~11位数字或字母组成
              </div>
              <FormInputBox
                id="password"
                placeholder="请设置新密码"
                type="password"
                leftImage={"pop_out/password_logo.png"}
                rightImage={"pop_out/password_eye.png"}
                min={6}
                max={12}
              />
              <div className="form-warning" style={warning}>
                密码由6~12位数字或小写字母组成
              </div>
              <FormInputBox
                id="verificationcode"
                placeholder="请输入验证码"
                rightImage={"pop_out/password_eye.png"}
                min={5}
                max={5}
              />
              <FormButton
                label="提交"
                background="transparent linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                submit
              />
              <div id="login-help-bar">
                <div className="form-link">立即注册</div>
                <div className="form-link">忘记密码</div>
                <div className="form-link">忘記账号</div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export { LoginPopOut };
