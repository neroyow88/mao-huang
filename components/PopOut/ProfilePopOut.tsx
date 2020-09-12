import React, { CSSProperties } from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";

import customStyle from "../../styles/module/AccountModal.module.scss";
import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
import { dataSource } from "../../model/DataSource";

interface Props {
  toggle: boolean;
  scale: number;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

interface State {
  selectedIndex: number;
}

class ProfilePopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };

    this._renderProfileMenu = this._renderProfileMenu.bind(this);
    this._renderProfileContent = this._renderProfileContent.bind(this);

    this._renderPlayerProfile = this._renderPlayerProfile.bind(this);
    this._renderChangePassword = this._renderChangePassword.bind(this);
    this._renderSetPinNumbers = this._renderSetPinNumbers.bind(this);

    this._changeIndex = this._changeIndex.bind(this);
    this._getOpacity = this._getOpacity.bind(this);
    this._getBackgroundColor = this._getBackgroundColor.bind(this);
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
            <div id="pop-out-title">会员中心</div>
            <ImageHandler
              src="pop_out/close_button.png"
              scale={0.44}
              onClick={hidePopOut}
            />
          </div>
          <div
            id="profile-selection-menu-container"
            className="row-container center"
          >
            {this._renderProfileMenu(0, "会员资料")}
            {this._renderProfileMenu(1, "更改登录密码")}
            {this._renderProfileMenu(2, "设置提款密码")}
          </div>
          {this._renderProfileContent()}
        </div>
      </Modal>
    );
  }

  private _renderProfileMenu(index: number, label: string): JSX.Element {
    return (
      <div
        className="profile-menu column-container center"
        onClick={(): void => {
          this._changeIndex(index);
        }}
      >
        <div className="label-container yellow" style={this._getOpacity(index)}>
          {label}
        </div>
        <div
          className="bar-container"
          style={this._getBackgroundColor(index)}
        ></div>
      </div>
    );
  }

  private _renderProfileContent(): JSX.Element {
    const { selectedIndex } = this.state;
    switch (selectedIndex) {
      case 0:
        return this._renderPlayerProfile();
      case 1:
        return this._renderChangePassword();
      case 2:
        return this._renderSetPinNumbers();
      default:
        return null;
    }
  }

  private _renderPlayerProfile(): JSX.Element {
    const { username } = dataSource.playerModel;
    return (
      <div id="profile-container" className="column-container center">
        <div className="profile-content row-container center">
          <div className="profile-box">
            <div className="profile-label">会员账号</div>
          </div>
          <div className="profile-box">
            <div className="profile-label">{username}</div>
          </div>
        </div>
        <div className="profile-content row-container center">
          <div className="profile-box">
            <div className="profile-label">会员手机</div>
          </div>
          <div className="profile-box">
            <div className="profile-label">12345678999</div>
          </div>
        </div>
      </div>
    );
  }

  private _renderChangePassword(): JSX.Element {
    const warning = {
      backgroundImage: "url(pop_out/warning.png)",
      backgroundPosition: "0% 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "15px",
    };

    return (
      <div id="change-password-container" className="pop-out-form-container">
        <form autoComplete="off">
          <FormInputBox
            id="oldpassword"
            placeholder="请输入旧密码"
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
            id="newpassword"
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
            id="verifiedpassword"
            placeholder="请再次确认新密码"
            type="password"
            leftImage={"pop_out/password_logo.png"}
            rightImage={"pop_out/password_eye.png"}
            min={6}
            max={12}
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

  private _renderSetPinNumbers(): JSX.Element {
    const warning = {
      backgroundImage: "url(pop_out/warning.png)",
      backgroundPosition: "0% 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "15px",
    };

    return (
      <div id="set-pin-container" className="pop-out-form-container">
        <form autoComplete="off">
          <FormInputBox id="phonenumber" placeholder="请输入注册手机号码" />
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
          />
          <FormInputBox
            id="newpassword"
            placeholder="请设置新提款密码"
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
            id="verifiedpassword"
            placeholder="请再次确认新提款密码"
            type="password"
            leftImage={"pop_out/password_logo.png"}
            rightImage={"pop_out/password_eye.png"}
            min={6}
            max={12}
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

  private _changeIndex(index: number): void {
    this.setState({ selectedIndex: index });
  }

  private _getOpacity(index: number): CSSProperties {
    const { selectedIndex } = this.state;
    if (selectedIndex === index) {
      return { opacity: 1 };
    } else {
      return { opacity: 0.7 };
    }
  }

  private _getBackgroundColor(index: number): CSSProperties {
    const { selectedIndex } = this.state;
    if (selectedIndex === index) {
      return { backgroundColor: "#E9A400" };
    } else {
      return { backgroundColor: "black" };
    }
  }
}

export { ProfilePopOut };
