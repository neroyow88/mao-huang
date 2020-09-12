import React from "react";
import { ImageHandler } from "./ImageHandler";
import { dataSource } from "../model/DataSource";
// import { Carousel, CarouselIndicators, CarouselItem } from "reactstrap";

const iconType = {
  SERVICE: 1,
  BROWSER: 2,
};

interface Props {}

class CustomerService extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._renderMobileView = this._renderMobileView.bind(this);
    this._renderBrowserView = this._renderBrowserView.bind(this);
    this._renderIcon = this._renderIcon.bind(this);
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
        {this._renderCustomerService("profile_1", "周文君")}
      </div>
    );
  }

  private _renderBrowserView(): JSX.Element {
    return (
      <div
        id="customer-service-container-browser"
        className="row-container center"
      >
        <div id="left-service-container" className="column-container center">
          <div className="icons-container row-container center">
            {this._renderIcon(
              "icon/icon_about.png",
              "关于猫皇",
              iconType.SERVICE
            )}
            {this._renderIcon(
              "icon/icon_service.png",
              "服务条款",
              iconType.SERVICE
            )}
            {this._renderIcon(
              "icon/icon_deposit.png",
              "游戏充值",
              iconType.SERVICE
            )}
          </div>
          <div className="icons-container row-container center">
            {this._renderIcon(
              "icon/icon_withdraw.png",
              "快速提款",
              iconType.SERVICE
            )}
            {this._renderIcon("icon/icon_qa.png", "常见问题", iconType.SERVICE)}
            {this._renderIcon(
              "icon/icon_privacy.png",
              "私隐保障",
              iconType.SERVICE
            )}
          </div>
          <div id="suggestion-label">建议使用的浏览器</div>
          <div className="icons-container row-container center">
            {this._renderIcon("browser/chrome.png", "谷歌", iconType.BROWSER)}
            {this._renderIcon("browser/firefox.png", "火狐", iconType.BROWSER)}
            {this._renderIcon("browser/zeus.png", "宙斯", iconType.BROWSER)}
            {this._renderIcon("browser/quark.png", "夸克", iconType.BROWSER)}
          </div>
        </div>
        <div id="right-service-container">
          {this._renderCustomerService("profile_1", "周文君")}
        </div>
      </div>
    );
  }

  private _renderCustomerService(src: string, name: string): JSX.Element {
    const { isMobile } = dataSource.systemModel;
    const url = isMobile ? "mobile/customer_service/" : "customer_service/";
    const profileScale = isMobile ? 0.7 : 1;
    const quationScale = isMobile ? 0.5 : 1;

    return (
      <div className="profile-container column-container center">
        <ImageHandler src={`${url}${src}.png`} scale={profileScale} />
        <div className="name-label">{name}</div>
        <div className="title-label">客服中心</div>
        <div className="description-label row-container center">
          <ImageHandler
            src={"customer_service/quation_left.png"}
            scale={quationScale}
          />
          24小时的专业客服团队,提供及时贴心的服务
          <ImageHandler
            src={"customer_service/quation_right.png"}
            scale={quationScale}
          />
        </div>
      </div>
    );
  }

  private _renderIcon(img: string, label: string, type: number): JSX.Element {
    let iconContainerStyle;
    let iconImageContainerStyle;

    switch (type) {
      case iconType.SERVICE:
        iconContainerStyle = {
          width: "33%",
        };
        iconImageContainerStyle = {
          width: "70px",
          height: "70px",
          marginRight: "20px",
        };
        break;
      case iconType.BROWSER:
        iconContainerStyle = {
          width: "25%",
        };
        iconImageContainerStyle = {
          width: "40px",
          height: "40px",
          marginRight: " 12px",
        };
        break;
    }

    return (
      <div className="row-container center" style={iconContainerStyle}>
        <div className="row-container center" style={iconImageContainerStyle}>
          <img src={img}></img>
        </div>
        <div className="label-container">{label}</div>
      </div>
    );
  }
}

export { CustomerService };
