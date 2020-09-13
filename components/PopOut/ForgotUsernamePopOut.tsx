import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";

import customStyle from "../../styles/module/AccountModal.module.scss";
import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
import { PopOutType, NoticePopOutConfig } from "../../model/WebConstant";
import { apiClient } from "../../model/ApiClient";
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

class ForgotUsernamePopOut extends React.Component<Props, State> {
  private _phoneNumberRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      subToggle: false,
    };

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
    const { subToggle } = this.state;

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
            <div id="pop-out-title">忘记帐号</div>
            <ImageHandler
              src="pop_out/close_button.png"
              scale={0.44}
              onClick={hidePopOut}
            />
          </div>
          <div
            id="forgot-username-form-container"
            className="pop-out-form-container"
          >
            <form autoComplete="off" onSubmit={this._onFormSubmitted}>
              <FormInputBox
                id="phonenumber"
                placeholder="请输入您的手机号码"
                inputRef={this._phoneNumberRef}
                number
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
                number
              />
              <FormButton
                label="提交"
                backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                submit
              />
            </form>
          </div>
        </div>
        <NoticePopOut
          toggle={subToggle}
          scale={scale}
          hidePopOut={this._hidePopOut}
          customPopOutData={NoticePopOutConfig.VERIFICATION_CODE_INCORRECT}
        />
      </Modal>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const phoneNumber = this._phoneNumberRef.current.value;
    const verificationCode = this._verificationCodeRef.current.value;

    const { showPopOut } = this.props;
    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        this.setState({ subToggle: true });
      } else {
        showPopOut(PopOutType.NOTICE, NoticePopOutConfig.GET_USERNAME_SUCCESS);
      }
    };

    apiClient.forgotUsername({ phoneNumber, verificationCode }, onResultReturn);
  }

  //#region Utils
  private _hidePopOut(): void {
    this.setState({ subToggle: false });
  }
  //#endregion
}

export { ForgotUsernamePopOut };
