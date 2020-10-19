import React from "react";
import { Modal } from "reactstrap";

import { HistoryDetail } from "./HistoryDetail";

import { PopOutTitle } from "../../share/PopOutTitle";
import { ApiPath } from "../../../scripts/WebConstant";
import { callApi } from "../../../scripts/ApiClient";

import customStyle from "../../../styles/module/Modal.module.scss";
import { PageButton } from "../../share/PageButton";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
}

interface State {
  isLoading: boolean;
  historyList: ITransactionHistory[][];
  currentPage: number;
  totalPage: number;
}

class HistoryPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      historyList: [],
      currentPage: 0,
      totalPage: 0,
    };

    this._renderHistoryList = this._renderHistoryList.bind(this);
    this._renderPageButtons = this._renderPageButtons.bind(this);
    this._selectPage = this._selectPage.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const onResultReturn = (result, error): void => {
        if (result && !error) {
          const data = result.data;
          const totalPage = Math.ceil(data.length / 8);
          const historyList = [];

          for (let i = 0; i < totalPage; i++) {
            const pageList = [];
            for (let j = i * 8; j < (i + 1) * 8; j++) {
              const record = data[j];
              if (record) {
                const tempHistory = {
                  id: record.id,
                  createDate: record.created_at,
                  type: record.type,
                  status: record.status,
                  amount: record.amount,
                };
                pageList.push(tempHistory);
              }
            }
            historyList.push(pageList);
          }
          this.setState({
            isLoading: false,
            historyList: historyList,
            totalPage: totalPage,
          });
          transitionComplete();
        }
      };

      const config = {
        path: ApiPath.GET_HISTORY,
        callback: onResultReturn,
      };

      callApi(config);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide } = this.props;
    const { isLoading, totalPage } = this.state;

    const components = isLoading ? null : this._renderHistoryList();
    const pageSelection =
      totalPage > 1 ? (
        <div id="history-page-container" className="row-container center">
          {this._renderPageButtons()}
        </div>
      ) : (
        <div
          id="history-page-container"
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
          <PopOutTitle label="交易纪录" onHide={onHide} />
          {components}
          {pageSelection}
        </div>
      </Modal>
    );
  }

  private _renderHistoryList(): JSX.Element {
    const { historyList, currentPage } = this.state;
    const components = historyList[currentPage].map(
      (history: ITransactionHistory, index: number): JSX.Element => {
        return (
          <HistoryDetail
            index={index}
            model={history}
            key={`history-detail-${index}`}
          />
        );
      }
    );

    return (
      <div id="history-pop-out-container" className="column-container center">
        <div className="history-item-container history-header-font column-container">
          <div className="history-item-content  row-container">
            <div className="date">时间/日期</div>
            <div className="transaction">交易方式</div>
            <div className="status">状态</div>
            <div className="balance">
              <span>金额</span>
            </div>
          </div>
        </div>
        {components}
      </div>
    );
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

export { HistoryPopOut };
