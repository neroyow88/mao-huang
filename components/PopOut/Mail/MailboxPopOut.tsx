import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../PopOutTitle";
import { EmptyMail } from "./EmptyMail";
import { Mails } from "./Mails";
import { mailList } from "../../../model/MailListConstant";

import customStyle from "../../../styles/module/AccountModal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  showPopOut: (any: number, data?: GenericObjectType) => void;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customPopOutData: GenericObjectType;
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
    const { toggle, scale, hidePopOut } = this.props;
    const content =
      mailList.length > 0 ? <Mails mailList={mailList} /> : <EmptyMail />;

    return (
      <Modal
        isOpen={toggle}
        toggle={hidePopOut}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="留言信息" hidePopOut={hidePopOut} />
          {content}
        </div>
      </Modal>
    );
  }
}

export { MailboxPopOut };
