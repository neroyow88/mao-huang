import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "./PopOutTitle";
import { dataSource } from "../../model/DataSource";
import { ImageHandler } from "../ImageHandler";

import customStyle from "../../styles/module/AccountModal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  showPopOut: (any: number, data?: GenericObjectType) => void;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

interface State {
  hoverRemoveBtn: boolean;
}

class WithdrawWalletPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hoverRemoveBtn: false,
    };

    this._renderEmptyAccount = this._renderEmptyAccount.bind(this);
    this._renderBankAccount = this._renderBankAccount.bind(this);

    this._onBankSelected = this._onBankSelected.bind(this);
    this._onRemoveClicked = this._onRemoveClicked.bind(this);
    this._onMouseEnterRemove = this._onMouseEnterRemove.bind(this);
    this._onMouseExitRemove = this._onMouseExitRemove.bind(this);
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
    const { withdrawDetails } = dataSource.playerModel;
    const components = [];

    for (let i = 0; i < 3; i++) {
      const detail = withdrawDetails[i];
      if (detail) {
        components.push(this._renderBankAccount(detail, i));
      } else {
        components.push(this._renderEmptyAccount(i));
      }
    }

    const title =
      withdrawDetails.length > 0 ? (
        <div id="withdraw-label">请选择您的银行卡后再进行提款,谢谢。</div>
      ) : (
        <div id="withdraw-label">
          每位会员最多绑定<span>3</span>张银行卡,若未设置,请先设置提款银行卡。
        </div>
      );

    return (
      <Modal
        isOpen={toggle}
        toggle={hidePopOut}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="快速提款" hidePopOut={hidePopOut} />
          <div id="withdraw-container" className="column-container center">
            {title}
            <div id="withdraw-bank-container">{components}</div>
          </div>
        </div>
      </Modal>
    );
  }

  private _renderEmptyAccount(index: number): JSX.Element {
    return (
      <div
        className="withdraw-detail-container column-container center"
        key={`withdraw-detail-container-${index}`}
      >
        <div className="add-container" key={`add-container-${index}`}>
          +
        </div>
        <div className="withdraw-label" key={`withdraw-label${index}`}>
          增添提款银行卡
        </div>
      </div>
    );
  }

  private _renderBankAccount(
    detail: IWithdrawDetails,
    index: number
  ): JSX.Element {
    const { bankName, cardType, ownerName, cardNumber } = detail;
    const maskCardNumber = cardNumber.substr(12, 4);

    return (
      <div
        className="withdraw-detail-container row-container center"
        key={`withdraw-detail-container-${index}`}
        onClick={(): void => {
          this._onBankSelected(index);
        }}
      >
        <div className="bank-logo">
          <ImageHandler src="wallet/bank.png" scale={0.4} />
        </div>
        <div className="bank-detail-container column-container">
          <div className="bank-label">{bankName}</div>
          <div className="bank-label">{cardType}</div>
        </div>
        <div className="owner-detail-container column-container center">
          <div className="withdraw-label">{`卡戶名 : ${ownerName}`}</div>
          <div className="bank-number-label row-container">
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>{maskCardNumber}</span>
          </div>
        </div>
        <div
          className="remove-label"
          onClick={(): void => {
            this._onRemoveClicked(index);
          }}
          onMouseEnter={this._onMouseEnterRemove}
          onMouseLeave={this._onMouseExitRemove}
        >
          解除
        </div>
      </div>
    );
  }

  private _onBankSelected(index: number): void {
    if (!this.state.hoverRemoveBtn) {
      console.log("select ", index);
    }
  }

  private _onRemoveClicked(index: number): void {
    console.log("remove ", index);
  }

  private _onMouseEnterRemove(): void {
    if (!this.state.hoverRemoveBtn) {
      this.setState({ hoverRemoveBtn: true });
    }
  }

  private _onMouseExitRemove(): void {
    if (this.state.hoverRemoveBtn) {
      this.setState({ hoverRemoveBtn: false });
    }
  }
}

export { WithdrawWalletPopOut };
