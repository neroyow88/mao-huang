import React from "react";

interface Props {
  index: number;
  src: string;
  onClick: (index: number) => void;
}

interface State {
  hover: boolean;
  selectedIndex: number;
}

class GameListDropdownItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hover: false,
      selectedIndex: -1,
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
    const { index, onClick } = this.props;
    onClick && onClick(index);
  }
}

export { GameListDropdownItem };
