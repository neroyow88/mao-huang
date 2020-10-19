import React, { createRef, RefObject } from "react";
import { WalletItem } from "./WalletItem";

interface Props {
  walletList: { [keys: string]: IWalletList };
}

interface State {
  contentHeight: number;
}

class WalletList extends React.Component<Props, State> {
  private _contentRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      contentHeight: 450,
    };

    this._contentRef = createRef();
  }

  public componentDidMount(): void {
    const height = this._contentRef.current.clientHeight;
    this.setState({ contentHeight: height });
  }

  public render(): JSX.Element {
    const { walletList } = this.props;
    const components = Object.keys(walletList).map(
      (key: string, index: number) => {
        const wallet = walletList[key];
        return (
          <WalletItem
            index={index}
            title={wallet.title}
            balance={wallet.balance}
            key={`wallet-item-${index}`}
          />
        );
      }
    );

    const { contentHeight } = this.state;
    const heightOffset = 450 / contentHeight;
    const scrollBarStyle = {
      height: heightOffset > 1 ? "100%" : `${heightOffset * 100}%`,
    };

    return (
      <div id="wallet-list-scroll-view">
        <div id="scroll-view-content" ref={this._contentRef}>
          {components}
        </div>
        <div id="scroll-bar-back">
          <div id="scroll-bar" style={scrollBarStyle}></div>
        </div>
      </div>
    );
  }
}

export { WalletList };
