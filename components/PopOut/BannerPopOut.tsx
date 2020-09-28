import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../Utility/PopOutTitle";
import { ImageHandler } from "../ImageHandler";

import customStyle from "../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

class BannerPopOut extends React.Component<Props> {
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
    const { toggle, scale, onHide, customData } = this.props;
    const { src } = customData;
    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="猫皇520" onHide={onHide} />
          <div id="banner-pop-out-container">
            <ImageHandler src={src} />
          </div>
        </div>
      </Modal>
    );
  }
}

export { BannerPopOut };
