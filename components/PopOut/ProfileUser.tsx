import React from "react";

import { dataSource } from "../../model/DataSource";

interface Props {}

class ProfileUser extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { username, phoneNumber } = dataSource.playerModel;
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
            <div className="profile-label">{phoneNumber}</div>
          </div>
        </div>
      </div>
    );
  }
}

export { ProfileUser };
