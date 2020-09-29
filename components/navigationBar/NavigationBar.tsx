import React from "react";

import { ImageHandler } from "../share/ImageHandler";

interface Props {
  scale: number;
}

interface State {
  currentIndex: number;
}

class NavigationBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentIndex: 1,
    };

    this._renderAboutMenu = this._renderAboutMenu.bind(this);
    this._renderNavigationItem = this._renderNavigationItem.bind(this);
  }

  public render(): JSX.Element {
    const { scale } = this.props;

    return (
      <div
        id="navigation-bar-container"
        style={{ transform: `scale(${scale})` }}
      >
        {this._renderAboutMenu()}
        {this._renderNavigationBar()}
      </div>
    );
  }

  private _renderAboutMenu(): JSX.Element {
    const { currentIndex } = this.state;
    const rot = currentIndex === 3 ? 0 : 180;
    const opacity = currentIndex === 3 ? 0.8 : 0;

    return (
      <div
        id="about-pop-up-container"
        style={{
          transform: `translateY(-250px) rotate(${rot}deg)`,
          opacity: opacity,
        }}
      >
        <div id="first-row-container" className="row-container center">
          {this._renderAboutItem("about", "关于猫皇", 0.1)}
        </div>
        <div id="second-row-container" className="row-container center">
          {this._renderAboutItem("withdraw", "快速提款", 0.28)}
          {this._renderAboutItem("deposit", "游戏充值", 0.35)}
          {this._renderAboutItem("question", "常见问题", 0.31)}
        </div>
        <div id="third-row-container" className="row-container center">
          {this._renderAboutItem("list", "服务条款", 0.36)}
          {this._renderAboutItem("privacy", "私隐保障", 0.35)}
        </div>
      </div>
    );
  }

  private _renderAboutItem(
    id: string,
    label: string,
    scale: number
  ): JSX.Element {
    return (
      <div id={`${id}-container`}>
        <ImageHandler src={`mobile/about_us/${id}.png`} scale={scale} />
        <div className="about-label-container">{label}</div>
      </div>
    );
  }

  private _renderNavigationBar(): JSX.Element {
    return (
      <div id="navigation-bar-background" className="row-container center">
        {this._renderNavigationItem("home", "主页", 0.22, 1)}
        {this._renderNavigationItem("mail", "留言信息", 0.22, 2)}
        {this._renderNavigationItem("about", "关于", 0.5, 3)}
        {this._renderNavigationItem("service", "客服中心", 0.22, 4)}
        {this._renderNavigationItem("money", "财务中心", 0.22, 5)}
      </div>
    );
  }

  private _renderNavigationItem(
    id: string,
    title: string,
    scale: number,
    index: number
  ): JSX.Element {
    const { currentIndex } = this.state;
    const buttonUrl =
      index === 3
        ? id
        : index === currentIndex
        ? `${id}_active`
        : `${id}_inactive`;

    const labelColor = index === currentIndex ? "#AD0003" : "#1E202F";

    return (
      <div
        id={`${id}-container`}
        className="column-container center"
        onClick={(): void => {
          this._setCurrentIndex(index);
        }}
      >
        <ImageHandler
          src={`mobile/navigation_bar/${buttonUrl}.png`}
          scale={scale}
        />
        <div className="navigation-label" style={{ color: labelColor }}>
          {title}
        </div>
      </div>
    );
  }

  private _setCurrentIndex(index: number): void {
    this.setState({ currentIndex: index });
  }
}

export { NavigationBar };
