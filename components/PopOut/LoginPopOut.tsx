import React from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
import { PopOutTitle } from "./PopOutTitle";

import customStyle from "../../styles/module/AccountModal.module.scss";

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
          <PopOutTitle label="登入" hidePopOut={hidePopOut} />
          <div id="login-form-container" className="pop-out-form-container">
            <form autoComplete="off" className="column-container center">
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
                backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                submit
              />
            </form>
            <div id="login-help-bar" className="row-container center">
              <div className="form-link">立即注册</div>
              <div className="form-link">忘记密码</div>
              <div className="form-link">忘記账号</div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export { LoginPopOut };
