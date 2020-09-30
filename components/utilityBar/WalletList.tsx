import React, { createRef, RefObject } from "react";
import { IWalletModel } from "../../scripts/dataSource/PlayerModel";
import { WalletItem } from "./WalletItem";

interface Props {
  model: IWalletModel;
}

interface State {
  contentHeight: number;
}

class WalletList extends React.Component<Props, State> {
  private _contentRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    this.state = { contentHeight: 450 };

    this._contentRef = createRef();
  }

  public componentDidMount(): void {
    const height = this._contentRef.current.clientHeight;
    this.setState({ contentHeight: height });
  }

  public render(): JSX.Element {
    const { model } = this.props;
    const keys = Object.keys(model);
    const components = keys.map((key: string, index: number) => {
      if (index > 0) {
        const wallet = model[key];
        return <WalletItem index={index} name={key} balance={wallet} />;
      }
      return null;
    });

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
