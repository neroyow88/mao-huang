import React from "react";

import { ImageContainer } from "../../share/ImageContainer";

import { dataSource } from "../../../scripts/dataSource/DataSource";
import { MailModel } from "../../../scripts/dataSource/PlayerModel";

interface Props {}

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
    const { mails } = dataSource.playerModel;
    const { selectedIndex } = this.state;

    const titleList = mails.map((mail: MailModel, index: number) => {
      const readStyle = mail.isRead ? "mail-read" : "mail-unread";
      const selected =
        selectedIndex === index ? <div id="selected-circle"></div> : null;

      return (
        <div
          className={`mail-title ${readStyle}`}
          key={`mail-title-${index}`}
          onClick={() => {
            this._onMailSelected(index);
          }}
        >
          {selected}
          {mail.title}
        </div>
      );
    });

    return (
      <div id="mails-container" className="row-container">
        <div id="mail-list-container" className="column-container">
          {titleList}
        </div>
        <div id="inbox-container" className="column-container">
          <div id="message-container">
            <ImageContainer src={"mail/mailbox.png"} scale={0.2} />
            <div id="message-content" className="column-container">
              <div className="mailbox-label">{mails[selectedIndex].title}</div>
              <div className="mailbox-label">
                {mails[selectedIndex].content}
              </div>
              <div className="sender-label">{mails[selectedIndex].sender}</div>
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
    // API client call delete mail
  }
}

export { Mails };
