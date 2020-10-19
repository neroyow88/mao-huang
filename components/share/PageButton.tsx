import React from "react";

interface Props {
  index: number;
  value: string;
  selected: boolean;
  onPageSelected: (value: number) => void;
}

class PageButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onPageSelected = this._onPageSelected.bind(this);
  }

  public render(): JSX.Element {
    const { index, value, selected } = this.props;
    const selectedStyle = selected ? "yellow" : "white";

    return (
      <div
        className={`page-button ${selectedStyle}`}
        key={`page-button-${index}`}
        onClick={this._onPageSelected}
      >
        <span>{value}</span>
      </div>
    );
  }

  private _onPageSelected(): void {
    const { index, onPageSelected } = this.props;
    onPageSelected && onPageSelected(index);
  }
}

export { PageButton };
