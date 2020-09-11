import React from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";

import customStyle from "../../styles/module/CardMobileModal.module.scss";

interface Props {
  toggle: boolean;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customPopOutData: GenericObjectType;
}

interface State {
  mobileCardRotation: number;
}

class MobileCardPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      mobileCardRotation: 0,
    };

    this._cardButtonComponent = this._cardButtonComponent.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const interval = setInterval((): void => {
        this.setState({ mobileCardRotation: 180 });
        clearInterval(interval);
      }, 700);

      const secondInterval = setInterval((): void => {
        transitionComplete();
        clearInterval(secondInterval);
      }, 1500);
    } else {
      transitionComplete();
      this.setState({ mobileCardRotation: 0 });
    }
  }

  public render(): JSX.Element {
    const { toggle, hidePopOut, customPopOutData } = this.props;
    const { mobileCardRotation } = this.state;
    const { index } = customPopOutData;

    return (
      <Modal
        isOpen={toggle}
        toggle={hidePopOut}
        centered
        cssModule={customStyle}
      >
        <div id={`card-0${index}`}>
          <div className="flip-card-mobile" key={`flip-card-${index}`}>
            <div
              className="flip-card-inner"
              key={`flip-card-inner-${index}`}
              style={{ transform: `rotateY(${mobileCardRotation}deg)` }}
            >
              <div className="flip-card-front" key={`flip-card-front-${index}`}>
                <ImageHandler src={`mobile/card/poker_0${index}_front.png`} />
              </div>
              <div className="flip-card-back" key={`flip-card-back-${index}`}>
                <ImageHandler src={`mobile/card/poker_0${index}_back.png`} />
                {this._cardButtonComponent(index)}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  private _cardButtonComponent(index: number): JSX.Element {
    if (index > 1) {
      const label = index === 2 ? "招财勋章" : "波斯勋章";
      return (
        <div id="card-buttons-container">
          <div className="card-button-container" key={`button-container-left`}>
            <div className="card-button-label" key={`button-label-left`}>
              {label}
            </div>
          </div>
          <div className="card-button-container" key={`button-container-right`}>
            <div className="card-button-label" key={`button-label-right`}>
              游戏充值
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export { MobileCardPopOut };
