import React from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";
import { NoticeType } from "../../model/WebConstant";

import customStyle from "../../styles/module/NoticeModal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  hidePopOut: NoParamReturnNulFunction;
  customPopOutData: GenericObjectType;
  transitionComplete?: NoParamReturnNulFunction;
}

class NoticePopOut extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._getNoticeType = this._getNoticeType.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (transitionComplete) {
      if (toggle) {
        const interval = setInterval((): void => {
          transitionComplete();
          clearInterval(interval);
        }, 1000);
      } else {
        transitionComplete();
      }
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, hidePopOut, customPopOutData } = this.props;
    const { noticeType, description, button } = customPopOutData;
    const src = this._getNoticeType(noticeType);

    return (
      <Modal
        isOpen={toggle}
        toggle={hidePopOut}
        centered
        cssModule={customStyle}
      >
        <div
          id="notice-pop-out-container"
          style={{ transform: `scale(${scale})` }}
        >
          <div id="notice-title-container" className="row-container center">
            <div id="notice-title">提示</div>
            <div id="cross" onClick={hidePopOut}>
              <ImageHandler src="pop_out/close.png" scale={0.5} />
            </div>
          </div>
          <div id="notice-image-container">
            <ImageHandler src={`pop_out/${src}`} scale={0.57} />
          </div>
          <div id="notice-description">{description}</div>
          <div id="notice-button-container">
            <div id="notice-button" onClick={hidePopOut}>
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
}

export { NoticePopOut };
