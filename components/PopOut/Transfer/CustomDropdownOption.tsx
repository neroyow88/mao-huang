import React, { CSSProperties } from "react";

interface IDropdownOption {
  src: string;
  label: string;
  value: string;
}

interface Props {
  options: IDropdownOption[];
}

interface State {
  toggle: boolean;
  selectedIndex: number;
  hoverIndex: number;
}

class CustomDropdownOption extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toggle: false,
      selectedIndex: 0,
      hoverIndex: -1,
    };

    this._onToggle = this._onToggle.bind(this);
  }

  public render(): JSX.Element {
    const { options } = this.props;
    const { toggle, selectedIndex, hoverIndex } = this.state;

    const children = options.map(
      (option: IDropdownOption, index: number): JSX.Element => {
        const { src, label } = option;

        const isHover = hoverIndex === index;

        const style: CSSProperties = {
          backgroundImage: `url(${src})`,
          backgroundPosition: "5% 50%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "35px",
          backgroundColor: `${isHover ? "#1e90ff" : "white"}`,
          color: `${isHover ? "white" : "black"}`,
        };

        return (
          <div
            className="option-container"
            key={`option-container-${index}`}
            style={style}
            onClick={(): void => {
              this._onSelected(index);
            }}
            onMouseEnter={(): void => {
              this._onHover(index);
            }}
          >
            <span>{label}</span>
          </div>
        );
      }
    );

    const selectedOption = options[selectedIndex];
    const style: CSSProperties = {
      backgroundImage: `url(${selectedOption.src})`,
      backgroundPosition: "5% 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "35px",
      borderRadius: "5px",
    };

    return (
      <div className="dropdown-container" onClick={this._onToggle}>
        <div className="option-container" style={style}>
          <span>{selectedOption.label}</span>
          <div className="arrow-down"></div>
        </div>
        <div
          className="options-container"
          style={{ display: `${toggle ? "block" : "none"}` }}
        >
          {children}
        </div>
      </div>
    );
  }

  private _onToggle(): void {
    this.setState({ toggle: !this.state.toggle });
  }

  private _onSelected(index: number): void {
    this.setState({ toggle: false, selectedIndex: index });
  }

  private _onHover(index: number): void {
    this.setState({ hoverIndex: index });
  }
}

export { CustomDropdownOption };
