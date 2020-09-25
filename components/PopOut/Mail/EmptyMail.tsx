import React from "react";

import { ImageHandler } from "../../ImageHandler";

interface Props {}

class EmptyMail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div id="empty-mail-container" className="column-container center">
        <div id="mailbox-image-container">
          <ImageHandler src={"mail/mailbox.png"} scale={0.4} />
        </div>
        <div className="mailbox-label">您目前无收到信息</div>
      </div>
    );
  }
}

export { EmptyMail };
