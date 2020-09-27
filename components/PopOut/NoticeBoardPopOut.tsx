import React from "react";
import { Modal } from "reactstrap";

import { NewsModel } from "../../model/NewsModel";
import { PopOutTitle } from "./PopOutTitle";

import customStyle from "../../styles/module/AccountModal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

class NoticeBoardPopOut extends React.Component<Props> {
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
    const components = NewsModel.map(
      (model: GenericObjectType, index: number): JSX.Element => {
        const bgColor = index % 2 === 0 ? "dark-background" : "";
        return (
          <div
            className={`news-container ${bgColor} row-container center"`}
            key={`news-container-${index}`}
          >
            <div className="date-label yellow" key={`date-label-${index}`}>
              {model.date}
            </div>
            <div className="news-label white" key={`news-label-${index}`}>
              {model.news}
            </div>
          </div>
        );
      }
    );

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="公告栏" onHide={onHide} />
          <div id="notice-board-container" className="column-container center">
            {components}
          </div>
        </div>
      </Modal>
    );
  }
}

export { NoticeBoardPopOut };
