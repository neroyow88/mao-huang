import React from "react";

import { ImageHandler } from "../share/ImageHandler";

interface Props {
  label: string;
  src?: string;
  notified?: string;
  onClick?: NoParamReturnNulFunction;
}

class UtilityItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  public render(): JSX.Element {
    const { label, src, children } = this.props;

    const imageComponent = src ? (
      <div className="utility-image">
        <ImageHandler src={src} />
      </div>
    ) : null;

    return (
      <div className="utility-item-container">
        <div
          className="utility-item-button row-container"
          onClick={this._onClick}
        >
          <div className="utility-label">{label}</div>
          {imageComponent}
        </div>
        {children}
      </div>
    );
  }

  private _onClick(): void {
    const { onClick } = this.props;
    onClick && onClick();
  }
}

export { UtilityItem };
