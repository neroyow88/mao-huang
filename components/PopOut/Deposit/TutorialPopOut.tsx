import React from "react";
import { Modal } from "reactstrap";

import customStyle from "../../../styles/module/TutorialModal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
}

interface State {
  selectedIndex: number;
  tutorialIndex: number;
}

class TutorialPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      tutorialIndex: 0,
    };

    this._renderTutorialOption = this._renderTutorialOption.bind(this);
    this._changeIndex = this._changeIndex.bind(this);
  }

  public render(): JSX.Element {
    const { scale, toggle, onHide } = this.props;
    const { tutorialIndex } = this.state;
    const tutorialImg = tutorialIndex === 0 ? "pay_detail" : "wechat_detail";

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div
          id="pop-out-container"
          className="tutorial-container"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="tutorial-option-menu row-container center">
            {this._renderTutorialOption(0, "支付宝转银行卡 步骤说明")}
            {this._renderTutorialOption(1, "微信转银行卡 步骤说明")}
          </div>
          <div className="tutorial-image">
            <img src={`tutorial/${tutorialImg}.png`}></img>
          </div>
          <div className="tutorial-close-button" onClick={onHide}>
            <div>返回</div>
          </div>
        </div>
      </Modal>
    );
  }

  private _renderTutorialOption(index: number, label: string): JSX.Element {
    const { tutorialIndex } = this.state;
    const opacity = index === tutorialIndex ? 1 : 0.7;
    const backgroundColor = index === tutorialIndex ? "#E9A400" : "#000000";

    return (
      <div className="tutorial-option-column-container column-container center">
        <div
          className="tutorial-option-row-container column-container center"
          onClick={(): void => {
            this._changeIndex(index);
          }}
          style={{ opacity }}
        >
          <div>{label}</div>
        </div>
        <div className="tutorial-option-bar" style={{ backgroundColor }}></div>
      </div>
    );
  }

  private _changeIndex(index: number): void {
    this.setState({ tutorialIndex: index });
  }
}

export { TutorialPopOut };
