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

import { BrowserState, PopOutType } from "../scripts/WebConstant";
import { popOutHandler } from "../scripts/PopOutHandler";

interface Props {
  scale: number;
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
  browserState: BrowserState;
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
      browserState: BrowserState.HOME,
    };

    this._showPopOut = this._showPopOut.bind(this);
    this._hidePopOut = this._hidePopOut.bind(this);
    this._showNotice = this._showNotice.bind(this);
    this._hideNotice = this._hideNotice.bind(this);
    this._showAbout = this._showAbout.bind(this);

    popOutHandler.init({
      showPopOut: this._showPopOut,
      hidePopOut: this._hidePopOut,
      showNotice: this._showNotice,
      hideNotice: this._hideNotice,
    });
  }

  public render(): JSX.Element {
    const { scale } = this.props;
    const { popOutConfig } = this.state;

    return (
      <div id="map-mobile" style={{ transform: `scale(${scale})` }}>
        <LoginBar />
        <Slider />
        <NoticeBoard />
        <Cards />
        <EventBar />
        <GameListBar />
        <About showAbout={this._showAbout} />
        <PopOut scale={scale} config={popOutConfig} />
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

  private _showAbout(state: BrowserState): void {
    this.setState({ browserState: state });
  }
}

export { HomeMobileView };
