import React from "react";
import { ImageHandler } from "./ImageHandler";

interface Props {}

interface State {}

class NavigationBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div id="navigation-bar-container">
        <div className="home-container">
          <ImageHandler
            src={`mobile/navigation_bar/home_inactive.png`}
            scale={0.22}
          />
          <div className="navigation-label">主页</div>
        </div>

        <div className="mail-container">
          <ImageHandler
            src={`mobile/navigation_bar/mail_inactive.png`}
            scale={0.22}
          />
          <div className="navigation-label">留言信息</div>
        </div>

        <div className="about-container">
          <ImageHandler src={`mobile/navigation_bar/about.png`} scale={0.5} />
          <div className="navigation-label">关于</div>
        </div>

        <div className="service-container">
          <ImageHandler
            src={`mobile/navigation_bar/service_inactive.png`}
            scale={0.22}
          />
          <div className="navigation-label">客服中心</div>
        </div>

        <div className="money-container">
          <ImageHandler
            src={`mobile/navigation_bar/money_inactive.png`}
            scale={0.22}
          />
          <div className="navigation-label">财务中心</div>
        </div>
      </div>
    );
  }
}

export { NavigationBar };
