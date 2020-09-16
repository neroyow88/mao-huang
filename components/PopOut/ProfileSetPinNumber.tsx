import React, { RefObject } from "react";

import { FormButton } from "./FormButton";
import { FormInputBox } from "./FormInputBox";
import { NoticePopOut } from "./NoticePopOut";
import { NoticePopOutConfig, ApiPath } from "../../model/WebConstant";
import { apiClient } from "../../model/ApiClient";

interface Props {
  scale: number;
}

interface State {
  subToggle: boolean;
  errorNotice: INoticePopOutConfig;
}

class ProfileSetPinNumber extends React.Component<Props, State> {
  private _phoneNumberRef: RefObject<HTMLInputElement>;
  private _verificationCodeRef: RefObject<HTMLInputElement>;
  private _pin: RefObject<HTMLInputElement>;
  private _verifiedPin: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      subToggle: false,
      errorNotice: NoticePopOutConfig.VERIFICATION_CODE_INCORRECT,
    };

    this._phoneNumberRef = React.createRef();
    this._verificationCodeRef = React.createRef();
    this._pin = React.createRef();
    this._verifiedPin = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._hidePopOut = this._hidePopOut.bind(this);
  }

  public render(): JSX.Element {
    const { scale } = this.props;
    const { subToggle, errorNotice } = this.state;
    const warning = {
      backgroundImage: "url(pop_out/warning.png)",
      backgroundPosition: "0% 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "15px",
    };

    return (
      <div id="set-pin-container" className="pop-out-form-container">
        <form autoComplete="off" onSubmit={this._onFormSubmitted}>
          <FormInputBox
            id="phonenumber"
            placeholder="请输入注册手机号码"
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
          <FormInputBox
            id="pin"
            placeholder="请设置新提款密码"
            type="password"
            leftImage={"pop_out/password_logo.png"}
            rightImage={"pop_out/password_eye.png"}
            min={6}
            max={12}
            inputRef={this._pin}
          />
          <div className="form-warning" style={warning}>
            密码由6~12位数字或小写字母组成
          </div>
          <FormInputBox
            id="verifiedpin"
            placeholder="请再次确认新提款密码"
            type="password"
            leftImage={"pop_out/password_logo.png"}
            rightImage={"pop_out/password_eye.png"}
            min={6}
            max={12}
            inputRef={this._verifiedPin}
          />
          <FormButton
            label="提交"
            backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
            submit
          />
        </form>
        <NoticePopOut
          toggle={subToggle}
          scale={scale}
          hidePopOut={this._hidePopOut}
          customPopOutData={errorNotice}
        />
      </div>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const phoneNumber = this._phoneNumberRef.current.value;
    const verificationCode = this._verificationCodeRef.current.value;
    const pin = this._pin.current.value;
    const verifiedPin = this._verifiedPin.current.value;

    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        if (err === "pin") {
          this.setState({
            subToggle: true,
            errorNotice: NoticePopOutConfig.PIN_NOT_VERIFIED,
          });
        } else if (err === "verification") {
          this.setState({
            subToggle: true,
            errorNotice: NoticePopOutConfig.VERIFICATION_CODE_INCORRECT,
          });
        }
      } else {
        this.setState({
          subToggle: true,
          errorNotice: NoticePopOutConfig.SET_PIN_SUCCESS,
        });
      }
    };

    apiClient.callApi(
      ApiPath.SET_PIN,
      { phoneNumber, verificationCode, pin, verifiedPin },
      onResultReturn
    );
  }

  //#region Utils
  private _hidePopOut(): void {
    this.setState({ subToggle: false });
  }

  //#endregion
}

export { ProfileSetPinNumber };
