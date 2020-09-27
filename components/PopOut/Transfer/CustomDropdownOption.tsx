import React, { CSSProperties } from "react";

interface IDropdownOption {
  src: string;
  label: string;
  value: string;
}

interface Props {
  options: { [keys: string]: IDropdownOption };
  selectedIndex: number;
  onSelected: (index: number) => void;
}

interface State {
  toggle: boolean;
  hoverIndex: number;
}

class CustomDropdownOption extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toggle: false,
      hoverIndex: -1,
    };

    this._onToggle = this._onToggle.bind(this);
  }

  public render(): JSX.Element {
    const { options, selectedIndex } = this.props;
    const { toggle, hoverIndex } = this.state;

    const optionKeys = Object.keys(options);
    const children = optionKeys.map(
      (key: string, index: number): JSX.Element => {
        const { src, label } = options[key];
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

    const selectedOption =
      selectedIndex === -1 ? undefined : options[selectedIndex];
    const style: CSSProperties = {
      backgroundImage: selectedOption ? `url(${selectedOption.src})` : "",
      backgroundPosition: "5% 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "35px",
      borderRadius: "5px",
    };

    const spanStyle: CSSProperties = {
      marginLeft: selectedOption ? "60px" : "15px",
    };

    return (
      <div className="dropdown-container" onClick={this._onToggle}>
        <div className="option-container" style={style}>
          <span style={spanStyle}>
            {selectedOption ? selectedOption.label : "请选择"}
          </span>
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
    const { onSelected } = this.props;
    onSelected && onSelected(index);
    this.setState({ toggle: false });
  }

  private _onHover(index: number): void {
    this.setState({ hoverIndex: index });
  }
}

export { CustomDropdownOption };
