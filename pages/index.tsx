import React from "react";
import { isMobile } from "react-device-detect";

// Components
import { LoginBar } from "../components/LoginBar";
import { UtilityBar } from "../components/Utility/UtilityBar";
import { GameListBar } from "../components/GameListBar";
import { Slider } from "../components/Slider";
import { NoticeBoard } from "../components/NoticeBoard";
import { CardList } from "../components/Card";
import { EventBar } from "../components/EventBar/EventBar";
import { CustomerService } from "../components/CustomerService";
import { SponsorBar } from "../components/SponsorBar";
import { PopOut } from "../components/PopOut/PopOut";
import { PopOutType } from "../model/WebConstant";
import { loadingManager } from "../model/LoadingManager";
import { LoadingView } from "../components/LoadingView";
import { NavigationBar } from "../components/NavigationBar";
import { dataSource } from "../model/DataSource";
import { NoticePopOut } from "../components/PopOut/NoticePopOut";
import { popOutHandler } from "../model/PopOutHandler";
import { AudioComp } from "../components/AudioComp";

interface Props {}

interface State {
  isStart: boolean;
  isLoading: boolean;
  scale: number;
  height: number;
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

export default class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isStart: false,
      isLoading: true,
      scale: 1,
      height: 0,
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

    this._renderMobileView = this._renderMobileView.bind(this);
    this._renderBrowserView = this._renderBrowserView.bind(this);

    this._onResize = this._onResize.bind(this);
    this._onAllTasksCompleted = this._onAllTasksCompleted.bind(this);

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

  public componentDidMount(): void {
    setInterval((): void => {
      dataSource.updateSystemModel({ isMobile });
      this.setState({ isStart: true });
      this._onResize();
      window.addEventListener("resize", this._onResize);
      loadingManager.setOnAllTasksComplete(this._onAllTasksCompleted);
    }, 10);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this._onResize);
  }

  public render(): JSX.Element {
    const { isStart, isLoading, height, scale } = this.state;
    const { isMobile } = dataSource.systemModel;

    const content = isStart
      ? isMobile
        ? this._renderMobileView()
        : this._renderBrowserView()
      : null;
    const navigationBar = isMobile ? <NavigationBar scale={scale} /> : null;

    return (
      <div id="main-container" style={{ height: height }}>
        <LoadingView isLoading={isLoading} height={height} />
        {content}
        {navigationBar}
      </div>
    );
  }

  private _renderMobileView(): JSX.Element {
    const { scale, popOutConfig } = this.state;

    return (
      <div id="map-mobile" style={{ transform: `scale(${scale})` }}>
        <LoginBar />
        <Slider />
        <NoticeBoard />
        <CardList />
        <EventBar />
        <GameListBar />
        <CustomerService />
        <PopOut scale={scale} config={popOutConfig} />
      </div>
    );
  }

  private _renderBrowserView(): JSX.Element {
    const { isLoading, scale, popOutConfig, noticePopOutConfig } = this.state;

    return (
      <div id="map-browser" style={{ transform: `scale(${scale})` }}>
        <LoginBar />
        <UtilityBar />
        <GameListBar isLoaded={!isLoading} />
        <Slider />
        <NoticeBoard />
        <CardList />
        <EventBar />
        <CustomerService />
        <SponsorBar />
        <PopOut scale={scale} config={popOutConfig} />
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

  private _onResize(): void {
    const { isMobile } = dataSource.systemModel;
    let newScale;
    if (isMobile) {
      const maxWidth = 375;
      newScale = window.innerWidth / maxWidth;
    } else {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      const maxWidth = 1920;
      newScale = (window.innerWidth - scrollBarWidth) / maxWidth;
      newScale = newScale <= 0.66 ? 0.66 : newScale;
    }
    this.setState({ scale: newScale, height: window.innerHeight });
  }

  private _onAllTasksCompleted(): void {
    this.setState({ isLoading: false });
  }
}
