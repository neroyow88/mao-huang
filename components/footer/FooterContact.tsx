import React from "react";

interface Props {}

class FooterContact extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
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
            1535291636
          </div>

          <div className="footer-contact-content-container row-container">
            <div className="footer-contact-image-container">
              <img src="footer/contact_skype.png"></img>
            </div>
            cs.cat1688@gmail.com
          </div>

          <div className="footer-contact-content-container row-container">
            <div className="footer-contact-image-container">
              <img src="footer/contact_email.png"></img>
            </div>
            cs.cat1688@gmail.com
          </div>
        </div>
      </div>
    );
  }
}

export { FooterContact };
