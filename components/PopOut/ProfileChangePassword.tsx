import React, { RefObject } from "react";

import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
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

class ProfileChangePassword extends React.Component<Props, State> {
  private _oldPasswordRef: RefObject<HTMLInputElement>;
  private _newPasswordRef: RefObject<HTMLInputElement>;
  private _verifiedNewPasswordRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      subToggle: false,
      errorNotice: NoticePopOutConfig.VERIFICATION_CODE_INCORRECT,
    };

    this._oldPasswordRef = React.createRef();
    this._newPasswordRef = React.createRef();
    this._verifiedNewPasswordRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._hideNotice = this._hideNotice.bind(this);
  }

  public render(): JSX.Element {
    const { scale } = this.props;
    const { subToggle, errorNotice } = this.state;

    return (
      <div id="change-password-container" className="pop-out-form-container">
        <form autoComplete="off" onSubmit={this._onFormSubmitted}>
          <FormInputBox
            id="oldpassword"
            placeholder="请输入旧密码"
            type="password"
            leftImage={"pop_out/password_logo.png"}
            min={6}
            max={12}
            inputRef={this._oldPasswordRef}
          />
          <FormInputBox
            id="newpassword"
            placeholder="请设置新密码"
            type="password"
            leftImage={"pop_out/password_logo.png"}
            min={6}
            max={12}
            inputRef={this._newPasswordRef}
          />
          <FormInputBox
            id="verifiedpassword"
            placeholder="请再次确认新密码"
            type="password"
            leftImage={"pop_out/password_logo.png"}
            min={6}
            max={12}
            inputRef={this._verifiedNewPasswordRef}
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
          hidePopOut={this._hideNotice}
          customPopOutData={errorNotice}
        />
      </div>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const oldPassword = this._oldPasswordRef.current.value;
    const newPassword = this._newPasswordRef.current.value;
    const verifiedNewPassword = this._verifiedNewPasswordRef.current.value;

    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
        this.setState({
          subToggle: true,
          errorNotice: NoticePopOutConfig.PIN_NOT_VERIFIED,
        });
      } else {
        console.log(result, err);
        this.setState({
          subToggle: true,
          errorNotice: NoticePopOutConfig.CHANGE_PASSWORD_SUCCESS,
        });
      }
    };

    apiClient.callApi(
      ApiPath.CHANGE_PASSWORD,
      { oldPassword, newPassword, verifiedNewPassword },
      onResultReturn
    );
  }

  //#region Utils
  private _hideNotice(): void {
    this.setState({ subToggle: false });
  }
  //#endregion
}

export { ProfileChangePassword };
