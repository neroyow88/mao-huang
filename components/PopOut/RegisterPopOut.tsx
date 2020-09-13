import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";

import customStyle from "../../styles/module/AccountModal.module.scss";
import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
import { apiClient } from "../../model/ApiClient";
import { PopOutType, NoticePopOutConfig } from "../../model/WebConstant";
import { NoticePopOut } from "./NoticePopOut";

interface Props {
  toggle: boolean;
  scale: number;
  showPopOut: (any: number, data?: GenericObjectType) => void;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

interface State {
  subToggle: boolean;
  errorNotice: INoticePopOutConfig;
}

class RegisterPopOut extends React.Component<Props, State> {
  private _usernameRef: RefObject<HTMLInputElement>;
  private _passwordRef: RefObject<HTMLInputElement>;
  private _phoneNumberRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      subToggle: false,
      errorNotice: NoticePopOutConfig.VERIFICATION_CODE_INCORRECT,
    };

    this._usernameRef = React.createRef();
    this._passwordRef = React.createRef();
    this._phoneNumberRef = React.createRef();
    this._verificationCodeRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._hidePopOut = this._hidePopOut.bind(this);
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
    const { toggle, scale, hidePopOut } = this.props;
    const { subToggle, errorNotice } = this.state;
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
            <div id="pop-out-title">注册会员</div>
            <ImageHandler
              src="pop_out/close_button.png"
              scale={0.44}
              onClick={hidePopOut}
            />
          </div>
          <div id="register-form-container" className="pop-out-form-container">
            <form autoComplete="off" onSubmit={this._onFormSubmitted}>
              <FormInputBox
                id="username"
                placeholder="请输入用户名"
                leftImage={"pop_out/account_logo.png"}
                rightImage={"pop_out/check.png"}
                min={4}
                max={11}
                inputRef={this._usernameRef}
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
                inputRef={this._passwordRef}
              />
              <div className="form-warning" style={warning}>
                密码由6~12位数字或小写字母组成
              </div>
              <FormInputBox
                id="phonenumber"
                placeholder="请输入您的手机号码"
                inputRef={this._phoneNumberRef}
              />
              <FormButton
                label="获取短信验证码"
                backgroundColor="#83D300"
                onClick={(): void => {
                  console.log("Verification code send");
                }}
              />
              <FormInputBox
                id="verificationcode"
                placeholder="请输入短信验证码"
                rightImage={"pop_out/password_eye.png"}
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
        <NoticePopOut
          toggle={subToggle}
          scale={scale}
          hidePopOut={this._hidePopOut}
          customPopOutData={errorNotice}
        />
      </Modal>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const username = this._usernameRef.current.value;
    const password = this._passwordRef.current.value;
    const phoneNumber = this._phoneNumberRef.current.value;
    const verificationCode = this._verificationCodeRef.current.value;

    const { showPopOut } = this.props;
    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        if (err === "verification") {
          console.log(err);
          this.setState({
            subToggle: true,
            errorNotice: NoticePopOutConfig.VERIFICATION_CODE_INCORRECT,
          });
        } else if (err === "username") {
          this.setState({
            subToggle: true,
            errorNotice: NoticePopOutConfig.USERNAME_ALREADY_EXIST,
          });
        }
      } else {
        showPopOut(PopOutType.NOTICE, NoticePopOutConfig.REGISTER_SUCCESS);
      }
    };

    apiClient.register(
      { username, password, phoneNumber, verificationCode },
      onResultReturn
    );
  }

  //#region Utils
  private _hidePopOut(): void {
    this.setState({ subToggle: false });
  }

  //#endregion
}

export { RegisterPopOut };
