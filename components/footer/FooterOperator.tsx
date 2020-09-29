import React from "react";

interface Props {}

class FooterOperator extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div id="footer-operator-container" className="child-container">
        <div className="footer-title-label">游戏平台</div>
        <div id="footer-operator-content-container">
          <div className="footer-operator-content row-container">
            <img src="footer/logo_KY.png"></img>
            <img src="footer/logo_AG.png"></img>
          </div>
          <div className="footer-operator-content row-container">
            <img src="footer/logo_LEG.png"></img>
            <img src="footer/logo_ebet.png"></img>
          </div>
          <div className="footer-operator-content row-container">
            <img src="footer/logo_KG.png"></img>
            <img src="footer/logo_N2.png"></img>
          </div>
          <div className="footer-operator-content row-container">
            <img src="footer/logo_KMG.png"></img>
          </div>
        </div>
      </div>
    );
  }
}

export { FooterOperator };
