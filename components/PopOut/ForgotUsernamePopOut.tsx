import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
import { PopOutTitle } from "./PopOutTitle";
import { NoticePopOutConfig, ApiPath } from "../../model/WebConstant";
import { apiClient } from "../../model/ApiClient";

import customStyle from "../../styles/module/Modal.module.scss";
import { ErrorType } from "../../model/data/Error";
import { popOutHandler } from "../../model/PopOutHandler";

interface Props {
  toggle: boolean;
  scale: number;
  transitionComplete: NoParamReturnNulFunction;
  onHide: NoParamReturnNulFunction;
}

class ForgotUsernamePopOut extends React.Component<Props> {
  private _phoneNumberRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this._phoneNumberRef = React.createRef();
    this._verificationCodeRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._getVerificationCode = this._getVerificationCode.bind(this);
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
    const { toggle, scale, onHide } = this.props;

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="忘记帐号" onHide={onHide} />
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
                onClick={this._getVerificationCode}
              />
              <FormInputBox
                id="verificationcode"
                placeholder="请输入短信验证码"
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
      </Modal>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const phoneNumber = this._phoneNumberRef.current.value;
    const verificationCode = this._verificationCodeRef.current.value;

    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        if (err === ErrorType.INVALID_VERIFICATION_CODE) {
          popOutHandler.showNotice(
            NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
          );
        } else if (err === ErrorType.INVALID_PHONE_NUMBER) {
          popOutHandler.showNotice(
            NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
          );
        }
      } else {
        const { username } = result;
        console.log("My username: ", username);
        popOutHandler.showNotice(NoticePopOutConfig.GET_USERNAME_SUCCESS);
      }
    };

    apiClient.callApi(
      ApiPath.FORGOT_USERNAME,
      { phoneNumber, verificationCode },
      onResultReturn
    );
  }

  private _getVerificationCode(): void {
    const phoneNumber = this._phoneNumberRef.current.value;
    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        if (err === ErrorType.INVALID_PHONE_NUMBER) {
          popOutHandler.showNotice(
            NoticePopOutConfig.VERIFICATION_CODE_INCORRECT
          );
        }
      }
    };

    apiClient.callApi(
      ApiPath.REQUEST_VERIFICATION_CODE,
      { phoneNumber },
      onResultReturn
    );
  }
}

export { ForgotUsernamePopOut };
