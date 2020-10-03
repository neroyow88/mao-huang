import React from "react";

interface Props {
  content: IInfoPage;
}

class InfoPageDetail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { header, contents } = this.props.content;
    const components = [];

    if (header) {
      components.push(<div className="detail-title">{header}</div>);
    }

    if (contents) {
      contents.forEach((content: IInfoPageContent, index: number): void => {
        const { title, label } = content;
        components.push(
          <div className="detail-title" key={`detail-title-${index}`}>
            {title}
          </div>
        );
        components.push(
          <div className="detail-label" key={`detail-label-${index}`}>
            {label}
          </div>
        );
      });
    }

    return (
      <div id="info-page-detail" className="column-container">
        {components}
      </div>
    );
  }
}

export { InfoPageDetail };
