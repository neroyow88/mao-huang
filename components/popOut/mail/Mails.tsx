import React from "react";
import { callApi } from "../../../scripts/ApiClient";
import { ApiPath, MailStatus } from "../../../scripts/WebConstant";

import { ImageContainer } from "../../share/ImageContainer";

interface Props {
  mails: IMail[];
  getMessageCallback: NoParamReturnNulFunction;
}

interface State {
  selectedIndex: number;
}

class Mails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };

    this._onMailSelected = this._onMailSelected.bind(this);
    this._onMailDeleted = this._onMailDeleted.bind(this);
  }

  public render(): JSX.Element {
    const { mails } = this.props;
    const { selectedIndex } = this.state;

    const unreadMail = [];
    const readMail = [];

    mails.forEach((mail: IMail, index: number): void => {
      const selected =
        selectedIndex === index ? <div id="selected-circle"></div> : null;

      if (mail.status === MailStatus.UNREAD) {
        unreadMail.push(
          <div
            className="mail-title mail-unread"
            key={`mail-title-${index}`}
            onClick={() => {
              this._onMailSelected(index);
            }}
          >
            {selected}
            {mail.title}
          </div>
        );
      } else {
        readMail.push(
          <div
            className="mail-title mail-read"
            key={`mail-title-${index}`}
            onClick={() => {
              this._onMailSelected(index);
            }}
          >
            {selected}
            {mail.title}
          </div>
        );
      }
    });

    const mail = mails[selectedIndex];

    return (
      <div id="mails-container" className="row-container">
        <div id="mail-list-container" className="column-container">
          <div className="mail-title yellow">未读信息</div>
          {unreadMail}
          <div className="mail-title yellow">已读信息</div>
          {readMail}
        </div>
        <div id="inbox-container" className="column-container">
          <div id="message-container">
            <ImageContainer src={"mail/mailbox.png"} scale={0.2} />
            <div id="message-content" className="column-container">
              <div className="mailbox-label">{mail.message}</div>
            </div>
          </div>
          <div
            id="delete-container"
            className="row-container"
            onClick={this._onMailDeleted}
          >
            <div id="delete-label">删除此信息</div>
          </div>
        </div>
      </div>
    );
  }

  private _onMailSelected(index: number): void {
    this.setState({ selectedIndex: index });
  }

  private _onMailDeleted(): void {
    const { mails, getMessageCallback } = this.props;
    const { selectedIndex } = this.state;
    const selectedMail = mails[selectedIndex];

    const onResultReturn = (result, error): void => {
      if (result && !error) {
        getMessageCallback && getMessageCallback();
      }
    };

    const params = new FormData();
    params.append("message_id", selectedMail.id);

    const config = {
      path: ApiPath.DELETE_MESSAGE,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }
}

export { Mails };
