import React from "react";

import { copyToClipboard } from "../../../scripts/Utils";

interface Props {
  index: number;
  title: string;
  value: string;
  canCopy?: boolean;
  isStar?: boolean;
  optionalText?: string;
}

interface State {
  isCopied: boolean;
}

class InstructionBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isCopied: false,
    };

    this._onCopyText = this._onCopyText.bind(this);
  }

  public render(): JSX.Element {
    const { index, title, value, canCopy, isStar, optionalText } = this.props;
    const { isCopied } = this.state;

    const copy = canCopy ? (
      <div
        className="copy-container"
        onClick={(): void => {
          this._onCopyText(index);
        }}
        style={{
          color: isCopied ? "white" : "#ff0000",
          backgroundColor: isCopied ? "#ff0000" : "transparent",
        }}
      >
        {isCopied ? "已复制" : "复制"}
      </div>
    ) : null;
    const star = isStar ? <div className="star-container">*</div> : null;
    const optional = optionalText ? (
      <div className="instruction-label">{optionalText}</div>
    ) : null;

    return (
      <div className="instruction-label-container row-container">
        {star}
        <div className="instruction-label-stretch">{`${title}`}</div>
        <div className="instruction-label">:</div>
        <div id={`instruction-${index}`} className="instruction-label">
          {value}
        </div>
        {optional}
        {copy}
      </div>
    );
  }

  private _onCopyText(id: number): void {
    const elem = document.getElementById(`instruction-${id}`);
    const succeed = copyToClipboard(elem);
    this.setState({ isCopied: succeed });
  }
}

export { InstructionBox };
