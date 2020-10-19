import React from "react";

import { GameListMobile } from "./GameListMobile";
import { GameListBrowser } from "./GameListBrowser";
import { PlatformsModel } from "../../scripts/dataSource/PlatformsModel";

interface Props {
  isMobile: boolean;
  model: PlatformsModel;
}

class GameListBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { isMobile, model } = this.props;
    if (isMobile) {
      return <GameListMobile />;
    } else {
      return <GameListBrowser model={model} />;
    }
  }
}

export { GameListBar };
