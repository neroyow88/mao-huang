import React, { CSSProperties } from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";

import customStyle from "../../styles/module/AccountModal.module.scss";
import { ProfileUser } from "./ProfileUser";
import { ProfileChangePassword } from "./ProfileChangePassword";
import { ProfileSetPinNumber } from "./ProfileSetPinNumber";

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
    const { scale } = this.props;
    const { selectedIndex } = this.state;
    switch (selectedIndex) {
      case 0:
        return <ProfileUser />;
      case 1:
        return <ProfileChangePassword scale={scale} />;
      case 2:
        return <ProfileSetPinNumber scale={scale} />;
      default:
        return null;
    }
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
