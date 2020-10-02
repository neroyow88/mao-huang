import React from "react";

import { ImageHandler } from "../share/ImageHandler";

interface Props {
  src: string;
  label: string;
  profileScale: number;
  quationScale: number;
}

class AboutCustomerService extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { src, label, profileScale, quationScale } = this.props;

    return (
      <div className="about-profile-container column-container center">
        <div className="about-image-container">
          <ImageHandler src={`${src}.png`} scale={profileScale} />
        </div>
        <div className="about-name-label">{label}</div>
        <div className="about-title-label">客服中心</div>
        <div className="about-description-container row-container center">
          <div className="about-quation-image-container">
            <ImageHandler src={"about/quation_left.png"} scale={quationScale} />
          </div>
          <div className="about-description-label">
            24小时的专业客服团队,提供及时贴心的服务
          </div>
          <div className="about-quation-image-container">
            <ImageHandler
              src={"about/quation_right.png"}
              scale={quationScale}
            />
          </div>
        </div>
      </div>
    );
  }
}

export { AboutCustomerService };
