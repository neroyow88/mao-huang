import React, { RefObject } from "react";

import { ImageContainer } from "../share/ImageContainer";

interface Props {
  noticeList: string[];
  refreshNews: NoParamReturnNulFunction;
}

interface State {
  currentNotice: number;
}

class NoticeBoardMobile extends React.Component<Props, State> {
  private _scroller: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    this._scroller = React.createRef();

    this.state = {
      currentNotice: 0,
    };

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
      <div id="notice-board-container-mobile" className="row-container center">
        <div id="left-board-container-mobile">
          <ImageContainer src={"icon_volume.png"} />
        </div>
        <div id="scroll-left-container">
          <div id="scroll-left-mobile" ref={this._scroller}>
            {noticeList[currentNotice]}
          </div>
        </div>
      </div>
    );
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

export { NoticeBoardMobile };
