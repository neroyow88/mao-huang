import React, { RefObject } from "react";

import { PopOutType } from "../../scripts/WebConstant";
import { popOutHandler } from "../../scripts/PopOutHandler";

interface Props {
  noticeList: string[];
  refreshNews: (cb?: NoParamReturnNulFunction) => void;
}

interface State {
  currentNotice: number;
}

class NoticeBoardBrowser extends React.Component<Props, State> {
  private _scroller: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    this._scroller = React.createRef();

    this.state = {
      currentNotice: 0,
    };

    this._onNewsClicked = this._onNewsClicked.bind(this);
    this._onScrollDone = this._onScrollDone.bind(this);
  }

  public componentDidMount(): void {
    this._scroller.current.addEventListener(
      "animationiteration",
      this._onScrollDone
    );
  }

  public componentWillUnmount(): void {
    this._scroller.current.removeEventListener(
      "animationiteration",
      this._onScrollDone
    );
  }

  public render(): JSX.Element {
    const { noticeList } = this.props;
    const { currentNotice } = this.state;

    return (
      <div id="notice-board-container-browser">
        <div id="left-board-container-browser">
          <div
            id="notice-title-container-browser"
            className="row-container center"
          >
            <div>公告栏</div>
            <img src="icon_volume.png"></img>
          </div>
        </div>
        <div id="right-board-container"></div>
        <div id="scroll-left-container">
          <div
            id="scroll-left-browser"
            onClick={this._onNewsClicked}
            ref={this._scroller}
          >
            {noticeList[currentNotice]}
          </div>
        </div>
      </div>
    );
  }

  private _onNewsClicked(): void {
    const { noticeList, refreshNews } = this.props;
    popOutHandler.showPopOut(PopOutType.NEWS, {
      noticeList: noticeList,
      refreshNews: refreshNews,
    });
  }

  private _onScrollDone(): void {
    const { noticeList } = this.props;
    const { currentNotice } = this.state;
    if (noticeList.length > 0) {
      let nextIndex = currentNotice + 1;
      nextIndex = nextIndex > noticeList.length ? 0 : nextIndex;
      this.setState({ currentNotice: nextIndex });
    }
  }
}

export { NoticeBoardBrowser };
