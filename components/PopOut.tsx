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

interface Props {
  type: PopOutType;
  toggle: boolean;
  hidePopOut: NoParamReturnNulFunction;
}

class PopOut extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      type: PopOutType.NONE,
      toggle: false,
    };

    this._renderLogin = this._renderLogin.bind(this);
    this._renderRegister = this._renderRegister.bind(this);
    this._renderForgotUsername = this._renderForgotUsername.bind(this);
    this._renderForgotPassword = this._renderForgotPassword.bind(this);
    this._hidePopOut = this._hidePopOut.bind(this);
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
      <Modal isOpen={toggle} toggle={this._hidePopOut} centered>
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
      <Modal isOpen={toggle} toggle={this._hidePopOut} centered>
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
      <Modal isOpen={toggle} toggle={this._hidePopOut} centered>
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
      <Modal isOpen={toggle} toggle={this._hidePopOut} centered>
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

  private _hidePopOut(): void {
    const { hidePopOut } = this.props;
    hidePopOut && hidePopOut();
  }
}

export { PopOut };
