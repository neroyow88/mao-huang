import React, { useState } from "react";

export default function CustomerService() {
  return (
    <div id="sponsor-bar-container">
      <div id="sponsor-container">
        {_renderPlatform()}
        {_renderPayment()}
        {_renderFeedback()}
        {_renderContact()}
      </div>
      <div id="copyright-container">
        <p>猫皇娱乐集团由菲律宾卡格扬政府颁发离岸博彩许可证</p>
        <p>并受其监管©2020版权所有。</p>
      </div>
    </div>
  );
}

function _renderPlatform(): JSX.Element {
  return (
    <div id="platform-container" className="child-container">
      <div className="sponsor-title-label">游戏平台</div>
      <div id="platform-content-container">
        <div className="platform-content-row-container">
          <img src="sponsor/logo_KY.png"></img>
          <img src="sponsor/logo_AG.png"></img>
        </div>
        <div className="platform-content-row-container">
          <img src="sponsor/logo_LEG.png"></img>
          <img src="sponsor/logo_ebet.png"></img>
        </div>
        <div className="platform-content-row-container">
          <img src="sponsor/logo_KG.png"></img>
          <img src="sponsor/logo_N2.png"></img>
        </div>
        <div className="platform-content-row-container">
          <img src="sponsor/logo_KMG.png"></img>
        </div>
      </div>
    </div>
  );
}

function _renderPayment(): JSX.Element {
  return (
    <div id="payment-container" className="child-container">
      <div className="sponsor-title-label">支付方式</div>
      <div id="payment-content-container">
        <div className="payment-image-container">
          <img src="sponsor/pay_01.png"></img>
        </div>
        <div className="payment-image-container">
          <img src="sponsor/pay_02.png"></img>
        </div>
        <div className="payment-image-container">
          <img src="sponsor/pay_03.png"></img>
        </div>
      </div>
    </div>
  );
}

function _renderFeedback(): JSX.Element {
  return (
    <div id="feedback-container" className="child-container">
      <div className="sponsor-title-label">建议及投诉</div>
      <div className="email-title">猫皇运营总裁邮箱</div>
      <div className="email-address">maomimi2020@gmail.com</div>
      <div className="email-title">猫皇执行董事邮箱</div>
      <div className="email-address">mhc3296@gmail.com</div>
    </div>
  );
}

function _renderContact(): JSX.Element {
  const [isChatOn, setIsChatOn] = useState(false);
  const popOut = (): void => {
    setIsChatOn(!isChatOn);
    console.log(isChatOn);
  };

  return (
    <div id="contact-container" className="child-container">
      <div className="sponsor-title-label">客服中心</div>
      <div id="contact-content-container">
        <div
          className="contact-content-row-container"
          onClick={popOut}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <div className="contact-image-container">
            <img src="sponsor/contact_chat.png"></img>
          </div>
          在线客服
        </div>

        <div className="contact-content-row-container">
          <div className="contact-image-container">
            <img src="sponsor/contact_qq.png"></img>
          </div>
          1535291636
        </div>

        <div className="contact-content-row-container">
          <div className="contact-image-container">
            <img src="sponsor/contact_skype.png"></img>
          </div>
          cs.cat1688@gmail.com
        </div>

        <div className="contact-content-row-container">
          <div className="contact-image-container">
            <img src="sponsor/contact_email.png"></img>
          </div>
          cs.cat1688@gmail.com
        </div>
      </div>
    </div>
  );
}
