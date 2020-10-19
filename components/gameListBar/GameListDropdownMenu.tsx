import React from "react";
import { GameListDropdownItem } from "./GameListDropdownItem";

interface Props {
  index: string;
  toggle: boolean;
  prefix: string;
  contents: string[];
}

interface State {}

class GameListDropdownMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this._renderDropdownItems = this._renderDropdownItems.bind(this);
    this._onItemSelected = this._onItemSelected.bind(this);
  }

  public render(): JSX.Element {
    const { index, toggle, prefix } = this.props;
    const yPos = toggle ? -1 : -100;

    return (
      <div className="dropdown-mask" key={`dropdown-mask-${index}`}>
        <div
          className="dropdown-menu-container column-container center"
          key={`dropdown-menu-container-${index}`}
          style={{ transform: `translateY(${yPos}%)` }}
        >
          <div
            className="dropdown-menu-title"
            key={`dropdown-menu-title-${index}`}
          >
            <img
              src={`game_list/${prefix}/logo.png`}
              style={{ transform: "scale(0.5)" }}
            />
          </div>
          <div
            className="dropdown-menu-grid"
            key={`dropdown-menu-grid-${index}`}
          >
            {this._renderDropdownItems()}
          </div>
        </div>
      </div>
    );
  }

  private _renderDropdownItems(): JSX.Element[] {
    const { index, prefix, contents } = this.props;

    let components = [];
    components = contents.map((child: string, id: number) => {
      const url = `game_list/${prefix}/${child}`;
      const gameCode = prefix === "KMG" ? child : undefined;

      return (
        <GameListDropdownItem
          index={index}
          src={url}
          gameCode={gameCode}
          key={`game-list-dropdown-item-${index}-${id}`}
        />
      );
    });

    return components;
  }

  private _onItemSelected(index: number): void {
    this.setState({ selectedIndex: index });
  }
}

export { GameListDropdownMenu };
