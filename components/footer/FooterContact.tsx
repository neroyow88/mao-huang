import React from "react";

import { ContactModel } from "../../scripts/dataSource/ContactModel";

interface Props {
  model: ContactModel;
}

class FooterContact extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { model } = this.props;
    const { qq, skype, gmail } = model;

    return (
      <div id="footer-contact-container" className="child-container">
        <div className="footer-title-label">客服中心</div>
        <div
          id="footer-contact-contents-container"
          className="column-container"
        >
          <div className="footer-contact-content-container row-container">
            <div className="footer-contact-image-container">
              <img src="footer/contact_chat.png"></img>
            </div>
            在线客服
          </div>

          <div className="footer-contact-content-container row-container">
            <div className="footer-contact-image-container">
              <img src="footer/contact_qq.png"></img>
            </div>
            {qq}
          </div>

          <div className="footer-contact-content-container row-container">
            <div className="footer-contact-image-container">
              <img src="footer/contact_skype.png"></img>
            </div>
            {skype}
          </div>

          <div className="footer-contact-content-container row-container">
            <div className="footer-contact-image-container">
              <img src="footer/contact_email.png"></img>
            </div>
            {gmail}
          </div>
        </div>
      </div>
    );
  }
}

export { FooterContact };
