import React from "react";

import { ForgotUsernamePopOut } from "./ForgotUsernamePopOut";
import { ForgotPasswordPopOut } from "./ForgotPasswordPopOut";
import { LoginPopOut } from "./LoginPopOut";
import { RegisterPopOut } from "./RegisterPopOut";
import { ProfilePopOut } from "./ProfilePopOut";
import { NoticeBoardPopOut } from "./NoticeBoardPopOut";
import { MobileCardPopOut } from "./MobileCardPopOut";
import { BannerPopOut } from "./BannerPopOut";

import { DepositWalletPopOut } from "./deposit/DepositWalletPopOut";
import { DepositInstructionPopOut } from "./deposit/DepositInstructionPopOut";
import { WithdrawAccountSelectionPopOut } from "./withdraw/WithdrawAccountSelectionPopOut";
import { BindBankAccountPopOut } from "./withdraw/BindBankAccountPopOut";
import { WithdrawDetailPopOut } from "./withdraw/WithdrawDetailPopOut";
import { WithdrawSuccessPopOut } from "./withdraw/WithdrawSuccessPopOut";
import { TransferWalletPopOut } from "./transfer/TransferWalletPopOut";
import { MailboxPopOut } from "./mail/MailboxPopOut";

import { popOutHandler } from "../../scripts/PopOutHandler";
import { PopOutType } from "../../scripts/WebConstant";
import { CardPopOut } from "./CardPopOut";

interface Props {
  scale: number;
  config: GenericObjectType;
}

interface State {
  isTransitioning: boolean;
}

class PopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isTransitioning: false,
    };

    this._onHide = this._onHide.bind(this);
    this._transitionComplete = this._transitionComplete.bind(this);
  }

  public componentDidUpdate(prevProps: Props): void {
    const { type, toggle } = this.props.config;
    if (prevProps.config.type !== type && toggle) {
      this.setState({ isTransitioning: true });
    }
  }

  public render(): JSX.Element {
    const { config, scale } = this.props;
    const { type, toggle, customData } = config;

    let component;
    switch (type) {
      case PopOutType.REGISTER:
        component = (
          <RegisterPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.LOGIN:
        component = (
          <LoginPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.PROFILE:
        component = (
          <ProfilePopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.FORGOT_USERNAME:
        component = (
          <ForgotUsernamePopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.FORGOT_PASSWORD:
        component = (
          <ForgotPasswordPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.BANNER:
        component = (
          <BannerPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
            customData={customData}
          />
        );
        break;

      case PopOutType.DEPOSIT_WALLET:
        component = (
          <DepositWalletPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
            customData={customData}
          />
        );
        break;
      case PopOutType.DEPOSIT_INSTRUCTION:
        component = (
          <DepositInstructionPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
            customData={customData}
          />
        );
        break;

      case PopOutType.WITHDRAW_SELECTION:
        component = (
          <WithdrawAccountSelectionPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.WITHDRAW_ACCOUNT_ADD:
        component = (
          <BindBankAccountPopOut
            toggle={toggle}
            scale={scale}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.WITHDRAW_DETAIL:
        component = (
          <WithdrawDetailPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
            customData={customData}
          />
        );
        break;
      case PopOutType.WITHDRAW_SUCCESS:
        component = (
          <WithdrawSuccessPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
            customData={customData}
          />
        );
        break;
      case PopOutType.TRANSFER_WALLET:
        component = (
          <TransferWalletPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
            customData={customData}
          />
        );
        break;
      case PopOutType.MAILBOX:
        component = (
          <MailboxPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
            customData={customData}
          />
        );
        break;
      case PopOutType.NEWS:
        component = (
          <NoticeBoardPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.CARD:
        component = (
          <CardPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
            customData={customData}
          />
        );
        break;

      case PopOutType.CARD_MOBILE:
        component = (
          <MobileCardPopOut
            toggle={toggle}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
            customData={customData}
          />
        );

        break;
      case PopOutType.LOGIN_MOBILE:
        component = (
          <LoginPopOut
            toggle={toggle}
            scale={scale}
            onHide={this._onHide}
            transitionComplete={this._transitionComplete}
          />
        );
        break;

      default:
        component = null;
        break;
    }

    return component;
  }

  //#region Utils
  private _onHide(): void {
    const { isTransitioning } = this.state;
    if (!isTransitioning) {
      popOutHandler.hidePopOut();
    }
  }

  private _transitionComplete(): void {
    this.setState({ isTransitioning: false });
  }
  //#endregion
}

export { PopOut };
