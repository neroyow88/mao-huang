import React from "react";
import { infoPageContent } from "../../scripts/constant/InfoPageConstant";
import { AboutType } from "../../scripts/WebConstant";
import { InfoPageButton } from "./InfoPageButton";
import { InfoPageDetail } from "./InfoPageDetail";

interface Props {
  aboutType: AboutType;
}

interface State {
  selectedIndex: AboutType;
}

class InfoPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: props.aboutType,
    };

    this._changeIndex = this._changeIndex.bind(this);
  }

  public render(): JSX.Element {
    const { selectedIndex } = this.state;
    const buttons = [];
    for (let i = 0; i < 6; i++) {
      const active = selectedIndex === i;
      buttons.push(
        <InfoPageButton index={i} active={active} onClick={this._changeIndex} />
      );
    }

    const content = infoPageContent[selectedIndex];
    return (
      <div id="info-page-container" className="column-container center">
        <div id="info-page-bar" className="row-container">
          {buttons}
        </div>
        <InfoPageDetail content={content} />
      </div>
    );
  }

  private _changeIndex(index: AboutType): void {
    this.setState({ selectedIndex: index });
  }
}

export { InfoPage };
