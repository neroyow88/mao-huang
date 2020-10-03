import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../share/PopOutTitle";

import customStyle from "../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

class HistoryPopOut extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const interval = setInterval((): void => {
        transitionComplete();
        clearInterval(interval);
      }, 500);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide } = this.props;
    const components = [];
    for (let i = 0; i < 6; i++) {
      const bgColor = i % 2 === 0 ? "" : "dark-background";
      components.push(
        <div className={`history-item-container column-container ${bgColor}`}>
          <div className={`history-item-content row-container`}>
            <div className="date">2019-10-25 12:12:00</div>
            <div className="transaction">
              <span>AG轉帳至戶內</span>
            </div>
            <div className="status yellow">
              <span>成功</span>
            </div>
            <div className="balance">
              <span>14.40</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="交易纪录" onHide={onHide} />
          <div
            id="history-pop-out-container"
            className="column-container center"
          >
            <div
              id="history-header-container"
              className="history-item-container column-container"
            >
              <div className="history-item-content row-container">
                <div className="date">时间/日期</div>
                <div className="transaction">交易方式</div>
                <div className="status">状态</div>
                <div className="balance">
                  <span>金额</span>
                </div>
              </div>
            </div>
            {components}
          </div>
        </div>
      </Modal>
    );
  }
}

export { HistoryPopOut };
