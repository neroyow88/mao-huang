import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../Utility/PopOutTitle";
import { FormInputBox } from "../../Utility/FormInputBox";
import { FormButton } from "../../Utility/FormButton";
import { ImageHandler } from "../../ImageHandler";
import { GameWallet } from "./GameWallet";
import { CustomDropdownOption } from "./CustomDropdownOption";

import { DropdownOptions } from "../../../model/DropdownOptionsConstant";
import { apiClient } from "../../../model/ApiClient";
import { PopOutType, ApiPath } from "../../../model/WebConstant";
import { popOutHandler } from "../../../model/PopOutHandler";
import { dataSource } from "../../../model/DataSource";

import customStyle from "../../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

interface State {
  toWalletIndex: number;
  fromWalletIndex: number;
}

class TransferWalletPopOut extends React.Component<Props, State> {
  private _detail: IWithdrawDetails;
  private _amountRef: RefObject<HTMLInputElement>;
  private _pinNumberRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      toWalletIndex: -1,
      fromWalletIndex: -1,
    };

    this._amountRef = React.createRef();
    this._pinNumberRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._toWalletSelected = this._toWalletSelected.bind(this);
    this._fromWalletSelected = this._fromWalletSelected.bind(this);
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
    const { toWalletIndex, fromWalletIndex } = this.state;

    const { wallets } = dataSource.playerModel;
    const walletKey = Object.keys(wallets);
    const gameWallets = walletKey.map(
      (key: string, index: number): JSX.Element => {
        if (index === 0) {
          return null;
        } else {
          const option = DropdownOptions[key];
          const balance = wallets[key];
          return (
            <GameWallet
              src={option.src}
              label={option.label}
              balance={balance}
              index={index}
            />
          );
        }
      }
    );

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="户内转帐" onHide={onHide} />
          <div
            id="transfer-wallet-container"
            className="column-container center"
          >
            <div id="transfer-option-container" className="row-container">
              <div className="transfer-option-label">
                因每个游戏平台均有独立的钱包，请游戏前将资金转至该游戏平台，或使用【自动户内转账】功能。
              </div>
              <div id="auto-transfer-button">
                <span>自动户内转帐</span>
              </div>
              <div id="reclaim-balance-button">
                <span>一键回收</span>
              </div>
            </div>
            <div id="transfer-label-container" className="row-container">
              <div className="transfer-label">从</div>
              <div className="transfer-label">转至</div>
              <div className="transfer-label">金额</div>
            </div>
            <form
              autoComplete="off"
              className="row-container"
              onSubmit={this._onFormSubmitted}
            >
              <CustomDropdownOption
                options={DropdownOptions}
                selectedIndex={toWalletIndex}
                onSelected={this._toWalletSelected}
              />
              <div id="transfer-logo-container">
                <ImageHandler src="wallet/transfer_logo.png" scale={0.25} />
              </div>
              <CustomDropdownOption
                options={DropdownOptions}
                selectedIndex={fromWalletIndex}
                onSelected={this._fromWalletSelected}
              />
              <FormInputBox
                id="amount"
                placeholder="请输入户内转帐金额"
                inputRef={this._amountRef}
              />
              <FormButton
                label="确定"
                backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                color="white"
                submit
              />
            </form>
            <div id="game-wallets-container">{gameWallets}</div>
          </div>
        </div>
      </Modal>
    );
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const amount = this._amountRef.current.value;
    const pinNumber = this._pinNumberRef.current.value;
    const detail = this._detail;

    const onResultReturn = (result: GenericObjectType, err: string): void => {
      if (err && !result) {
      } else {
        const { invoice } = result;
        popOutHandler.showPopOut(PopOutType.WITHDRAW_SUCCESS, { invoice });
      }
    };

    const params = {
      amount,
      pinNumber,
      detail,
    };
    apiClient.callApi(ApiPath.WITHDRAW, params, onResultReturn);
  }

  private _toWalletSelected(index: number): void {
    this.setState({ toWalletIndex: index });
  }

  private _fromWalletSelected(index: number): void {
    this.setState({ fromWalletIndex: index });
  }
}

export { TransferWalletPopOut };
