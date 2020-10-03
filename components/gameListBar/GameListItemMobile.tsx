import React from "react";

import { ImageContainer } from "../share/ImageContainer";

interface Props {
  index: number;
  content: IGameListItem;
}

interface State {}

class GameListItemMobile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { index, content } = this.props;
    return (
      <div
        className="game-list-item-container row-container center"
        key={`game-list-item-container-${index}`}
      >
        <ImageContainer
          src={`mobile/game_list/${content.prefix}_logo.png`}
          scale={0.33}
        />
        <div
          className="labels-container column-container"
          key={`label-container-${index}`}
        >
          <div className="title" key={`title-${index}`}>
            {content.title}
          </div>
          <div className="description" key={`description-${index}`}>
            {content.description}
          </div>
        </div>
        <div
          className="button"
          key={`button-${index}`}
          onClick={(): void => {
            this._onButtonClicked(index);
          }}
        >
          <div className="button-label">进入</div>
        </div>
      </div>
    );
  }

  private _onButtonClicked(index: number): void {
    console.log(index);
  }
}

export { GameListItemMobile };
