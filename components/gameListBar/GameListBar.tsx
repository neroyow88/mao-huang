import React from "react";

import { dataSource } from "../../scripts/dataSource/DataSource";
import { GameListMobile } from "./GameListMobile";
import { GameListBrowser } from "./GameListBrowser";

interface Props {}

class GameListBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { isMobile } = dataSource.systemModel;
    if (isMobile) {
      return <GameListMobile />;
    } else {
      return <GameListBrowser />;
    }
  }
}

export { GameListBar };
