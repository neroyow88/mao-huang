import React from "react";

interface Props {
  src: string;
  label: string;
}

class AboutBrowser extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { src, label } = this.props;
    return (
      <div className={"about-browser row-container center"}>
        <div className={"about-browser-image-container"}>
          <img src={src}></img>
        </div>
        <div className={"about-browser-label"}>{label}</div>
      </div>
    );
  }
}

export { AboutBrowser };
