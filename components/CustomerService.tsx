import React from "react";
// import LiveChat from "react-livechat";

import { callApi } from "../scripts/ApiClient";
import { ApiPath } from "../scripts/WebConstant";

interface Props {}

interface State {
  licenseId: string;
}

class CustomerService extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      licenseId: undefined,
    };

    this._onOpenLiveChat = this._onOpenLiveChat.bind(this);
  }

  public render(): JSX.Element {
    // const { licenseId } = this.state;

    return (
      <div id="live-chat-container">
        <div id="chat-image" onClick={this._onOpenLiveChat}>
          <img src="live_chat.png"></img>
        </div>
        {/* <LiveChat license={licenseId} /> */}
      </div>
    );
  }

  private _onOpenLiveChat(): void {
    const onResultReturn = (result, error): void => {
      if (result && !error) {
        this.setState({ licenseId: result.data.id });
      }
    };

    const config = {
      path: ApiPath.REQUEST_LIVE_CHAT,
      callback: onResultReturn,
    };

    callApi(config);
  }
}

export { CustomerService };
