import React from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";
import { NoticeType } from "../../model/WebConstant";
import { popOutHandler } from "../../model/PopOutHandler";

import customStyle from "../../styles/module/Modal.module.scss";

interface Props {
  scale: number;
  config: GenericObjectType;
}

interface State {
  isTransitioning: boolean;
}

class NoticePopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isTransitioning: false,
    };

    this._getNoticeType = this._getNoticeType.bind(this);
    this._onHide = this._onHide.bind(this);
    this._transitionComplete = this._transitionComplete.bind(this);
  }

  public componentDidMount(): void {
    const { toggle } = this.props.config;
    if (toggle) {
      const interval = setInterval((): void => {
        this._transitionComplete();
        clearInterval(interval);
      }, 1000);
    } else {
      this._transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { config, scale } = this.props;
    const { toggle, customData } = config;
    const { noticeType, description, button } = customData;
    const src = this._getNoticeType(noticeType);

    return (
      <Modal
        isOpen={toggle}
        toggle={this._onHide}
        centered
        cssModule={customStyle}
      >
        <div
          id="notice-pop-out-container"
          style={{ transform: `scale(${scale})` }}
        >
          <div id="notice-title-container" className="row-container center">
            <div id="notice-title">提示</div>
            <div id="cross" onClick={this._onHide}>
              <ImageHandler src="pop_out/close.png" scale={0.5} />
            </div>
          </div>
          <div id="notice-image-container">
            <ImageHandler src={`pop_out/${src}`} scale={0.57} />
          </div>
          <div id="notice-description">{description}</div>
          <div id="notice-button-container">
            <div id="notice-button" onClick={this._onHide}>
              <div id="notice-button-label">{button}</div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  private _getNoticeType(type: NoticeType): string {
    switch (type) {
      case NoticeType.SUCCESS:
        return "msg_ok.png";
      case NoticeType.ERROR:
        return "msg_error.png";
      case NoticeType.ACCOUNT:
        return "msg_account.png";
      default:
        return "";
    }
  }

  private _onHide(): void {
    const { isTransitioning } = this.state;
    if (!isTransitioning) {
      popOutHandler.hideNotice();
    }
  }

  private _transitionComplete(): void {
    this.setState({ isTransitioning: false });
  }
}

export { NoticePopOut };
