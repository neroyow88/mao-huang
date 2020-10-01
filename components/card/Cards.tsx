import React from "react";

import { FlipCard } from "./FlipCard";
import { RoundCard } from "./RoundCard";
import { dataSource } from "../../scripts/dataSource/DataSource";

interface Props {}

interface State {}

class Cards extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { isMobile } = dataSource.systemModel;

    if (isMobile) {
      return (
        <div id="cards-container-mobile">
          <div id="card-item-container" className="row-container center">
            <RoundCard index={1} label="爱情猫" />
            <RoundCard index={2} label="招财猫" />
            <RoundCard index={3} label="波斯猫" />
          </div>
        </div>
      );
    } else {
      return (
        <div id="cards-container-browser">
          <div id="background-container">
            <img src="background.png"></img>
          </div>
          <div id="card-item-container" className="row-container center">
            <FlipCard index={1} />
            <FlipCard index={2} buttonLabel="招财勋章" />
            <FlipCard index={3} buttonLabel="波斯勋章" />
          </div>
        </div>
      );
    }
  }
}

export { Cards };
