import React from "react";
import { Modal } from "reactstrap";

import { PopOutTitle } from "../PopOutTitle";

import customStyle from "../../../styles/module/AccountModal.module.scss";
import { ImageHandler } from "../../ImageHandler";

interface Props {
  toggle: boolean;
  scale: number;
  hidePopOut: NoParamReturnNulFunction;
  transitionComplete: NoParamReturnNulFunction;
  customPopOutData: GenericObjectType;
}

class WithdrawSuccessPopOut extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public componentDidMount(): void {
    const { toggle, transitionComplete } = this.props;
    if (toggle) {
      const interval = setInterval((): void => {
        transitionComplete();
        clearInterval(interval);
      }, 500);
    } else {
      transitionComplete();
    }
  }

  public render(): JSX.Element {
    const { toggle, scale, hidePopOut, customPopOutData } = this.props;
    const { invoice } = customPopOutData;

    return (
      <Modal
        isOpen={toggle}
        toggle={hidePopOut}
        centered
        size="xl"
        cssModule={customStyle}
      >
        <div id="pop-out-container" style={{ transform: `scale(${scale})` }}>
          <PopOutTitle label="快速提款" hidePopOut={hidePopOut} />
          <div
            id="withdraw-success-container"
            className="column-container center"
          >
            <div id="success-image-container">
              <ImageHandler src={"wallet/cash_icon.png"} scale={0.4} />
            </div>
            <div id="invoice-label-container">
              提款申请已提交,您的提款编号是 <span>{invoice}</span>
            </div>
            <div id="instruction-label-container">
              请留意查询银行帐户余额,如有任何疑问请联系24小时在线客服提供协助,谢谢。
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export { WithdrawSuccessPopOut };
