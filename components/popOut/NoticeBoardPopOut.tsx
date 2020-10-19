import React from "react";
import { Modal } from "reactstrap";

import { PageButton } from "../share/PageButton";
import { PopOutTitle } from "../share/PopOutTitle";

import customStyle from "../../styles/module/Modal.module.scss";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

interface State {
  isLoading: boolean;
  noticePageList: string[][];
  currentPage: number;
  totalPage: number;
}

class NoticeBoardPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      noticePageList: [],
      currentPage: 0,
      totalPage: 1,
    };

    this._renderNoticeList = this._renderNoticeList.bind(this);
    this._renderPageButtons = this._renderPageButtons.bind(this);
    this._selectPage = this._selectPage.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete, customData } = this.props;
    if (toggle) {
      const { refreshNews, noticeList } = customData;
      const cb = (): void => {
        const totalPage = Math.ceil(noticeList.length / 5);
        const pageList = [];

        for (let i = 0; i < totalPage; i++) {
          const tempList = [];
          for (let j = i * 5; j < (i + 1) * 5; j++) {
            const notice = noticeList[j];
            if (notice) {
              tempList.push(notice);
            }
          }
          pageList.push(tempList);
        }

        this.setState({
          isLoading: false,
          noticePageList: pageList,
          totalPage: totalPage,
        });
        transitionComplete();
      };
      refreshNews(cb);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide } = this.props;
    const { totalPage } = this.state;

    const pageSelection =
      totalPage > 1 ? (
        <div id="notice-board-page-container" className="row-container center">
          {this._renderPageButtons()}
        </div>
      ) : (
        <div
          id="notice-board-page-container"
          className="yellow row-container center"
        >
          <span>以下无纪录</span>
        </div>
      );

    return (
      <Modal
        isOpen={toggle}
        toggle={onHide}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="公告栏" onHide={onHide} />
          <div id="notice-board-container" className="column-container center">
            {this._renderNoticeList()}
            {pageSelection}
          </div>
        </div>
      </Modal>
    );
  }

  private _renderNoticeList(): JSX.Element[] {
    let components = [];
    const { noticePageList, currentPage } = this.state;
    if (noticePageList.length > 0) {
      noticePageList[currentPage].forEach(
        (notice: string, index: number): void => {
          const bgColor = index % 2 === 0 ? "dark-background" : "";
          components.push(
            <div
              className={`news-container ${bgColor} row-container center"`}
              key={`news-container-${index}`}
            >
              <div className="date-label yellow" key={`date-label-${index}`}>
                2020-01-20
              </div>
              <div className="news-label white" key={`news-label-${index}`}>
                {notice}
              </div>
            </div>
          );
        }
      );
    }

    return components;
  }

  private _renderPageButtons(): JSX.Element[] {
    const { totalPage, currentPage } = this.state;
    const components = [];
    for (let i = 0; i < totalPage; i++) {
      components.push(
        <PageButton
          index={i}
          value={(i + 1).toString()}
          selected={i === currentPage}
          onPageSelected={this._selectPage}
          key={`history-page-button-${i}`}
        />
      );
    }
    return components;
  }

  private _selectPage(value: number): void {
    this.setState({ currentPage: value });
  }
}

export { NoticeBoardPopOut };
