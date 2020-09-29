import React, { RefObject } from "react";

import { FormInputBox } from "../share/FormInputBox";
import { FormButton } from "../share/FormButton";

import { apiClient } from "../../scripts/ApiClient";
import { popOutHandler } from "../../scripts/PopOutHandler";
import { dataSource } from "../../scripts/dataSource/DataSource";
import { ErrorType } from "../../scripts/server/Error";
import { NoticePopOutConfig, ApiPath } from "../../scripts/WebConstant";

interface Props {}

class ProfileChangePassword extends React.Component<Props> {
  private _oldPasswordRef: RefObject<HTMLInputElement>;
  private _newPasswordRef: RefObject<HTMLInputElement>;
  private _verifiedNewPasswordRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this._oldPasswordRef = React.createRef();
    this._newPasswordRef = React.createRef();
    this._verifiedNewPasswordRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
  }

  public render(): JSX.Element {
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
        if (err === ErrorType.INVALID_USER) {
          popOutHandler.showNotice(NoticePopOutConfig.PIN_NOT_VERIFIED);
        } else if (err === ErrorType.INVALID_PASSWORD) {
          popOutHandler.showNotice(NoticePopOutConfig.PIN_NOT_VERIFIED);
        } else if (err === ErrorType.PASSWORD_NOT_VERIFIED) {
          popOutHandler.showNotice(NoticePopOutConfig.PIN_NOT_VERIFIED);
        }
      } else {
        this._oldPasswordRef.current.value = "";
        this._newPasswordRef.current.value = "";
        this._verifiedNewPasswordRef.current.value = "";
        popOutHandler.showNotice(NoticePopOutConfig.CHANGE_PASSWORD_SUCCESS);
      }
    };

    const { username } = dataSource.playerModel;
    const params = {
      username,
      oldPassword,
      newPassword,
      verifiedNewPassword,
    };
    apiClient.callApi(ApiPath.CHANGE_PASSWORD, onResultReturn, params);
  }
}

export { ProfileChangePassword };