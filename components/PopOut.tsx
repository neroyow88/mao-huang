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

function renderPopOut(props: Props): JSX.Element {
  const { type, toggle, hidePopOut } = props;

  let component;
  switch (type) {
    case PopOutType.REGISTER:
      component = _renderRegister(toggle, hidePopOut);
      break;
    case PopOutType.FORGOT_USERNAME:
      component = _renderForgotUsername(toggle, hidePopOut);
      break;
    case PopOutType.FORGOT_PASSWORD:
      component = _renderForgotPassword(toggle, hidePopOut);
      break;
    default:
      break;
  }

  return (
    <div id="pop-out-container" style={{ width: "100%" }}>
      {component}
    </div>
  );
}

function _renderRegister(
  toggle: boolean,
  close: NoParamReturnNulFunction
): JSX.Element {
  return (
    <Modal isOpen={toggle} toggle={close} centered>
      <ModalHeader onClick={close}>创建新账号</ModalHeader>
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
        <Button onClick={close}>取消</Button>
      </ModalFooter>
    </Modal>
  );
}

function _renderForgotUsername(
  toggle: boolean,
  close: NoParamReturnNulFunction
): JSX.Element {
  return (
    <Modal isOpen={toggle} toggle={close} centered>
      <ModalHeader onClick={close}>忘记账号</ModalHeader>
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
        <Button onClick={close}>取消</Button>
      </ModalFooter>
    </Modal>
  );
}

function _renderForgotPassword(
  toggle: boolean,
  close: NoParamReturnNulFunction
): JSX.Element {
  return (
    <Modal isOpen={toggle} toggle={close} centered>
      <ModalHeader onClick={close}>忘记密码</ModalHeader>
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
        <Button onClick={close}>取消</Button>
      </ModalFooter>
    </Modal>
  );
}

export { renderPopOut };
