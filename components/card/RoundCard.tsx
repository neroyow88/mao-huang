import React from "react";

import { popOutHandler } from "../../scripts/PopOutHandler";
import { PopOutType } from "../../scripts/WebConstant";
import { ImageContainer } from "../share/ImageContainer";

interface Props {
  index: number;
  label: string;
}

class RoundCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  public render(): JSX.Element {
    const { index, label } = this.props;
    return (
      <div id={`card-0${index}`} onClick={this._onClick}>
        <ImageContainer
          src={`mobile/card/poker_0${index}_round.png`}
          scale={0.5}
        />
        <div className="label-container">{label}</div>
      </div>
    );
  }

  private _onClick(): void {
    const { index } = this.props;
    popOutHandler.showPopOut(PopOutType.CARD_MOBILE, { index });
  }
}

export { RoundCard };
