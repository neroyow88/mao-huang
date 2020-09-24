import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
import { PopOutTitle } from "./PopOutTitle";

import customStyle from "../../styles/module/AccountModal.module.scss";
import { apiClient } from "../../model/ApiClient";
import {
  ApiPath,
  NoticePopOutConfig,
  PopOutType,
} from "../../model/WebConstant";
import { dataSource } from "../../model/DataSource";
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
}

class LoginPopOut extends React.Component<Props, State> {
  private _usernameRef: RefObject<HTMLInputElement>;
  private _passwordRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      subToggle: false,
    };

    this._usernameRef = React.createRef();
    this._passwordRef = React.createRef();
    this._verificationCodeRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._hideNotice = this._hideNotice.bind(this);
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
    const { toggle, hidePopOut, scale } = this.props;
    const { subToggle } = this.state;
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
                id="verificationcode"
                placeholder="请输入验证码"
                rightImage={"pop_out/password_eye.png"}
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
        <NoticePopOut
          toggle={subToggle}
          scale={scale}
          hidePopOut={this._hideNotice}
          customPopOutData={NoticePopOutConfig.VERIFICATION_CODE_INCORRECT}
        />
      </Modal>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const username = this._usernameRef.current.value;
    const password = this._passwordRef.current.value;
    // const verificationCode = this._verificationCodeRef.current.value;

    const { hidePopOut } = this.props;
    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        this.setState({ subToggle: true });
      } else {
        dataSource.updatePlayerModel(result);
        hidePopOut && hidePopOut();
      }
    };

    apiClient.callApi(ApiPath.LOGIN, { username, password }, onResultReturn);
  }

  private _hideNotice(): void {
    this.setState({ subToggle: false });
  }

  private _onRegisterClicked(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.REGISTER);
  }

  private _onForgotPasswordClicked(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.FORGOT_PASSWORD);
  }

  private _onForgotUsernameClicked(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.FORGOT_USERNAME);
  }
}

export { LoginPopOut };
