import React from "react";

interface Props {
  index: number;
  title: string;
  toggle: boolean;
  onToggle: (index: number) => void;
}

class GameListDropdownToggle extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onToggle = this._onToggle.bind(this);
  }

  public render(): JSX.Element {
    const { index, title, toggle } = this.props;
    const color = toggle ? "#FF0000" : "#FFFFFF";

    return (
      <div
        className="dropdown-toggle-container row-container center"
        key={`dropdown-toggle-container-${index}`}
        onClick={this._onToggle}
        style={{ color: color }}
      >
        {title}
        <div
          className="arrow-down"
          key={`arrow-down-${index}`}
          style={{ borderTop: `5px solid ${color}` }}
        ></div>
      </div>
    );
  }

  private _onToggle(): void {
    const { index, toggle, onToggle } = this.props;
    const toggleIndex = toggle ? -1 : index;
    onToggle && onToggle(toggleIndex);
  }
}

export { GameListDropdownToggle };
