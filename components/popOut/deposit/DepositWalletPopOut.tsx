import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../share/PopOutTitle";
import { FormInputBox } from "../../share/FormInputBox";
import { FormButton } from "../../share/FormButton";
import { TutorialPopOut } from "./TutorialPopOut";

import { transactionModel } from "../../../scripts/TopUpConstant";
import { DepositType, PopOutType } from "../../../scripts/WebConstant";
import { popOutHandler } from "../../../scripts/PopOutHandler";

import customStyle from "../../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

interface State {
  tutorialToggle: boolean;
  selectedIndex: number;
  selectedTransaction: number;
}

class DepositWalletPopOut extends React.Component<Props, State> {
  private _balanceRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    const { selectedIndex, selectedTransaction } = props.customData;
    this.state = {
      tutorialToggle: false,
      selectedIndex: selectedIndex,
      selectedTransaction: selectedTransaction,
    };

    this._balanceRef = React.createRef();

    this._renderTopUpOptionMenu = this._renderTopUpOptionMenu.bind(this);
    this._renderTopUpContent = this._renderTopUpContent.bind(this);
    this._renderRadioButton = this._renderRadioButton.bind(this);
    this._renderButton = this._renderButton.bind(this);

    this._toggleTutorial = this._toggleTutorial.bind(this);
    this._changeIndex = this._changeIndex.bind(this);
    this._updateTransaction = this._updateTransaction.bind(this);
    this._onFormSubmitted = this._onFormSubmitted.bind(this);
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
    const { toggle, scale, onHide } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="游戏充值" onHide={onHide} />
          <div
            id="deposit-option-menu-container"
            className="row-container center"
          >
            {this._renderTopUpOptionMenu(
              DepositType.ALIPAY,
              "wallet/pay_icon.png"
            )}
            {this._renderTopUpOptionMenu(
              DepositType.BANK,
              "wallet/bank_icon.png"
            )}
            {this._renderTopUpOptionMenu(
              DepositType.WECHAT,
              "wallet/pay_wechat_icon.png"
            )}
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
        className="deposit-option row-container center"
        onClick={(): void => {
          this._changeIndex(index);
        }}
        style={{ opacity: opacity }}
      >
        <div className="image-container">
          <img src={src}></img>
        </div>
        <div className="round">{`${model.options.length}`}</div>
      </div>
    );
  }

  private _renderTopUpContent(): JSX.Element {
    const { selectedIndex } = this.state;
    return (
      <div id="deposit-container">
        <form
          autoComplete="off"
          className="column-container center"
          onSubmit={this._onFormSubmitted}
        >
          {this._renderRadioButton()}
          <div className="description-label">
            {transactionModel[selectedIndex].description}
          </div>
          <FormInputBox
            id="topupbalance"
            placeholder="请在此输入充值金额"
            inputRef={this._balanceRef}
          />
          <div className="description-label">
            单笔充值 : 最低100元，最高9999元
          </div>
          {this._renderButton()}
        </form>
      </div>
    );
  }

  private _renderButton(): JSX.Element {
    const { scale } = this.props;
    const { selectedIndex, tutorialToggle } = this.state;
    if (selectedIndex === DepositType.WECHAT) {
      return (
        <div id="deposit-buttons-container" className="row-container center">
          <FormButton
            label="参照截图"
            backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
            image="wallet/search.png"
            onClick={this._toggleTutorial}
          />
          <FormButton
            label="下一步"
            backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
            submit
          />
          <TutorialPopOut
            toggle={tutorialToggle}
            scale={scale}
            onHide={this._toggleTutorial}
          />
        </div>
      );
    } else {
      return (
        <FormButton
          label="下一步"
          backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
          submit
        />
      );
    }
  }

  private _renderRadioButton(): JSX.Element {
    const { selectedIndex, selectedTransaction } = this.state;
    const model = transactionModel[selectedIndex];
    const components = [];
    model.options.forEach((option: string, index: number): void => {
      components.push(
        <input
          type="radio"
          id={`${selectedIndex}${index}`}
          name="transaction"
          value={`${selectedIndex}${index}`}
          onClick={(): void => {
            this._updateTransaction(index);
          }}
          checked={selectedTransaction === index}
        />
      );
      components.push(<div className="label">{option}</div>);
    });

    return (
      <div id="radio-button-container" className="row-container center">
        <div className="label">请选择 :</div>
        {components}
      </div>
    );
  }

  private _toggleTutorial(): void {
    const { tutorialToggle } = this.state;
    this.setState({ tutorialToggle: !tutorialToggle });
  }

  private _changeIndex(index: number): void {
    this.setState({ selectedIndex: index, selectedTransaction: 0 });
  }

  private _updateTransaction(index: number): void {
    this.setState({ selectedTransaction: index });
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const balance = this._balanceRef.current.value;

    const { selectedIndex, selectedTransaction } = this.state;
    popOutHandler.showPopOut(PopOutType.DEPOSIT_INSTRUCTION, {
      selectedIndex,
      selectedTransaction,
      balance,
    });
  }
}

export { DepositWalletPopOut };