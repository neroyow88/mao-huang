import React, { CSSProperties } from "react";
import { GameIdList, PlatformId } from "../../../scripts/WebConstant";

interface Props {
  walletList: { [keys: string]: IWalletList };
  selectedIndex: number;
  toggle: boolean;
  onToggle: NoParamReturnNulFunction;
  onSelected: (index: number) => void;
}

interface State {
  hoverIndex: number;
}

class CustomDropdownOption extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hoverIndex: -1,
    };

    this._onToggle = this._onToggle.bind(this);
  }

  public render(): JSX.Element {
    const { walletList, selectedIndex, toggle } = this.props;
    const { hoverIndex } = this.state;

    const children = [];
    GameIdList.forEach((id: PlatformId, index: number): void => {
      const wallet = walletList[id];
      if (wallet) {
        const label = wallet.title;
        const isHover = hoverIndex === index;
        const style: CSSProperties = {
          backgroundImage: `url(wallet/${wallet.constant}_logo.png)`,
          backgroundPosition: "5% 50%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "35px",
          backgroundColor: `${isHover ? "#1e90ff" : "white"}`,
          color: `${isHover ? "white" : "black"}`,
        };

        children.push(
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
    });

    const selectedOption =
      selectedIndex === -1 ? undefined : walletList[GameIdList[selectedIndex]];
    const style: CSSProperties = {
      backgroundImage: selectedOption
        ? `url(wallet/${selectedOption.constant}_logo.png)`
        : "",
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
            {selectedOption ? selectedOption.title : "请选择"}
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
    const { onToggle } = this.props;
    onToggle && onToggle();
  }

  private _onSelected(index: number): void {
    const { onSelected } = this.props;
    onSelected && onSelected(index);
  }

  private _onHover(index: number): void {
    this.setState({ hoverIndex: index });
  }
}

export { CustomDropdownOption };
