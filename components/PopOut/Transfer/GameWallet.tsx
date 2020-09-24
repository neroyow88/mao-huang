import React from "react";
import { ImageHandler } from "../../ImageHandler";

interface Props {
  src: string;
  label: string;
  balance: number;
}

interface State {}

class GameWallet extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { src, label, balance } = this.props;
    return (
      <div className="wallet-container column-container center">
        <div className="wallet-logo-container">
          <ImageHandler src={src} scale={0.4} />
        </div>
        <div className="wallet-label">{label}</div>
        <div className="wallet-label">{`余額: ${balance}`}</div>
      </div>
    );
  }
}

export { GameWallet };
