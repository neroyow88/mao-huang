import React from "react";

interface Props {}

class FooterFeedback extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div id="footer-feedback-container" className="child-container">
        <div className="footer-title-label">建议及投诉</div>
        <div className="email-title">猫皇运营总裁邮箱</div>
        <div className="email-address">maomimi2020@gmail.com</div>
        <div className="email-title">猫皇执行董事邮箱</div>
        <div className="email-address">mhc3296@gmail.com</div>
      </div>
    );
  }
}

export { FooterFeedback };
