import React from "react";
import { FooterContact } from "./FooterContact";
import { FooterFeedback } from "./FooterFeedback";
import { FooterOperator } from "./FooterOperator";
import { FooterPayment } from "./FooterPayment";

interface Props {}

class Footer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div id="footer-container">
        <div id="footer-content-container" className="row-container center">
          <FooterOperator />
          <FooterPayment />
          <FooterFeedback />
          <FooterContact />
        </div>
        <div id="copyright-container">
          <p>猫皇娱乐集团由菲律宾卡格扬政府颁发离岸博彩许可证</p>
          <p>并受其监管©2020版权所有。</p>
        </div>
      </div>
    );
  }
}
export { Footer };
