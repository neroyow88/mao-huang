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

export default function PopOut(
  type: PopOutType,
  toggle: boolean,
  close = () => {}
): JSX.Element {
  let component;
  switch (type) {
    case PopOutType.REGISTER:
      component = renderRegister(toggle, close);
      break;
    case PopOutType.FORGOT_USERNAME:
      component = renderForgotUsername(toggle, close);
      break;
    case PopOutType.FORGOT_PASSWORD:
      component = renderForgotPassword(toggle, close);
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

function renderRegister(toggle: boolean, close = () => {}): JSX.Element {
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

function renderForgotUsername(toggle: boolean, close = () => {}): JSX.Element {
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

function renderForgotPassword(toggle: boolean, close = () => {}): JSX.Element {
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
