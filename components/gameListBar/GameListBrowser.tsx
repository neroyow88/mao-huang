import React from "react";

import { gameListModel } from "../../scripts/GameListConstant";
import { GameListDropdownMenu } from "./GameListDropdownMenu";
import { GameListDropdownToggle } from "./GameListDropdownToggle";

interface Props {}

interface State {
  toggleIndex: number;
}

class GameListBrowser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toggleIndex: -1,
    };

    this._onToggle = this._onToggle.bind(this);
  }

  public render(): JSX.Element {
    const { toggleIndex } = this.state;

    const toggleComponents = gameListModel.map((item, index: number) => {
      const toggle = toggleIndex === index;
      return (
        <GameListDropdownToggle
          index={index}
          title={item.title}
          toggle={toggle}
          onToggle={this._onToggle}
        />
      );
    });

    const menuComponents = gameListModel.map((item, index: number) => {
      const toggle = toggleIndex === index;
      return (
        <GameListDropdownMenu index={index} toggle={toggle} content={item} />
      );
    });

    return (
      <div id="game-list-bar-container-browser">
        <div id="game-list-toggle-container" className="row-container">
          {toggleComponents}
        </div>
        {menuComponents}
      </div>
    );
  }

  private _onToggle(index: number): void {
    this.setState({ toggleIndex: index });
  }
}

export { GameListBrowser };
