import React from "react";
import { AboutType } from "../../scripts/WebConstant";
import { ImageContainer } from "../share/ImageContainer";

const buttonData = [
  { src: "about", label: "关于猫皇" },
  { src: "service", label: "服务条款" },
  { src: "deposit", label: "游戏充值" },
  { src: "withdraw", label: "快速提款" },
  { src: "qa", label: "常见问题" },
  { src: "privacy", label: "隐私条款" },
];

interface Props {
  index: AboutType;
  active: boolean;
  onClick: (index: AboutType) => void;
}

class InfoPageButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onClicked = this._onClicked.bind(this);
  }

  public render(): JSX.Element {
    const { index, active } = this.props;
    const data = buttonData[index];
    const url = `info_page/${data.src}_${active ? "active" : "deactive"}.png`;
    const labelStyle = {
      color: active ? "#FF0000" : "#FCB715",
    };

    return (
      <div
        className="info-page-button column-container center"
        onClick={this._onClicked}
      >
        <div id={`button-image-${index}`} className="button-image">
          <ImageContainer src={url} scale={0.5} />
        </div>
        <div className="info-page-button-label" style={labelStyle}>
          {data.label}
        </div>
      </div>
    );
  }

  private _onClicked(): void {
    const { index, onClick } = this.props;
    onClick && onClick(index);
  }
}

export { InfoPageButton };
