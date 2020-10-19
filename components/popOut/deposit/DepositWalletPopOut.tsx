import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../share/PopOutTitle";
import { FormInputBox } from "../../share/FormInputBox";
import { FormButton } from "../../share/FormButton";
import { TutorialPopOut } from "./TutorialPopOut";
import { DepositOptionMenu } from "./DepositOptionMenu";

import {
  ApiPath,
  DepositAccountIcon,
  DepositType,
  PopOutType,
} from "../../../scripts/WebConstant";
import { popOutHandler } from "../../../scripts/PopOutHandler";
import { callApi } from "../../../scripts/ApiClient";

import customStyle from "../../../styles/module/Modal.module.scss";
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
  tutorialToggle: boolean;
  selectedIndex: string;
  selectedTransaction: number;
  model: { [keys: string]: IDepositAccount[] };
}

class DepositWalletPopOut extends React.Component<Props, State> {
  private _amountRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    const { selectedIndex, selectedTransaction } = props.customData;
    this.state = {
      isLoading: true,
      tutorialToggle: false,
      selectedIndex: selectedIndex,
      selectedTransaction: selectedTransaction,
      model: Object.create(null),
    };

    this._amountRef = React.createRef();

    this._renderTopUpOptionMenu = this._renderTopUpOptionMenu.bind(this);
    this._renderTopUpContent = this._renderTopUpContent.bind(this);
    this._renderRadioButton = this._renderRadioButton.bind(this);
    this._renderButton = this._renderButton.bind(this);

    this._toggleTutorial = this._toggleTutorial.bind(this);
    this._changeIndex = this._changeIndex.bind(this);
    this._updateTransaction = this._updateTransaction.bind(this);
    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._getDescription = this._getDescription.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const onResultReturn = (result, err): void => {
        if (result && !err) {
          const model = Object.create(null);
          const keys = Object.keys(result.data);
          keys.forEach((key: string): void => {
            if (key !== "fake_bank") {
              const data = result.data[key];
              model[key] = [];

              if (data.length > 0) {
                data.forEach((acc): void => {
                  model[key].push({
                    id: acc.id,
                    type: acc.type,
                    title: acc.title,
                    depositType: acc.deposit_type,
                    minDeposit: parseInt(acc.min_deposit),
                    maxDeposit: parseInt(acc.max_deposit),
                  });

                  const fakeBank = result.data["fake_bank"];
                  fakeBank.forEach((bank): void => {
                    model[key].push({
                      id: acc.id,
                      type: acc.type,
                      title: bank,
                      depositType: acc.deposit_type,
                      minDeposit: parseInt(acc.min_deposit),
                      maxDeposit: parseInt(acc.max_deposit),
                    });
                  });
                });
              }
            }
          });

          this.setState({ model: model, isLoading: false });
          transitionComplete();
        }
      };

      const config = {
        path: ApiPath.GET_DEPOSIT_ACOUNTS,
        callback: onResultReturn,
      };

      callApi(config);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide } = this.props;
    const { isLoading } = this.state;

    const componenets = isLoading
      ? null
      : [
          <div
            id="deposit-option-menu-container"
            className="row-container center"
          >
            {this._renderTopUpOptionMenu()}
          </div>,
          this._renderTopUpContent(),
        ];

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
          {componenets}
        </div>
      </Modal>
    );
  }

  private _renderTopUpOptionMenu(): JSX.Element[] {
    const { model, selectedIndex } = this.state;
    const keys = Object.keys(model);
    const components = keys.map((key: string, index: number) => {
      const data = model[key];
      if (data.length > 0) {
        return (
          <DepositOptionMenu
            index={key}
            src={DepositAccountIcon[key]}
            optionCount={data.length}
            selected={selectedIndex === key}
            onSelected={this._changeIndex}
            key={`deposit-option-menu-${index}`}
          />
        );
      } else {
        return null;
      }
    });

    return components;
  }

  private _renderTopUpContent(): JSX.Element {
    const { model, selectedIndex, selectedTransaction } = this.state;
    const data = model[selectedIndex][selectedTransaction];

    return (
      <div id="deposit-container">
        <form
          autoComplete="off"
          className="column-container center"
          onSubmit={this._onFormSubmitted}
        >
          {this._renderRadioButton()}
          <div className="description-label">{this._getDescription()}</div>
          <FormInputBox
            id="topupbalance"
            placeholder="请在此输入充值金额"
            inputRef={this._amountRef}
          />
          <div className="description-label">
            {`单笔充值 : 最低${data.minDeposit}元，最高${data.maxDeposit}元`}
          </div>
          {this._renderButton()}
        </form>
      </div>
    );
  }

  private _renderRadioButton(): JSX.Element {
    const { selectedIndex, selectedTransaction, model } = this.state;
    const datas = model[selectedIndex];
    const components = [];

    datas.forEach((data: IDepositAccount, index: number): void => {
      components.push(
        <div className="radio-container">
          <input
            type="radio"
            id={`${index}`}
            name="transaction"
            value={`${data.id}`}
            onClick={(): void => {
              this._updateTransaction(index);
            }}
            checked={selectedTransaction === index}
            key={`radio-button-${index}`}
          />

          <label htmlFor={`${index}`} key={`title-label-${index}`}>
            {data.title}
          </label>
        </div>
      );
    });

    return (
      <div id="radio-button-container" className="row-container center">
        <div id="option-label">请选择 :</div>
        <div id="grid-container">{components}</div>
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

  private _toggleTutorial(): void {
    const { tutorialToggle } = this.state;
    this.setState({ tutorialToggle: !tutorialToggle });
  }

  private _changeIndex(index: string): void {
    this.setState({ selectedIndex: index, selectedTransaction: 0 });
  }

  private _updateTransaction(index: number): void {
    this.setState({ selectedTransaction: index });
  }

  private _onFormSubmitted(e): void {
    e.preventDefault();
    const { model, selectedIndex, selectedTransaction } = this.state;
    const amount = this._amountRef.current.value;
    const data = model[selectedIndex][selectedTransaction];

    const onResultReturn = (result, error): void => {
      if (result && !error) {
        const { amount } = result.data;
        let customData = {
          selectedIndex,
          selectedTransaction,
          amount: convertToTwoDecimal(parseInt(amount)),
        };

        switch (selectedIndex) {
          case DepositType.ALIPAY:
            const { account_id, deposit_id } = result.data;
            customData = Object.assign({}, customData, {
              accountId: account_id,
              depositId: deposit_id,
              qrUrl: result.qr ? result.qr : undefined,
            });
            break;
          case DepositType.BANK:
            const {
              bank,
              bank_account_name,
              bank_account_number,
              remark,
            } = result.data;
            customData = Object.assign({}, customData, {
              bankName: bank,
              bankAccName: bank_account_name,
              bankAccNumber: bank_account_number,
              remark: remark,
            });
            break;
          default:
            break;
        }
        popOutHandler.showPopOut(PopOutType.DEPOSIT_INSTRUCTION, customData);
      }
    };

    const params = new FormData();
    params.append("account_id", data.id.toString());
    params.append("amount", amount);
    const config = {
      path: ApiPath.DEPOSIT_SUBMIT,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }

  private _getDescription(): string {
    const { selectedIndex } = this.state;
    switch (selectedIndex) {
      case DepositType.ALIPAY:
        return `提示:充值金额必须以"1-9"结尾`;
      case DepositType.WECHAT:
        return "充值金额不能以元为整数,必须含角和分,例如:100.13,100.99,100.22";
      default:
        return "";
    }
  }
}

export { DepositWalletPopOut };
