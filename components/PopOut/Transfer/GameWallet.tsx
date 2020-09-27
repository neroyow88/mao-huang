import React from "react";
import { ImageHandler } from "../../ImageHandler";

interface Props {
  src: string;
  label: string;
  balance: number;
  index: number;
}

class GameWallet extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { src, label, balance, index } = this.props;
    return (
      <div
        className="wallet-container column-container center"
        key={`wallet-container-${index}`}
      >
        <div
          className="wallet-logo-container"
          key={`wallet-logo-container-${index}`}
        >
          <ImageHandler src={src} scale={0.4} />
        </div>
        <div
          className="wallet-label"
          key={`wallet-label-${index}`}
        >{`进入${label}`}</div>
        <div
          className="wallet-label"
          key={`wallet-balance-${index}`}
        >{`余額: ${balance}`}</div>
      </div>
    );
  }
}

export { GameWallet };
