import React from "react";

interface Props {
  index: string;
  src: string;
  optionCount: number;
  selected: boolean;
  onSelected: (value: string) => void;
}

class DepositOptionMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._changeIndex = this._changeIndex.bind(this);
  }

  public render(): JSX.Element {
    const { src, optionCount, selected } = this.props;
    const opacity = selected ? 1 : 0.7;

    return (
      <div className="deposit-option-container column-container center">
        <div
          className="deposit-option row-container center"
          onClick={this._changeIndex}
          style={{ opacity: opacity }}
        >
          <div className="image-container">
            <img src={src}></img>
          </div>
          <div className="round">{optionCount}</div>
        </div>
        <div
          className="option-arrow"
          style={{ visibility: selected ? "visible" : "hidden" }}
        ></div>
      </div>
    );
  }

  private _changeIndex(): void {
    const { index, onSelected } = this.props;
    onSelected && onSelected(index);
  }
}

export { DepositOptionMenu };
