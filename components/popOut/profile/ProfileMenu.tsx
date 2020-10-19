import React from "react";

interface Props {
  index: number;
  label: string;
  onChangeIndex: (value: number) => void;
  isSelected: boolean;
}

class ProfileMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._changeIndex = this._changeIndex.bind(this);
  }

  public render(): JSX.Element {
    const { index, label, isSelected } = this.props;
    const opacityStyle = { opacity: isSelected ? 1 : 0.7 };
    const bgColorStyle = { backgroundColor: isSelected ? "#E9A400" : "black" };

    return (
      <div
        className="profile-menu column-container center"
        key={`profile-menu-${index}`}
        onClick={this._changeIndex}
      >
        <div
          className="label-container yellow"
          key={`label-container-${index}`}
          style={opacityStyle}
        >
          {label}
        </div>
        <div
          className="bar-container"
          key={`bar-container-${index}`}
          style={bgColorStyle}
        ></div>
      </div>
    );
  }

  private _changeIndex(): void {
    const { onChangeIndex, index } = this.props;
    onChangeIndex && onChangeIndex(index);
  }
}

export { ProfileMenu };
