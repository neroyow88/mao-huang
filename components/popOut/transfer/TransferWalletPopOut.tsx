import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../share/PopOutTitle";
import { FormInputBox } from "../../share/FormInputBox";
import { FormButton } from "../../share/FormButton";
import { ImageContainer } from "../../share/ImageContainer";
import { GameWallet } from "./GameWallet";
import { CustomDropdownOption } from "./CustomDropdownOption";

import { ApiPath, PlatformId, GameIdList } from "../../../scripts/WebConstant";

import customStyle from "../../../styles/module/Modal.module.scss";
import { callApi } from "../../../scripts/ApiClient";
import { convertToTwoDecimal } from "../../../scripts/Utils";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

interface State {
  isLoading: boolean;
  walletList: { [keys: string]: IWalletList };
  toWalletIndex: number;
  toToggle: boolean;
  fromWalletIndex: number;
  fromToggle: boolean;
}

class TransferWalletPopOut extends React.Component<Props, State> {
  private _amountRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      walletList: Object.create(null),
      toWalletIndex: -1,
      toToggle: false,
      fromWalletIndex: -1,
      fromToggle: false,
    };

    this._amountRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._onAutoTransferClicked = this._onAutoTransferClicked.bind(this);
    this._onReclaimClicked = this._onReclaimClicked.bind(this);

    this._toWalletSelected = this._toWalletSelected.bind(this);
    this._toOptionToggle = this._toOptionToggle.bind(this);
    this._fromWalletSelected = this._fromWalletSelected.bind(this);
    this._fromOptionToggle = this._fromOptionToggle.bind(this);
    this._getBalance = this._getBalance.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      this._getBalance(transitionComplete);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide } = this.props;
    const {
      toWalletIndex,
      toToggle,
      fromWalletIndex,
      fromToggle,
      walletList,
    } = this.state;

    const gameWallets = [];
    GameIdList.forEach((id: PlatformId, index: number): void => {
      const wallet = walletList[id];
      if (id !== PlatformId.MAOHUANG && wallet) {
        gameWallets.push(
          <GameWallet
            src={`wallet/${wallet.constant}_logo.png`}
            label={wallet.title}
            balance={wallet.balance}
            index={index}
          />
        );
      }
    });

    const fromWallet = walletList[GameIdList[fromWalletIndex]];
    const fromBalance = fromWallet
      ? convertToTwoDecimal(fromWallet.balance)
      : "  -";

    const toWallet = walletList[GameIdList[toWalletIndex]];
    const toBalance = toWallet ? convertToTwoDecimal(toWallet.balance) : "  -";

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
              <div
                id="auto-transfer-button"
                onClick={this._onAutoTransferClicked}
              >
                <span>自动户内转帐</span>
              </div>
              <div id="reclaim-balance-button" onClick={this._onReclaimClicked}>
                <span>一键回收</span>
              </div>
            </div>
            <div id="transfer-label-container" className="row-container">
              <div className="transfer-balance-label">{`余額：${fromBalance}`}</div>
              <div className="transfer-label">从</div>
              <div className="transfer-balance-label">{`余額：${toBalance}`}</div>
              <div className="transfer-label">转至</div>
              <div className="transfer-label">金额</div>
            </div>
            <form
              autoComplete="off"
              className="row-container"
              onSubmit={this._onFormSubmitted}
            >
              <CustomDropdownOption
                walletList={walletList}
                toggle={fromToggle}
                selectedIndex={fromWalletIndex}
                onToggle={this._fromOptionToggle}
                onSelected={this._fromWalletSelected}
              />
              <div id="transfer-logo-container">
                <ImageContainer src="wallet/transfer_logo.png" scale={0.25} />
              </div>
              <CustomDropdownOption
                walletList={walletList}
                toggle={toToggle}
                selectedIndex={toWalletIndex}
                onToggle={this._toOptionToggle}
                onSelected={this._toWalletSelected}
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

    const { fromWalletIndex, toWalletIndex } = this.state;
    const from = GameIdList[fromWalletIndex];
    const to = GameIdList[toWalletIndex];
    const amount = this._amountRef.current.value;

    const onResultReturn = (result: GenericObjectType, error: string): void => {
      if (result && !error) {
        this._amountRef.current.value = "";
        this.setState({ fromWalletIndex: -1, toWalletIndex: -1 });
        this._getBalance();
      }
    };

    const params = new FormData();
    params.append("out", from);
    params.append("in", to);
    params.append("amount", amount);

    const config = {
      path: ApiPath.TRANSFER_BALANCE,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }

  private _onAutoTransferClicked(): void {}

  private _onReclaimClicked(): void {
    const { isLoading } = this.state;

    if (!isLoading) {
      const onResultReturn = (result, error): void => {
        if (result && !error) {
          const { getBalance } = this.props.customData;
          const cb = (walletList: { [keys: string]: IWalletList }): void => {
            this.setState({ isLoading: false, walletList: walletList });
          };
          getBalance(cb);
        }
      };

      const config = {
        path: ApiPath.RESTORE_BALANCE,
        callback: onResultReturn,
      };
      callApi(config);
      this.setState({ isLoading: true });
    }
  }

  private _fromWalletSelected(index: number): void {
    this.setState({ fromWalletIndex: index, fromToggle: false });
  }

  private _fromOptionToggle(): void {
    this.setState({ fromToggle: !this.state.fromToggle, toToggle: false });
  }

  private _toWalletSelected(index: number): void {
    this.setState({ toWalletIndex: index, toToggle: false });
  }

  private _toOptionToggle(): void {
    this.setState({ toToggle: !this.state.toToggle, fromToggle: false });
  }

  private _getBalance(callback?: NoParamReturnNulFunction): void {
    const { getBalance } = this.props.customData;
    const cb = (walletList: { [keys: string]: IWalletList }): void => {
      this.setState({ isLoading: false, walletList: walletList });
      callback && callback();
    };
    getBalance(cb);
  }
}

export { TransferWalletPopOut };
