import React from "react";

interface Props {}

class FooterPayment extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div id="footer-payment-container" className="child-container">
        <div className="footer-title-label">支付方式</div>
        <div id="footer-payment-content-container" className="column-container">
          <div className="footer-payment-image-container">
            <img src="footer/pay_01.png"></img>
          </div>
          <div className="footer-payment-image-container">
            <img src="footer/pay_02.png"></img>
          </div>
          <div className="footer-payment-image-container">
            <img src="footer/pay_03.png"></img>
          </div>
        </div>
      </div>
    );
  }
}

export { FooterPayment };
