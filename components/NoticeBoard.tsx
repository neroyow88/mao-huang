import React from "react";
import { utils } from "../model/Utils";

interface Props {}

class NoticeBoard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._noticeBoardMobile = this._noticeBoardMobile.bind(this);
    this._noticeBoardBrowser = this._noticeBoardBrowser.bind(this);
  }

  public render(): JSX.Element {
    if (utils.isMobile) {
      return this._noticeBoardMobile();
    } else {
      return this._noticeBoardBrowser();
    }
  }

  private _noticeBoardMobile(): JSX.Element {
    return (
      <div id="notice-board-container-mobile">
        <div id="left-board-container-mobile">
          <div id="notice-title-container-mobile">
            <img src="icon_volume.png"></img>
          </div>
        </div>
        <div id="scroll-left-container">
          <div id="scroll-left-mobile">
            由于受疫情影响，原定于2020年7月21日（星期二）恢复的六合彩搅珠（第20/009期）再度延后，开启日期需等待官方另行通知。
          </div>
        </div>
      </div>
    );
  }

  private _noticeBoardBrowser(): JSX.Element {
    return (
      <div id="notice-board-container-browser">
        <div id="left-board-container-browser">
          <div id="notice-title-container-browser">
            <div>公告栏</div>
            <img src="icon_volume.png"></img>
          </div>
        </div>
        <div id="right-board-container"></div>
        <div id="scroll-left-container">
          <div id="scroll-left-browser">
            由于受疫情影响，原定于2020年7月21日（星期二）恢复的六合彩搅珠（第20/009期）再度延后，开启日期需等待官方另行通知。
          </div>
        </div>
      </div>
    );
  }
}

export { NoticeBoard };
