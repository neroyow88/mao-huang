import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import { PopOutType } from "../../model/WebConstant";
import { ForgotUsernamePopOut } from "./ForgotUsernamePopOut";
import { ForgotPasswordPopOut } from "./ForgotPasswordPopOut";
import { LoginPopOut } from "./LoginPopOut";
import { RegisterPopOut } from "./RegisterPopOut";
import { ProfilePopOut } from "./ProfilePopOut";
import { NoticeBoardPopOut } from "./NoticeBoardPopOut";
import { MobileCardPopOut } from "./MobileCardPopOut";
import { NoticePopOut } from "./NoticePopOut";
import { DepositWalletPopOut } from "./Deposit/DepositWalletPopOut";
import { DepositInstructionPopOut } from "./Deposit/DepositInstructionPopOut";

// module scss
import customStyle from "../../styles/module/Modal.module.scss";
import { WithdrawWalletPopOut } from "./WithdrawWalletPopOut";

interface Props {
  type: PopOutType;
  toggle: boolean;
  scale: number;
  customPopOutData: GenericObjectType;
  showPopOut: (any: number, data?: GenericObjectType) => void;
  hidePopOut: NoParamReturnNulFunction;
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

    this._renderLogin = this._renderLogin.bind(this);
    this._renderRegister = this._renderRegister.bind(this);
    this._renderForgotUsername = this._renderForgotUsername.bind(this);

    this._hidePopOut = this._hidePopOut.bind(this);
    this._transitionComplete = this._transitionComplete.bind(this);
  }

  public componentDidUpdate(prevProps: Props): void {
    const { type, toggle } = this.props;
    if (prevProps.type !== type && toggle) {
      this.setState({ isTransitioning: true });
    }
  }

  public render(): JSX.Element {
    const { type, toggle, scale, customPopOutData, showPopOut } = this.props;
    let component;
    switch (type) {
      case PopOutType.REGISTER:
        component = (
          <RegisterPopOut
            toggle={toggle}
            scale={scale}
            showPopOut={showPopOut}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.LOGIN:
        component = (
          <LoginPopOut
            toggle={toggle}
            scale={scale}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.PROFILE:
        component = (
          <ProfilePopOut
            toggle={toggle}
            scale={scale}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.FORGOT_USERNAME:
        component = (
          <ForgotUsernamePopOut
            toggle={toggle}
            scale={scale}
            showPopOut={showPopOut}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.FORGOT_PASSWORD:
        component = (
          <ForgotPasswordPopOut
            toggle={toggle}
            scale={scale}
            showPopOut={showPopOut}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
          />
        );
        break;

      case PopOutType.DEPOSIT_WALLET:
        component = (
          <DepositWalletPopOut
            toggle={toggle}
            scale={scale}
            showPopOut={showPopOut}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
            customPopOutData={customPopOutData}
          />
        );
        break;
      case PopOutType.DEPOSIT_INSTRUCTION:
        component = (
          <DepositInstructionPopOut
            toggle={toggle}
            scale={scale}
            showPopOut={showPopOut}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
            customPopOutData={customPopOutData}
          />
        );
        break;
      case PopOutType.WITHDRAW_WALLET:
        component = (
          <WithdrawWalletPopOut
            toggle={toggle}
            scale={scale}
            showPopOut={showPopOut}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
          />
        );
        break;

      case PopOutType.CARD_MOBILE:
        component = (
          <MobileCardPopOut
            toggle={toggle}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
            customPopOutData={customPopOutData}
          />
        );

        break;
      case PopOutType.LOGIN_MOBILE:
        component = (
          <LoginPopOut
            toggle={toggle}
            scale={scale}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
          />
        );
        break;

      case PopOutType.NEWS:
        component = (
          <NoticeBoardPopOut
            toggle={toggle}
            scale={scale}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
          />
        );
        break;
      case PopOutType.NOTICE:
        component = (
          <NoticePopOut
            toggle={toggle}
            scale={scale}
            hidePopOut={this._hidePopOut}
            transitionComplete={this._transitionComplete}
            customPopOutData={customPopOutData}
          />
        );
        break;
      default:
        component = null;
        break;
    }

    return component;
  }

  private _renderLogin(): JSX.Element {
    const { toggle } = this.props;
    return (
      <Modal
        isOpen={toggle}
        toggle={this._hidePopOut}
        centered
        cssModule={customStyle}
      >
        <ModalHeader onClick={this._hidePopOut}>登入</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>猫皇账号</Label>
              <Input type="email" id="username" placeholder="猫皇账号"></Input>
            </FormGroup>
            <FormGroup>
              <Label>密码</Label>
              <Input type="password" id="password" placeholder="密码"></Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button>登入</Button>
          <Button onClick={this._hidePopOut}>取消</Button>
        </ModalFooter>
      </Modal>
    );
  }

  private _renderRegister(): JSX.Element {
    const { toggle } = this.props;
    return (
      <Modal
        isOpen={toggle}
        toggle={this._hidePopOut}
        centered
        cssModule={customStyle}
      >
        <ModalHeader onClick={this._hidePopOut}>创建新账号</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>猫皇账号</Label>
              <Input type="email" id="username" placeholder="猫皇账号"></Input>
            </FormGroup>
            <FormGroup>
              <Label>密码</Label>
              <Input type="password" id="password" placeholder="密码"></Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button>创建</Button>
          <Button onClick={this._hidePopOut}>取消</Button>
        </ModalFooter>
      </Modal>
    );
  }

  private _renderForgotUsername(): JSX.Element {
    const { toggle } = this.props;
    return (
      <Modal
        isOpen={toggle}
        toggle={this._hidePopOut}
        centered
        cssModule={customStyle}
      >
        <ModalHeader onClick={this._hidePopOut}>忘记账号</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>输入电子邮件</Label>
              <Input
                type="email"
                id="username"
                placeholder="输入电子邮件"
              ></Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button>确定</Button>
          <Button onClick={this._hidePopOut}>取消</Button>
        </ModalFooter>
      </Modal>
    );
  }

  //#region Utils
  private _hidePopOut(): void {
    const { isTransitioning } = this.state;
    if (!isTransitioning) {
      const { hidePopOut } = this.props;
      hidePopOut && hidePopOut();
    }
  }

  private _transitionComplete(): void {
    this.setState({ isTransitioning: false });
  }
  //#endregion
}

export { PopOut };
