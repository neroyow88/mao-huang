import React from "react";
import { Modal } from "reactstrap";

import { ProfileMenu } from "./ProfileMenu";
import { ProfileUser } from "./ProfileUser";
import { ProfileChangePassword } from "./ProfileChangePassword";
import { ProfileSetPinNumber } from "./ProfileSetPinNumber";

import { PopOutTitle } from "../../share/PopOutTitle";
import { callApi } from "../../../scripts/ApiClient";
import { ApiPath } from "../../../scripts/WebConstant";

import customStyle from "../../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

interface State {
  selectedIndex: number;
  profileData: IProfile;
}

class ProfilePopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      profileData: Object.create(null),
    };

    this._renderProfileContent = this._renderProfileContent.bind(this);
    this._changeIndex = this._changeIndex.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const onResultReturn = (result, err): void => {
        const data = result.data;
        if (result && !err) {
          this.setState({
            profileData: {
              id: data.id,
              memberId: data.member_id,
              name: data.realname,
              phoneNumber: data.handphone,
            },
          });
        }
        transitionComplete();
      };

      const config = {
        path: ApiPath.GET_PROFILE,
        callback: onResultReturn,
      };
      callApi(config);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="会员中心" onHide={onHide} />
          <div
            id="profile-selection-menu-container"
            className="row-container center"
          >
            <ProfileMenu
              index={0}
              label={"会员资料"}
              onChangeIndex={this._changeIndex}
              isSelected={selectedIndex === 0}
            />
            <ProfileMenu
              index={1}
              label={"更改登录密码"}
              onChangeIndex={this._changeIndex}
              isSelected={selectedIndex === 1}
            />
            <ProfileMenu
              index={2}
              label={"设置提款密码"}
              onChangeIndex={this._changeIndex}
              isSelected={selectedIndex === 2}
            />
          </div>
          {this._renderProfileContent()}
        </div>
      </Modal>
    );
  }

  private _renderProfileContent(): JSX.Element {
    const { selectedIndex, profileData } = this.state;
    switch (selectedIndex) {
      case 0:
        return (
          <ProfileUser
            username={profileData.name}
            phoneNumber={profileData.phoneNumber}
          />
        );
      case 1:
        return <ProfileChangePassword />;
      case 2:
        return <ProfileSetPinNumber />;
      default:
        return null;
    }
  }

  private _changeIndex(index: number): void {
    this.setState({ selectedIndex: index });
  }
}

export { ProfilePopOut };
