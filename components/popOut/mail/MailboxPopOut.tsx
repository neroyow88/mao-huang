import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../../share/PopOutTitle";
import { EmptyMail } from "./EmptyMail";
import { Mails } from "./Mails";

import customStyle from "../../../styles/module/Modal.module.scss";
import { ApiPath } from "../../../scripts/WebConstant";
import { callApi } from "../../../scripts/ApiClient";

interface Props {
  toggle: boolean;
  scale: number;
  onHide: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customData: GenericObjectType;
}

interface State {
  mails: IMail[];
}

class MailboxPopOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      mails: [],
    };

    this._getMessage = this._getMessage.bind(this);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      this._getMessage(transitionComplete);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, onHide } = this.props;
    const { mails } = this.state;
    const content =
      mails.length > 0 ? (
        <Mails mails={mails} getMessageCallback={this._getMessage} />
      ) : (
        <EmptyMail />
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
          <PopOutTitle label="留言信息" onHide={onHide} />
          {content}
        </div>
      </Modal>
    );
  }

  private _getMessage(callback?: NoParamReturnNulFunction): void {
    const onResultReturn = (result, error): void => {
      if (result && !error) {
        const mails = result.data.map(
          (data: GenericObjectType): IMail => {
            return {
              id: data.id,
              title: data.title,
              message: data.message,
              status: data.status,
            };
          }
        );
        this.setState({ mails: mails });
        callback && callback();
      }
    };

    const params = new FormData();
    params.append("page", "3");

    const config = {
      path: ApiPath.GET_MESSAGE,
      callback: onResultReturn,
      params: params,
    };
    callApi(config);
  }
}

export { MailboxPopOut };
