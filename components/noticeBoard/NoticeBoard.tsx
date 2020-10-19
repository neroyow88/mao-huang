import React from "react";

import { NoticeBoardBrowser } from "./NoticeBoardBrowser";
import { NoticeBoardMobile } from "./NoticeBoardMobile";

import { ApiPath } from "../../scripts/WebConstant";
import { callApi } from "../../scripts/ApiClient";

interface Props {
  isMobile: boolean;
}

interface State {
  noticeList: string[];
  currentNotice: number;
}

class NoticeBoard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      noticeList: [],
      currentNotice: 0,
    };

    this._refreshNews = this._refreshNews.bind(this);
  }

  public componentDidMount(): void {
    this._refreshNews();
  }

  public render(): JSX.Element {
    const { isMobile } = this.props;
    const { noticeList } = this.state;
    if (isMobile) {
      return (
        <NoticeBoardMobile
          noticeList={noticeList}
          refreshNews={this._refreshNews}
        />
      );
    } else {
      return (
        <NoticeBoardBrowser
          noticeList={noticeList}
          refreshNews={this._refreshNews}
        />
      );
    }
  }

  private _refreshNews(callback?: NoParamReturnNulFunction): void {
    const onResultReturn = (result, error): void => {
      if (result && !error) {
        const data = result.data;
        if (data) {
          const noticeList = [];
          Object.keys(data).forEach((key: string): void => {
            noticeList.push(data[key]);
          });

          this.setState({ noticeList: noticeList });
          callback && callback();
        }
      }
    };

    const config = {
      path: ApiPath.GET_ANNOUNCEMENT,
      callback: onResultReturn,
    };
    callApi(config);
  }
}

export { NoticeBoard };
