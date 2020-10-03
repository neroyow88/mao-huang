import React from "react";

import { GameListItemMobile } from "./GameListItemMobile";
import { gameListModel } from "../../scripts/constant/GameListConstant";

interface Props {}

class GameListMobile extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const components = gameListModel.map(
      (item: IGameListItem, index: number) => {
        return <GameListItemMobile index={index} content={item} />;
      }
    );

    return (
      <div id="game-list-bar-container-mobile">
        <div id="game-list-bar-title-container">
          <div id="game-list-bar-title">娱乐游戏平台</div>
        </div>
        {components}
      </div>
    );
  }
}

export { GameListMobile };
