import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
import { NoticePopOut } from "./NoticePopOut";
import { PopOutTitle } from "./PopOutTitle";
import {
  PopOutType,
  NoticePopOutConfig,
  ApiPath,
} from "../../model/WebConstant";
import { apiClient } from "../../model/ApiClient";

import customStyle from "../../styles/module/AccountModal.module.scss";

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
    this._hideNotice = this._hideNotice.bind(this);
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
          <PopOutTitle label="忘记帐号" hidePopOut={hidePopOut} />
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
          hidePopOut={this._hideNotice}
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

    apiClient.callApi(
      ApiPath.FORGOT_USERNAME,
      { phoneNumber, verificationCode },
      onResultReturn
    );
  }

  //#region Utils
  private _hideNotice(): void {
    this.setState({ subToggle: false });
  }
  //#endregion
}

export { ForgotUsernamePopOut };
