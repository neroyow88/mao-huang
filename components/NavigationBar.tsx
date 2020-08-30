import React from "react";
import { ImageHandler } from "./ImageHandler";

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

    this._renderNavigationItem = this._renderNavigationItem.bind(this);
  }

  public render(): JSX.Element {
    const { scale } = this.props;

    return (
      <div
        id="navigation-bar-container"
        style={{ transform: `scale(${scale})` }}
      >
        <div id="navigation-bar-background">
          {this._renderNavigationItem(
            "home-container",
            "home",
            "主页",
            0.22,
            1
          )}
          {this._renderNavigationItem(
            "mail-container",
            "mail",
            "留言信息",
            0.22,
            2
          )}
          {this._renderNavigationItem(
            "about-container",
            "about",
            "关于",
            0.5,
            3
          )}
          {this._renderNavigationItem(
            "service-container",
            "service",
            "客服中心",
            0.22,
            4
          )}
          {this._renderNavigationItem(
            "money-container",
            "money",
            "财务中心",
            0.22,
            5
          )}
        </div>
      </div>
    );
  }

  private _renderNavigationItem(
    className: string,
    src: string,
    title: string,
    scale: number,
    index: number
  ): JSX.Element {
    const { currentIndex } = this.state;
    const buttonUrl =
      index === 3
        ? src
        : index === currentIndex
        ? `${src}_active`
        : `${src}_inactive`;

    const labelColor = index === currentIndex ? "#AD0003" : "#1E202F";

    return (
      <div
        className={`${className}`}
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
