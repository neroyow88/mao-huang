import React from "react";
import { GameListDropdownItem } from "./GameListDropdownItem";

interface Props {
  index: number;
  toggle: boolean;
  content: IGameListItem;
}

interface State {
  selectedIndex: number;
}

class GameListDropdownMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: -1,
    };

    this._renderDropdownItems = this._renderDropdownItems.bind(this);
    this._onItemSelected = this._onItemSelected.bind(this);
  }

  public render(): JSX.Element {
    const { index, toggle, content } = this.props;
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
              src={`game_list/${content.prefix}/logo.png`}
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
    const { index, content } = this.props;
    let components = [];
    if (content.childs && content.childs.length > 0) {
      components = content.childs.map((child: string, id: number) => {
        const convertIndex = index * 100 + id;
        const url = `game_list/${content.prefix}/${child}`;
        return (
          <GameListDropdownItem
            index={convertIndex}
            src={url}
            onClick={this._onItemSelected}
          />
        );
      });
    }

    return components;
  }

  private _onItemSelected(index: number): void {
    this.setState({ selectedIndex: index });
  }
}

export { GameListDropdownMenu };
