import React from "react";
import { ImageHandler } from "./ImageHandler";

interface Props {}

interface State {}

class NavigationBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this._navigationItem = this._navigationItem.bind(this);
  }
  public render(): JSX.Element {
    return (
      <div id="navigation-bar-container">
        {this._navigationItem("home_inactive", "主页")}
        {this._navigationItem("mail_inactive", "留言信息")}
        {this._navigationItem("about", "关于")}
        {this._navigationItem("service_inactive", "客服中心")}
        {this._navigationItem("money_inactive", "财务中心")}
      </div>
    );
  }

  private _navigationItem(src: string, label: string): JSX.Element {
    return (
      <div className="navigation-item-container">
        <ImageHandler src={`mobile/navigation_bar/${src}.png`} />
        <div className="navigation-label">{label}</div>
      </div>
    );
  }
}

export { NavigationBar };
