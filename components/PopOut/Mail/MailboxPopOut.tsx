import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../Utility/PopOutTitle";
import { EmptyMail } from "./EmptyMail";
import { Mails } from "./Mails";

import { dataSource } from "../../../model/DataSource";

import customStyle from "../../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

class MailboxPopOut extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
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
    const { mails } = dataSource.playerModel;
    const content = mails.length > 0 ? <Mails /> : <EmptyMail />;

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="留言信息" onHide={onHide} />
          {content}
        </div>
      </Modal>
    );
  }
}

export { MailboxPopOut };
