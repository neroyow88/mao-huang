import React from "react";
import { ImageHandler } from "../ImageHandler";

interface Props {
  label: string;
  hidePopOut: NoParamReturnNulFunction;
}

class PopOutTitle extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { label, hidePopOut } = this.props;

    return (
      <div id="pop-out-title-container">
        <ImageHandler src="pop_out/title_bg.png" scale={0.47} />
        <div id="pop-out-title">{label}</div>
        <ImageHandler
          src="pop_out/close_button.png"
          scale={0.44}
          onClick={hidePopOut}
        />
      </div>
    );
  }
}

export { PopOutTitle };
