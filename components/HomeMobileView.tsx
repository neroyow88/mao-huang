import React from "react";

// Components
import { LoginBar } from "./loginBar/LoginBar";
import { GameListBar } from "./gameListBar/GameListBar";
import { Slider } from "./slider/Slider";
import { NoticeBoard } from "./noticeBoard/NoticeBoard";
import { Cards } from "./card/Cards";
import { EventBar } from "./eventBar/EventBar";
import { About } from "./about/About";
import { PopOut } from "./popOut/PopOut";

import { PopOutType } from "../scripts/WebConstant";
import { popOutHandler } from "../scripts/PopOutHandler";
import { LoginStatusModel } from "../scripts/dataSource/LoginStatusModel";
import { PlatformsModel } from "../scripts/dataSource/PlatformsModel";
import { BannersModel } from "../scripts/dataSource/BannersModel";

interface IDataSource {
  isMobile: boolean;
  loginStatus: LoginStatusModel;
  platforms: PlatformsModel;
  banners: BannersModel;
}

interface Props {
  scale: number;
  loginCallback: (value: boolean, name?: string) => void;
  dataSource: IDataSource;
}

interface State {
  popOutConfig: {
    toggle: boolean;
    type: PopOutType;
    customData?: GenericObjectType;
  };
  noticePopOutConfig: {
    toggle: boolean;
    customData: GenericObjectType;
  };
}

class HomeMobileView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      popOutConfig: {
        toggle: false,
        type: PopOutType.NONE,
        customData: Object.create(null),
      },
      noticePopOutConfig: {
        toggle: false,
        customData: Object.create(null),
      },
    };

    this._showPopOut = this._showPopOut.bind(this);
    this._hidePopOut = this._hidePopOut.bind(this);
    this._showNotice = this._showNotice.bind(this);
    this._hideNotice = this._hideNotice.bind(this);

    popOutHandler.init({
      showPopOut: this._showPopOut,
      hidePopOut: this._hidePopOut,
      showNotice: this._showNotice,
      hideNotice: this._hideNotice,
    });
  }

  public render(): JSX.Element {
    const { scale, loginCallback, dataSource } = this.props;
    const { popOutConfig } = this.state;
    const { isMobile, loginStatus, platforms, banners } = dataSource;
    const { isLogin } = loginStatus;
    return (
      <div id="map-mobile" style={{ transform: `scale(${scale})` }}>
        <LoginBar
          isMobile={isMobile}
          model={loginStatus}
          loginCallback={loginCallback}
        />
        <Slider isMobile={isMobile} model={banners} />
        <NoticeBoard isMobile={isMobile} />
        <Cards isMobile={isMobile} isLogin={isLogin} />
        <EventBar isMobile={isMobile} isLogin={isLogin} />
        <GameListBar isMobile={isMobile} model={platforms} />
        <About isMobile={isMobile} showAbout={undefined} />
        <PopOut
          scale={scale}
          config={popOutConfig}
          loginCallback={loginCallback}
        />{" "}
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
}

export { HomeMobileView };
