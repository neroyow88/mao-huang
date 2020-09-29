import React from "react";

import { ImageHandler } from "../share/ImageHandler";

import { PopOutType } from "../../scripts/WebConstant";
import { dataSource } from "../../scripts/dataSource/DataSource";
import { popOutHandler } from "../../scripts/PopOutHandler";

interface Props {}

interface State {}

class CardList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this._roundCard = this._roundCard.bind(this);
    this._flipCard = this._flipCard.bind(this);
    this._cardButtonComponent = this._cardButtonComponent.bind(this);
  }

  public render(): JSX.Element {
    const { isMobile } = dataSource.systemModel;

    if (isMobile) {
      return (
        <div id="cards-container-mobile">
          <div id="card-item-container" className="row-container center">
            {this._roundCard(1, "爱情猫")}
            {this._roundCard(2, "招财猫")}
            {this._roundCard(3, "波斯猫")}
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
            {this._flipCard(1)}
            {this._flipCard(2)}
            {this._flipCard(3)}
          </div>
        </div>
      );
    }
  }

  private _roundCard(index: number, label: string): JSX.Element {
    const onClickCallback = (): void => {
      popOutHandler.showPopOut(PopOutType.CARD_MOBILE, { index });
    };

    return (
      <div id={`card-0${index}`} onClick={onClickCallback}>
        <ImageHandler
          src={`mobile/card/poker_0${index}_round.png`}
          scale={0.5}
        />
        <div className="label-container">{label}</div>
      </div>
    );
  }

  private _flipCard(index: number): JSX.Element {
    return (
      <div id={`card-0${index}`}>
        <div className="flip-card-browser" key={`flip-card-${index}`}>
          <div className="flip-card-inner" key={`flip-card-inner-${index}`}>
            <div className="flip-card-front" key={`flip-card-front-${index}`}>
              <ImageHandler src={`card/poker_0${index}_front.png`} />
            </div>
            <div className="flip-card-back" key={`flip-card-back-${index}`}>
              <ImageHandler src={`card/poker_0${index}_back.png`} />
              {this._cardButtonComponent(index)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _cardButtonComponent(index: number): JSX.Element {
    if (index > 1) {
      const label = index === 2 ? "招财勋章" : "波斯勋章";
      return (
        <div id="card-buttons-container" className="row-container center">
          <div className="card-button-container" key={`button-container-left`}>
            <div className="card-button-label" key={`button-label-left`}>
              {label}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export { CardList };