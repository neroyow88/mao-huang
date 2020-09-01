import React from "react";
import { PopOutType } from "../model/WebConstant";
import { ImageHandler } from "./ImageHandler";
import { utils } from "../model/Utils";

interface Props {
  showPopOut: (any: number, data?: GenericObjectType) => void;
}

interface State {}

class CardList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this._roundCard = this._roundCard.bind(this);
    this._flipCard = this._flipCard.bind(this);
  }

  public render(): JSX.Element {
    const { showPopOut } = this.props;
    if (utils.isMobile) {
      return (
        <div id="cards-container-mobile">
          <div id="card-item-container">
            {this._roundCard(1, "爱情猫", showPopOut)}
            {this._roundCard(2, "招财猫", showPopOut)}
            {this._roundCard(3, "波斯猫", showPopOut)}
          </div>
        </div>
      );
    } else {
      return (
        <div id="cards-container-browser">
          <div id="background-container">
            <img src="background.png"></img>
          </div>
          <div id="card-item-container">
            {this._flipCard(1)}
            {this._flipCard(2)}
            {this._flipCard(3)}
          </div>
        </div>
      );
    }
  }

  private _roundCard(
    index: number,
    label: string,
    showPopOut: (any: number, data?: GenericObjectType) => void
  ): JSX.Element {
    const convertIndex = `0${index}`;
    const onClickCallback = (): void => {
      showPopOut(PopOutType.CARD_MOBILE, { index });
    };

    return (
      <div id={`card-${convertIndex}`} onClick={onClickCallback}>
        <ImageHandler
          src={`mobile/card/poker_${convertIndex}_round.png`}
          scale={0.5}
        />
        <div className="label-container">{label}</div>
      </div>
    );
  }

  private _flipCard(index: number): JSX.Element {
    const convertIndex = index < 10 ? `0${index}` : index;
    return (
      <div id={`card-${convertIndex}`}>
        <div className="flip-card-browser" key={`flip-card-${convertIndex}`}>
          <div
            className="flip-card-inner"
            key={`flip-card-inner-${convertIndex}`}
          >
            <div
              className="flip-card-front"
              key={`flip-card-front-${convertIndex}`}
            >
              <ImageHandler src={`card/poker_${convertIndex}_front.png`} />
            </div>
            <div
              className="flip-card-back"
              key={`flip-card-back-${convertIndex}`}
            >
              <ImageHandler src={`card/poker_${convertIndex}_back.png`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { CardList };
