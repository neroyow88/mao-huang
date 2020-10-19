import React from "react";

import { GameListDropdownMenu } from "./GameListDropdownMenu";
import { GameListDropdownToggle } from "./GameListDropdownToggle";

import { gameIcons } from "../../scripts/constant/GameListConstant";
import { PlatformsModel } from "../../scripts/dataSource/PlatformsModel";
import { GameIdList } from "../../scripts/WebConstant";

interface Props {
  model: PlatformsModel;
}

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
    const { model } = this.props;
    const { toggleIndex } = this.state;

    const toggleComponents = GameIdList.map((id: string, index: number) => {
      const item = model.getGameListById(id);
      if (item) {
        const toggle = toggleIndex === index;
        return (
          <GameListDropdownToggle
            index={index}
            title={item.name}
            toggle={toggle}
            onToggle={this._onToggle}
            key={`GameListDropdownToggle-${id}`}
          />
        );
      }
      return null;
    });

    const menuComponents = GameIdList.map((id: string, index: number) => {
      const item = model.getGameListById(id);
      if (item) {
        const toggle = toggleIndex === index;
        return (
          <GameListDropdownMenu
            index={id}
            toggle={toggle}
            prefix={item.constant}
            contents={gameIcons[item.constant]}
            key={`GameListDropdownMenu-${id}`}
          />
        );
      }
      return null;
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
