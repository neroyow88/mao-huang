import React from "react";
import { ImageContainer } from "./ImageContainer";

interface Props {
  label: string;
  onHide: NoParamReturnNulFunction;
}

class PopOutTitle extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { label, onHide } = this.props;

    return (
      <div id="pop-out-title-container">
        <ImageContainer src="pop_out/title_bg.png" scale={0.47} />
        <div id="pop-out-title">{label}</div>
        <ImageContainer
          src="pop_out/close_button.png"
          scale={0.44}
          onClick={onHide}
        />
      </div>
    );
  }
}

export { PopOutTitle };
