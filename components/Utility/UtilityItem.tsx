import React from "react";

import { ImageHandler } from "../ImageHandler";

interface Props {
  label: string;
  src?: string;
  notified?: string;
  onClick?: NoParamReturnNulFunction;
  onHover?: (toggle: boolean) => void;
}

class UtilityItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onHover = this._onHover.bind(this);
    this._onUnhover = this._onUnhover.bind(this);
  }

  public render(): JSX.Element {
    const { label, src } = this.props;

    const imageComponent = src ? (
      <div className="utility-image">
        <ImageHandler src={src} />
      </div>
    ) : null;

    return (
      <div
        className="utility-item-container row-container"
        onClick={this._onClick}
        onMouseEnter={this._onHover}
        onMouseLeave={this._onUnhover}
      >
        <div className="utility-label">{label}</div>
        {imageComponent}
      </div>
    );
  }

  private _onClick(): void {
    const { onClick } = this.props;
    onClick && onClick();
  }

  private _onHover(): void {
    const { onHover } = this.props;
    onHover && onHover(true);
  }

  private _onUnhover(): void {
    const { onHover } = this.props;
    onHover && onHover(false);
  }
}

export { UtilityItem };
