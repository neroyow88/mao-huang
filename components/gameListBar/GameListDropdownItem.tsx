import React from "react";
import { loginGame } from "../../scripts/ApiClient";

interface Props {
  index: string;
  src: string;
  gameCode?: string;
}

interface State {
  hover: boolean;
}

class GameListDropdownItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hover: false,
    };

    this._onHover = this._onHover.bind(this);
    this._onUnhover = this._onUnhover.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  public render(): JSX.Element {
    const { index, src } = this.props;
    const { hover } = this.state;
    const active = hover ? "active" : "deactive";

    return (
      <div
        className="dropdown-item-container"
        key={`dropdown-item-container${index}`}
        onMouseEnter={(): void => {
          this._onHover();
        }}
        onMouseLeave={(): void => {
          this._onUnhover();
        }}
        onClick={(): void => {
          this._onClick();
        }}
      >
        <img src={`${src}_${active}.png`}></img>
      </div>
    );
  }

  private _onHover(): void {
    this.setState({ hover: true });
  }

  private _onUnhover(): void {
    this.setState({ hover: false });
  }

  private _onClick(): void {
    const { index, gameCode } = this.props;
    loginGame(index, gameCode);

    // const onResultReturn = (result, error): void => {
    //   if (result && !error) {
    //     const url = result.data;
    //     window.open(url, "_blank");
    //   }
    // };

    // const params = new FormData();
    // params.append("platform", index);
    // gameCode && params.append("gamecode", gameCode);

    // const config = {
    //   path: ApiPath.LOGIN_GAME,
    //   callback: onResultReturn,
    //   params: params,
    // };

    // callApi(config);
  }
}

export { GameListDropdownItem };
