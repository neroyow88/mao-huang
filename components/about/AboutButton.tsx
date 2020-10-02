import React from "react";
import { AboutType } from "../../scripts/WebConstant";

interface Props {
  src: string;
  label: string;
  index: AboutType;
  onClick: (index: AboutType) => void;
}

class AboutButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  public render(): JSX.Element {
    const { src, label } = this.props;
    return (
      <div
        className={"about-button row-container center"}
        onClick={this._onClick}
      >
        <div className={"about-button-image-container"}>
          <img src={src}></img>
        </div>
        <div className={"about-button-label"}>{label}</div>
      </div>
    );
  }

  private _onClick(): void {
    const { index, onClick } = this.props;
    onClick && onClick(index);
  }
}

export { AboutButton };
