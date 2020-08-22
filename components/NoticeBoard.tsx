import React from "react";

export default function NoticeBoard() {
  return (
    <div id="notice-board-container">
      <div id="left-board-container">
        <div id="notice-title-container">
          <div>公告栏</div>
          <img src="icon_volume.png"></img>
        </div>
      </div>
      <div id="right-board-container"></div>
      <div id="scroll-left-container">
        <div id="scroll-left">
          由于受疫情影响，原定于2020年7月21日（星期二）恢复的六合彩搅珠（第20/009期）再度延后，开启日期需等待官方另行通知。由于受疫情影响，
        </div>
      </div>
    </div>
  );
}
