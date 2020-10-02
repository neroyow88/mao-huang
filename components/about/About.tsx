import React from "react";

import { AboutButton } from "./AboutButton";
import { AboutBrowser } from "./AboutBrowser";
import { AboutCustomerService } from "./AboutCustomerService";

import { dataSource } from "../../scripts/dataSource/DataSource";
import { AboutType, BrowserState } from "../../scripts/WebConstant";

interface Props {
  showAbout: (state: BrowserState) => void;
}

interface State {
  selectedAbout: AboutType;
}

class About extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedAbout: AboutType.ABOUT_US,
    };

    this._renderMobileView = this._renderMobileView.bind(this);
    this._renderBrowserView = this._renderBrowserView.bind(this);
    this._onClickAbout = this._onClickAbout.bind(this);
  }

  public render(): JSX.Element {
    const { isMobile } = dataSource.systemModel;
    if (isMobile) {
      return this._renderMobileView();
    } else {
      return this._renderBrowserView();
    }
  }

  private _renderMobileView(): JSX.Element {
    return (
      <div id="customer-service-container-mobile">
        <AboutCustomerService
          src={"mobile/customer_service/profile_1"}
          label="周文君"
          profileScale={0.7}
          quationScale={0.5}
        />
      </div>
    );
  }

  private _renderBrowserView(): JSX.Element {
    return (
      <div id="about-container-browser" className="row-container">
        <div id="left-about-container" className="column-container center">
          <div className="about-button-container row-container">
            <AboutButton
              src="about/icon_about.png"
              label="关于猫皇"
              index={AboutType.ABOUT_US}
              onClick={this._onClickAbout}
            />
            <AboutButton
              src="about/icon_service.png"
              label="服务条款"
              index={AboutType.SERVICE}
              onClick={this._onClickAbout}
            />
            <AboutButton
              src="about/icon_deposit.png"
              label="游戏充值"
              index={AboutType.DEPOSIT}
              onClick={this._onClickAbout}
            />
          </div>
          <div className="about-button-container row-container">
            <AboutButton
              src="about/icon_withdraw.png"
              label="快速提款"
              index={AboutType.WITHDRAW}
              onClick={this._onClickAbout}
            />
            <AboutButton
              src="about/icon_qa.png"
              label="常见问题"
              index={AboutType.QUESTION_ANSWER}
              onClick={this._onClickAbout}
            />
            <AboutButton
              src="about/icon_privacy.png"
              label="私隐保障"
              index={AboutType.PRIVACY}
              onClick={this._onClickAbout}
            />
          </div>
          <div id="suggestion-label">建议使用的浏览器</div>
          <div className="about-browser-container row-container">
            <AboutBrowser src="about/chrome.png" label="谷歌" />
            <AboutBrowser src="about/firefox.png" label="火狐" />
            <AboutBrowser src="about/zeus.png" label="宙斯" />
            <AboutBrowser src="about/quark.png" label="夸克" />
          </div>
        </div>
        <div id="right-about-container">
          <AboutCustomerService
            src={"about/profile_1"}
            label="周文君"
            profileScale={1}
            quationScale={1}
          />
        </div>
      </div>
    );
  }

  private _onClickAbout(index: AboutType): void {
    this.setState({ selectedAbout: index });
  }
}

export { About };
