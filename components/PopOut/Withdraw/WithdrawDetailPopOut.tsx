import React, { RefObject } from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../PopOutTitle";
import { BankAccount } from "./BankAccount";
import { FormInputBox } from "../FormInputBox";
import { FormButton } from "../FormButton";
import { NoticePopOut } from "../NoticePopOut";

import { dataSource } from "../../../model/DataSource";
import { apiClient } from "../../../model/ApiClient";
import {
  PopOutType,
  ApiPath,
  NoticePopOutConfig,
} from "../../../model/WebConstant";

import customStyle from "../../../styles/module/AccountModal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  showPopOut: (any: number, data?: GenericObjectType) => void;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customPopOutData: GenericObjectType;
}

interface State {
  subToggle: boolean;
}

class WithdrawDetailPopOut extends React.Component<Props, State> {
  private _detail: IWithdrawDetails;
  private _amountRef: RefObject<HTMLInputElement>;
  private _pinNumberRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    const { index } = props.customPopOutData;
    const { withdrawDetails } = dataSource.playerModel;
    this._detail = withdrawDetails[index];
    this.state = {
      subToggle: false,
    };

    this._amountRef = React.createRef();
    this._pinNumberRef = React.createRef();

    this._onFormSubmitted = this._onFormSubmitted.bind(this);
    this._showPopOut = this._showPopOut.bind(this);
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
    const { toggle, scale, customPopOutData } = this.props;
    const { index } = customPopOutData;
    const { subToggle } = this.state;
    const detail = this._detail;

    return (
      <Modal
        isOpen={toggle}
        toggle={this._showPopOut}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="快速提款" hidePopOut={this._showPopOut} />
          <div
            id="withdraw-detail-container"
            className="pop-out-form-container column-container center"
          >
            <BankAccount index={index} detail={detail} locked />
            <div id="withdraw-time-label">
              提款时间 : 早上8:00 至次日凌晨2:00。
            </div>
            <div id="withdraw-limit-label">
              单笔提款 : 下限为30元,上限为20万元。
            </div>
            <form autoComplete="off" onSubmit={this._onFormSubmitted}>
              <FormInputBox
                id="phonenumber"
                placeholder="请在此输入提款金额"
                inputRef={this._amountRef}
                number
              />
              <FormInputBox
                id="pinnumber"
                type="password"
                placeholder="请输入猫皇提款密码"
                leftImage={"pop_out/password_logo.png"}
                rightImage={"pop_out/password_eye.png"}
                inputRef={this._pinNumberRef}
                number
              />
              <div id="withdraw-buttons-container" className="row-container">
                <FormButton
                  label="返回上页"
                  backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                  onClick={this._showPopOut}
                />
                <FormButton
                  label="确认提款"
                  backgroundGradient="linear-gradient(180deg, #FF6363 0%, #D20000 100%)"
                  submit
                />
              </div>
            </form>
          </div>
        </div>
        <NoticePopOut
          toggle={subToggle}
          scale={scale}
          hidePopOut={this._hidePopOut}
          customPopOutData={NoticePopOutConfig.PIN_INCORRECT}
        />
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
        this.setState({
          subToggle: true,
        });
      } else {
        const { showPopOut } = this.props;
        const { invoice } = result;
        showPopOut && showPopOut(PopOutType.WITHDRAW_SUCCESS, { invoice });
      }
    };

    const params = {
      amount,
      pinNumber,
      detail,
    };
    apiClient.callApi(ApiPath.WITHDRAW, params, onResultReturn);
  }

  private _showPopOut(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.WITHDRAW_SELECTION);
  }

  private _hidePopOut(): void {
    this.setState({ subToggle: false });
  }
}

export { WithdrawDetailPopOut };
