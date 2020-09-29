import React from "react";

interface Props {
  index: number;
  src: string;
  label: string;
  fontColor: string;
  onClick?: NoParamReturnNulFunction;
}

class EventBarButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onClicked = this._onClicked.bind(this);
  }

  public render(): JSX.Element {
    const { index, src, label, fontColor } = this.props;
    return (
      <div
        className="button-container"
        key={`button-container-${index}`}
        onClick={this._onClicked}
      >
        <img src={src}></img>
        <div
          className="button-label"
          key={`button-label-${index}`}
          style={{ color: fontColor }}
        >
          {label}
        </div>
      </div>
    );
  }

  private _onClicked(): void {
    const { onClick } = this.props;
    onClick && onClick();
  }
}

export { EventBarButton };
