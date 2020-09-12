import React from "react";
import { Modal } from "reactstrap";

import { ImageHandler } from "../ImageHandler";

import customStyle from "../../styles/module/AccountModal.module.scss";
import { NewsModel } from "../../model/NewsModel";

interface Props {
  toggle: boolean;
  scale: number;
  hidePopOut: NoParamReturnNulFunction;
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
    const { toggle, scale, hidePopOut } = this.props;
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
        toggle={hidePopOut}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <div id="pop-out-title-container">
            <ImageHandler src="pop_out/title_bg.png" scale={0.47} />
            <div id="pop-out-title">公告栏</div>
            <ImageHandler
              src="pop_out/close_button.png"
              scale={0.44}
              onClick={hidePopOut}
            />
          </div>
          <div id="notice-board-container" className="column-container center">
            {components}
          </div>
        </div>
      </Modal>
    );
  }
}

export { NoticeBoardPopOut };
