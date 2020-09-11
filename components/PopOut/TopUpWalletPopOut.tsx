import React from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";
import { FormInputBox } from "./FormInputBox";
import { FormButton } from "./FormButton";
import { transactionModel } from "../../model/TopUpConstant";

import customStyle from "../../styles/module/AccountModal.module.scss";
import { TutorialPopOut } from "./TutorialPopOut";

interface Props {
  toggle: boolean;
  scale: number;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

interface State {
  selectedIndex: number;
  tutorialToggle: boolean;
}

class TopUpWalletPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      tutorialToggle: false,
    };

    this._renderTopUpOptionMenu = this._renderTopUpOptionMenu.bind(this);
    this._renderTopUpContent = this._renderTopUpContent.bind(this);
    this._renderRadioButton = this._renderRadioButton.bind(this);

    this._toggleTutorial = this._toggleTutorial.bind(this);
    this.toNextStep = this.toNextStep.bind(this);
    this._changeIndex = this._changeIndex.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const interval = setInterval((): void => {
        transitionComplete();
        clearInterval(interval);
      }, 500);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, hidePopOut } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Modal
        isOpen={toggle}
        toggle={hidePopOut}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <div id="pop-out-title-container">
            <ImageHandler src="pop_out/title_bg.png" scale={0.47} />
            <div id="pop-out-title">游戏充值</div>
            <ImageHandler
              src="pop_out/close_button.png"
              scale={0.44}
              onClick={hidePopOut}
            />
          </div>
          <div id="top-up-option-menu-container">
            {this._renderTopUpOptionMenu(0, "wallet/pay_icon.png")}
            {this._renderTopUpOptionMenu(1, "wallet/bank_icon.png")}
            {this._renderTopUpOptionMenu(2, "wallet/pay_wechat_icon.png")}
          </div>
          <div
            id="option-arrow"
            style={{
              marginLeft: `calc(50% + ${(selectedIndex - 1) * 230}px)`,
            }}
          ></div>
          {this._renderTopUpContent()}
        </div>
      </Modal>
    );
  }

  private _renderTopUpOptionMenu(index: number, src: string): JSX.Element {
    const { selectedIndex } = this.state;
    const model = transactionModel[index];
    const opacity = selectedIndex === index ? 1 : 0.7;
    return (
      <div
        className="top-up-option"
        onClick={(): void => {
          this._changeIndex(index);
        }}
        style={{ opacity: opacity }}
      >
        <div className="option-image">
          <ImageHandler src={src} scale={0.6} />
          <div className="round">{`${model.options.length}`}</div>
        </div>
      </div>
    );
  }

  private _renderTopUpContent(): JSX.Element {
    const { scale } = this.props;
    const { selectedIndex, tutorialToggle } = this.state;
    return (
      <div id="top-up-container">
        <form autoComplete="off">
          {this._renderRadioButton()}
          <div id="description-label">
            {transactionModel[selectedIndex].description}
          </div>
          <FormInputBox id="topupbalance" placeholder="请在此输入充值金额" />
          <div id="description-label">单笔充值 : 最低100元，最高9999元</div>
          <FormButton
            label="下一步"
            background="transparent linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
            // onClick={this._topUpNextStep}
            onClick={this._toggleTutorial}
          />
          <TutorialPopOut
            toggle={tutorialToggle}
            scale={scale}
            hidePopOut={this._toggleTutorial}
          />
        </form>
      </div>
    );
  }

  private _renderRadioButton(): JSX.Element {
    const { selectedIndex } = this.state;
    const model = transactionModel[selectedIndex];
    const components = [];
    model.options.forEach((option: string, index: number): void => {
      components.push(
        <input
          type="radio"
          id={`${selectedIndex}${index}`}
          name="transaction"
          value={`${selectedIndex}${index}`}
        />
      );
      components.push(<div className="label">{option}</div>);
    });

    return (
      <div id="radio-button-container">
        <div className="label">请选择 :</div>
        {components}
      </div>
    );
  }

  private _toggleTutorial(): void {
    const { tutorialToggle } = this.state;
    this.setState({ tutorialToggle: !tutorialToggle });
  }

  private toNextStep(): void {}

  private _changeIndex(index: number): void {
    this.setState({ selectedIndex: index });
  }
}

export { TopUpWalletPopOut };
