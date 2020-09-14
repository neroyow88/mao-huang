import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";
import { DepositType, PopOutType } from "../../model/WebConstant";

import customStyle from "../../styles/module/AccountModal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  showPopOut: (any: number, data?: GenericObjectType) => void;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customPopOutData: GenericObjectType;
}

interface State {
  selectedIndex: number;
  tutorialToggle: boolean;
  selectedTransaction: number;
}

class DepositInstructionPopOut extends React.Component<Props, State> {
  private _transactionRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      tutorialToggle: false,
      selectedTransaction: 0,
    };

    this._transactionRef = React.createRef();

    this._renderContent = this._renderContent.bind(this);
    this._instructionBox = this._instructionBox.bind(this);
    this._descriptionBox = this._descriptionBox.bind(this);
    this._renderButtons = this._renderButtons.bind(this);

    this._onBack = this._onBack.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
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
          {this._renderContent()}
        </div>
      </Modal>
    );
  }

  private _renderContent(): JSX.Element {
    const { selectedIndex, balance } = this.props.customPopOutData;
    switch (selectedIndex) {
      case DepositType.ALIPAY:
        return (
          <div
            id="deposit-instruction-container"
            className="column-container center"
          >
            <div
              id="deposit-instruction-content"
              className="column-container"
            ></div>
          </div>
        );
      case DepositType.BANK:
        return (
          <div
            id="deposit-instruction-container"
            className="column-container center"
          >
            <div id="deposit-instruction-content" className="column-container">
              {this._instructionBox("开户银行", "平安银行")}
              {this._instructionBox("户名", "猫皇皇", true)}
              {this._instructionBox("卡(账)号", "6666555566663333999", true)}
              {this._instructionBox("充值金额", `${balance} 元`, true)}
            </div>
            <div id="deposit-description-content" className="column-container">
              <div className="description-label">
                猫皇财务部已经收到您发出的
                <span>{`${balance}`}元</span>
                充值通知，请在
                <span>10分钟</span>
                内完成转账。
              </div>
              {this._descriptionBox(
                "转账成功后，您的金额即时到账，并收到到账提示。"
              )}
              {this._descriptionBox(
                "转账金额必须与充值金额一致，否则无法成功到账。"
              )}
            </div>
            {this._renderButtons()}
          </div>
        );
      case DepositType.WECHAT:
        return (
          <div
            id="deposit-instruction-container"
            className="column-container center"
          >
            <div id="deposit-instruction-content" className="column-container">
              {this._instructionBox("开户银行", "平安银行")}
              {this._instructionBox("户名", "猫皇皇", true)}
              {this._instructionBox("卡(账)号", "6666555566663333999", true)}
              {this._instructionBox("充值金额", `${balance} 元`, true)}
              {this._instructionBox("附言或备注", "B44B", true, true)}
            </div>
            <div id="deposit-description-content" className="column-container">
              <div className="description-label">
                猫皇财务部已经收到您发出的
                <span>{`${balance}`}元</span>
                充值通知，请在
                <span>10分钟</span>
                内完成转账。
              </div>
              {this._descriptionBox(
                "转账成功后，您的金额即时到账，并收到到账提示。"
              )}
              {this._descriptionBox(
                "附言或备注的编码由系统随机生成，用作快速核对充值，"
              )}
              {this._descriptionBox(
                "附言或备注如忘记填写，会延迟到账时间。",
                true
              )}
              {this._descriptionBox(
                "转账金额必须与充值金额一致，否则无法成功到账。",
                true
              )}
            </div>
            {this._renderButtons()}
          </div>
        );
      default:
        return null;
    }
  }

  private _instructionBox(
    key: string,
    value: string,
    canCopy?: boolean,
    isStar?: boolean
  ): JSX.Element {
    const copy = canCopy ? <div className="copy-container">复制</div> : null;
    const star = isStar ? <div className="star-container">*</div> : null;

    return (
      <div className="instruction-label-container row-container">
        {star}
        <div className="instruction-label-stretch">{`${key}`}</div>
        <div className="instruction-label">{`: ${value}`}</div>
        {copy}
      </div>
    );
  }

  private _descriptionBox(label: string, isStar?: boolean): JSX.Element {
    if (isStar) {
      return (
        <div className="description-label">
          <div className="star-container">*</div>
          {label}
        </div>
      );
    } else {
      return <div className="description-label">{label}</div>;
    }
  }

  private _renderButtons(): JSX.Element {
    return (
      <div id="deposit-buttons-container" className="row-container center">
        <div className="deposit-button center" onClick={this._onBack}>
          <div className="deposit-button-label">返回上页</div>
        </div>
        <div className="deposit-button center" onClick={this._onConfirm}>
          <div className="deposit-button-label">完成转帐</div>
        </div>
      </div>
    );
  }

  private _onBack(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.DEPOSIT_WALLET);
  }

  private _onConfirm(): void {
    const { hidePopOut } = this.props;
    hidePopOut && hidePopOut();
    console.log(this._transactionRef);
  }
}

export { DepositInstructionPopOut };
