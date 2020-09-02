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
import { PopOutType } from "../model/WebConstant";
import { ImageHandler } from "./ImageHandler";

// module scss
import customStyle from "../styles/module/modal.module.scss";
import customCardMobileStyle from "../styles/module/cardMobileModal.module.scss";

interface Props {
  type: PopOutType;
  toggle: boolean;
  customPopOutData: GenericObjectType;
  hidePopOut: NoParamReturnNulFunction;
}

interface State {
  isTransitioning: boolean;
  mobileCardRotation: number;
}

class PopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isTransitioning: false,
      mobileCardRotation: 0,
    };

    this._renderLogin = this._renderLogin.bind(this);
    this._renderRegister = this._renderRegister.bind(this);
    this._renderForgotUsername = this._renderForgotUsername.bind(this);
    this._renderForgotPassword = this._renderForgotPassword.bind(this);
    this._renderCardPopOut = this._renderCardPopOut.bind(this);
    this._hidePopOut = this._hidePopOut.bind(this);
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.type !== this.props.type) {
      const { type, toggle } = this.props;
      this.setState({ isTransitioning: true });
      if (toggle) {
        if (type === PopOutType.CARD_MOBILE) {
          const interval = setInterval((): void => {
            this.setState({ mobileCardRotation: 180 });
            clearInterval(interval);
          }, 700);

          const secondInterval = setInterval((): void => {
            this.setState({ isTransitioning: false });
            clearInterval(secondInterval);
          }, 1500);
        } else {
          const interval = setInterval((): void => {
            this.setState({ isTransitioning: false });
            clearInterval(interval);
          }, 500);
        }
      } else {
        this.setState({ isTransitioning: false, mobileCardRotation: 0 });
      }
    }
  }

  public render(): JSX.Element {
    const { type } = this.props;
    let component;
    switch (type) {
      case PopOutType.LOGIN:
        component = this._renderLogin();
        break;
      case PopOutType.REGISTER:
        component = this._renderRegister();
        break;
      case PopOutType.FORGOT_USERNAME:
        component = this._renderForgotUsername();
        break;
      case PopOutType.FORGOT_PASSWORD:
        component = this._renderForgotPassword();
        break;
      case PopOutType.CARD_MOBILE:
        component = this._renderCardPopOut();
        break;
      default:
        component = null;
        break;
    }

    return (
      <div id="pop-out-container" style={{ width: "100%" }}>
        {component}
      </div>
    );
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

  private _renderForgotPassword(): JSX.Element {
    const { toggle } = this.props;
    return (
      <Modal
        isOpen={toggle}
        toggle={this._hidePopOut}
        centered
        cssModule={customStyle}
      >
        <ModalHeader onClick={this._hidePopOut}>忘记密码</ModalHeader>
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

  private _renderCardPopOut(): JSX.Element {
    const { toggle, customPopOutData } = this.props;
    const { mobileCardRotation } = this.state;
    const { index } = customPopOutData;

    return (
      <Modal
        isOpen={toggle}
        toggle={this._hidePopOut}
        centered
        cssModule={customCardMobileStyle}
      >
        <div id={`card-0${index}`}>
          <div className="flip-card-mobile" key={`flip-card-${index}`}>
            <div
              className="flip-card-inner"
              key={`flip-card-inner-${index}`}
              style={{ transform: `rotateY(${mobileCardRotation}deg)` }}
            >
              <div className="flip-card-front" key={`flip-card-front-${index}`}>
                <ImageHandler src={`mobile/card/poker_0${index}_front.png`} />
              </div>
              <div className="flip-card-back" key={`flip-card-back-${index}`}>
                <ImageHandler src={`mobile/card/poker_0${index}_back.png`} />
                {this._cardButtonComponent(index)}
              </div>
            </div>
          </div>
        </div>
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

  private _cardButtonComponent(index: number): JSX.Element {
    if (index > 1) {
      const label = index === 2 ? "招财勋章" : "波斯勋章";
      return (
        <div id="card-buttons-container">
          <div className="card-button-container" key={`button-container-left`}>
            <div className="card-button-label" key={`button-label-left`}>
              {label}
            </div>
          </div>
          <div className="card-button-container" key={`button-container-right`}>
            <div className="card-button-label" key={`button-label-right`}>
              游戏充值
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  //#endregion
}

export { PopOut };
