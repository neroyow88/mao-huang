import React from "react";

// Components
import { LoginBar } from "./loginBar/LoginBar";
import { GameListBar } from "./gameListBar/GameListBar";
import { UtilityBar } from "./utilityBar/UtilityBar";
import { Slider } from "./slider/Slider";
import { NoticeBoard } from "./noticeBoard/NoticeBoard";
import { Cards } from "./card/Cards";
import { EventBar } from "./eventBar/EventBar";
import { About } from "./about/About";
import { Footer } from "./footer/Footer";
import { InfoPage } from "./info/InfoPage";

import { PopOut } from "./popOut/PopOut";
import { NoticePopOut } from "./popOut/NoticePopOut";
import { AudioComp } from "./global/AudioComp";

import { AboutType, PopOutType } from "../scripts/WebConstant";
import { popOutHandler } from "../scripts/PopOutHandler";
import { LoginStatusModel } from "../scripts/dataSource/LoginStatusModel";
import { PlatformsModel } from "../scripts/dataSource/PlatformsModel";
import { BannersModel } from "../scripts/dataSource/BannersModel";
import { ContactModel } from "../scripts/dataSource/ContactModel";

interface IDataSource {
  isMobile: boolean;
  loginStatus: LoginStatusModel;
  platforms: PlatformsModel;
  contact: ContactModel;
  banners: BannersModel;
}

interface Props {
  scale: number;
  loginCallback: (value: boolean, name?: string) => void;
  dataSource: IDataSource;
}

interface State {
  isStart: boolean;
  popOutConfig: {
    toggle: boolean;
    type: PopOutType;
    customData?: GenericObjectType;
  };
  noticePopOutConfig: {
    toggle: boolean;
    customData: GenericObjectType;
  };
  aboutType: AboutType;
}

class HomeBrowserView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isStart: false,
      popOutConfig: {
        toggle: false,
        type: PopOutType.NONE,
        customData: Object.create(null),
      },
      noticePopOutConfig: {
        toggle: false,
        customData: Object.create(null),
      },
      aboutType: AboutType.NONE,
    };

    this._showPopOut = this._showPopOut.bind(this);
    this._hidePopOut = this._hidePopOut.bind(this);
    this._showNotice = this._showNotice.bind(this);
    this._hideNotice = this._hideNotice.bind(this);

    this._showHome = this._showHome.bind(this);
    this._showAbout = this._showAbout.bind(this);

    popOutHandler.init({
      showPopOut: this._showPopOut,
      hidePopOut: this._hidePopOut,
      showNotice: this._showNotice,
      hideNotice: this._hideNotice,
    });
  }

  public render(): JSX.Element {
    const { scale, loginCallback, dataSource } = this.props;
    const { popOutConfig, noticePopOutConfig, aboutType } = this.state;
    const { isMobile, loginStatus, platforms, contact, banners } = dataSource;
    const { isLogin } = loginStatus;

    const page =
      aboutType === AboutType.NONE ? (
        <div id="page-container">
          <Slider isMobile={isMobile} model={banners} />
          <NoticeBoard isMobile={isMobile} />
          <Cards isMobile={isMobile} isLogin={isLogin} />
          <EventBar isMobile={isMobile} isLogin={isLogin} />
          <About isMobile={isMobile} showAbout={this._showAbout} />
        </div>
      ) : (
        <div id="page-container">
          <InfoPage aboutType={aboutType} />
        </div>
      );

    return (
      <div id="map-browser" style={{ transform: `scale(${scale})` }}>
        <LoginBar
          isMobile={isMobile}
          model={loginStatus}
          loginCallback={loginCallback}
        />
        <UtilityBar
          isLogin={isLogin}
          showHome={this._showHome}
          model={platforms}
        />
        <GameListBar isMobile={isMobile} model={platforms} />
        {page}
        <Footer model={contact} />
        <PopOut
          scale={scale}
          config={popOutConfig}
          loginCallback={loginCallback}
        />
        <NoticePopOut scale={scale} config={noticePopOutConfig} />
        <AudioComp />
      </div>
    );
  }

  private _showPopOut(type: PopOutType, customData?: GenericObjectType): void {
    this.setState({
      popOutConfig: {
        toggle: true,
        type,
        customData,
      },
    });
  }

  private _hidePopOut(): void {
    this.setState({
      popOutConfig: {
        toggle: false,
        type: PopOutType.NONE,
        customData: Object.create(null),
      },
    });
  }

  private _showNotice(customData: GenericObjectType): void {
    this.setState({
      noticePopOutConfig: {
        toggle: true,
        customData,
      },
    });
  }

  private _hideNotice(): void {
    this.setState({
      noticePopOutConfig: {
        toggle: false,
        customData: Object.create(null),
      },
    });
  }

  private _showHome(): void {
    this.setState({ aboutType: AboutType.NONE });
  }

  private _showAbout(index: AboutType): void {
    this.setState({ aboutType: index });
    const element = document.getElementById("page-container");
    element && element.scrollIntoView();
  }
}

export { HomeBrowserView };
