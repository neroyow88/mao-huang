import React from "react";
import { isMobile } from "react-device-detect";

// Components
import { LoginBar } from "../components/LoginBar";
import { UtilityBar } from "../components/UtilityBar";
import { GameListBar } from "../components/GameListBar";
import { Slider } from "../components/Slider";
import { NoticeBoard } from "../components/NoticeBoard";
import { CardList } from "../components/Card";
import { EventBar } from "../components/EventBar";
import { CustomerService } from "../components/CustomerService";
import { SponsorBar } from "../components/SponsorBar";
import { PopOut } from "../components/PopOut";
import { PopOutType } from "../model/WebConstant";
import { loadingManager } from "../model/LoadingManager";
import { LoadingView } from "../components/LoadingView";
import { utils } from "../model/Utils";
// import { NavigationBar } from "../components/NavigationBar";

interface Props {}

interface State {
  isStart: boolean;
  isLoading: boolean;
  scale: number;
  type: PopOutType;
  toggle: boolean;
  height: number;
}

export default class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isStart: false,
      isLoading: true,
      scale: 1,
      type: PopOutType.NONE,
      toggle: false,
      height: 0,
    };

    this._renderMobileView = this._renderMobileView.bind(this);
    this._renderBrowserView = this._renderBrowserView.bind(this);
    this._showPopOut = this._showPopOut.bind(this);
    this._hidePopOut = this._hidePopOut.bind(this);

    this._onResize = this._onResize.bind(this);
    this._onAllTasksCompleted = this._onAllTasksCompleted.bind(this);
  }

  public componentDidMount(): void {
    setInterval((): void => {
      utils.isMobile = isMobile;
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
    const { isStart, isLoading, height } = this.state;
    const content = isStart
      ? utils.isMobile
        ? this._renderMobileView()
        : this._renderBrowserView()
      : null;

    return (
      <div id="main-container">
        <LoadingView isLoading={isLoading} height={height} />
        {content}
      </div>
    );
  }

  private _renderMobileView(): JSX.Element {
    const { scale, type, toggle } = this.state;
    return (
      <div id="map-mobile" style={{ transform: `scale(${scale})` }}>
        <LoginBar showPopOut={this._showPopOut} />
        <Slider />
        <NoticeBoard />
        <CardList showPopOut={this._showPopOut} />
        <EventBar />
        <GameListBar />
        <PopOut type={type} toggle={toggle} hidePopOut={this._hidePopOut} />
        {/* <NavigationBar /> */}
      </div>
    );
  }

  private _renderBrowserView(): JSX.Element {
    const { scale, type, toggle } = this.state;
    return (
      <div id="map-browser" style={{ transform: `scale(${scale})` }}>
        <LoginBar showPopOut={this._showPopOut} />
        <UtilityBar />
        <GameListBar />
        <Slider />
        <NoticeBoard />
        <CardList showPopOut={this._showPopOut} />
        <EventBar />
        <CustomerService />
        <SponsorBar />
        <PopOut type={type} toggle={toggle} hidePopOut={this._hidePopOut} />
      </div>
    );
  }

  private _showPopOut(type: PopOutType): void {
    this.setState({ type, toggle: true });
  }

  private _hidePopOut(): void {
    this.setState({ type: PopOutType.NONE, toggle: false });
  }

  private _onResize(): void {
    let newScale;
    if (utils.isMobile) {
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
