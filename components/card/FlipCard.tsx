import React from "react";
import { dataSource } from "../../scripts/dataSource/DataSource";
import { popOutHandler } from "../../scripts/PopOutHandler";
import { PopOutType } from "../../scripts/WebConstant";

import { ImageContainer } from "../share/ImageContainer";

interface Props {
  index: number;
  buttonLabel?: string;
}

class FlipCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._renderButton = this._renderButton.bind(this);
    this._onClickCallback = this._onClickCallback.bind(this);
  }

  public render(): JSX.Element {
    const { index } = this.props;
    return (
      <div id={`card-0${index}`}>
        <div className="flip-card-browser" key={`flip-card-${index}`}>
          <div className="flip-card-inner" key={`flip-card-inner-${index}`}>
            <div className="flip-card-front" key={`flip-card-front-${index}`}>
              <ImageContainer src={`card/poker_0${index}_front.png`} />
            </div>
            <div className="flip-card-back" key={`flip-card-back-${index}`}>
              <ImageContainer src={`card/poker_0${index}_back.png`} />
              {this._renderButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _renderButton(): JSX.Element {
    const { buttonLabel } = this.props;
    if (buttonLabel) {
      return (
        <div
          id="card-buttons-container"
          className="row-container center"
          onClick={this._onClickCallback}
        >
          <div className="card-button-container" key={`button-container-left`}>
            <div className="card-button-label" key={`button-label-left`}>
              {buttonLabel}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  private _onClickCallback(): void {
    const { playerModel } = dataSource;
    if (playerModel) {
      const { index, buttonLabel } = this.props;
      popOutHandler.showPopOut(PopOutType.CARD, { index, title: buttonLabel });
    } else {
      popOutHandler.showPopOut(PopOutType.LOGIN);
    }
  }
}

export { FlipCard };
