import React from "react";

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

interface Props {}

interface State {
  isMobile: boolean;
  scale: number;
  type: PopOutType;
  toggle: boolean;
}

export default class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isMobile: false,
      scale: 1,
      type: PopOutType.NONE,
      toggle: false,
    };

    this._renderMobileView = this._renderMobileView.bind(this);
    this._renderBrowserView = this._renderBrowserView.bind(this);
    this._showPopOut = this._showPopOut.bind(this);
    this._hidePopOut = this._hidePopOut.bind(this);
    this._onResize = this._onResize.bind(this);
  }

  public componentDidMount(): void {
    const { isMobile } = require("react-device-detect");
    this.setState({ isMobile });
    this._onResize();
    window.addEventListener("resize", this._onResize);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this._onResize);
  }

  public render(): JSX.Element {
    const { isMobile } = this.state;
    if (isMobile) {
      return this._renderMobileView();
    } else {
      return this._renderBrowserView();
    }
  }

  private _renderMobileView(): JSX.Element {
    const { isMobile, scale, type, toggle } = this.state;
    return (
      <div id="main-container">
        <div id="map-mobile" style={{ transform: `scale(${scale})` }}>
          <LoginBar isMobile={isMobile} showPopOut={this._showPopOut} />
          <Slider isMobile={isMobile} />
          <NoticeBoard isMobile={isMobile} />
          <CardList isMobile={isMobile} showPopOut={this._showPopOut} />
          <EventBar isMobile={isMobile} />
          <PopOut type={type} toggle={toggle} hidePopOut={this._hidePopOut} />
        </div>
      </div>
    );
  }

  private _renderBrowserView(): JSX.Element {
    const { isMobile, scale, type, toggle } = this.state;
    return (
      <div id="main-container">
        <div id="map-browser" style={{ transform: `scale(${scale})` }}>
          <LoginBar isMobile={isMobile} showPopOut={this._showPopOut} />
          <UtilityBar />
          <GameListBar />
          <Slider isMobile={isMobile} />
          <NoticeBoard isMobile={isMobile} />
          <CardList isMobile={isMobile} showPopOut={this._showPopOut} />
          <EventBar isMobile={isMobile} />
          <CustomerService />
          <SponsorBar />
          <PopOut type={type} toggle={toggle} hidePopOut={this._hidePopOut} />
        </div>
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
    const { isMobile } = this.state;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const maxWidth = isMobile ? 375 : 1920;
    let newScale = (window.innerWidth - scrollBarWidth) / maxWidth;
    newScale = newScale <= 0.66 ? 0.66 : newScale;
    this.setState({ scale: newScale });
  }
}
