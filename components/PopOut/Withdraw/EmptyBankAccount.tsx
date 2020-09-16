import React from "react";

import { PopOutType } from "../../../model/WebConstant";

interface Props {
  index: number;
  showPopOut: (any: number, data?: GenericObjectType) => void;
}

class EmptyBankAccount extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { index } = this.props;
    return (
      <div
        className="withdraw-detail-container column-container center"
        key={`withdraw-detail-container-${index}`}
        onClick={(): void => {
          this._onAddAccount();
        }}
      >
        <div className="add-container" key={`add-container-${index}`}>
          +
        </div>
        <div className="withdraw-label" key={`withdraw-label${index}`}>
          增添提款银行卡
        </div>
      </div>
    );
  }

  private _onAddAccount(): void {
    const { showPopOut } = this.props;
    showPopOut && showPopOut(PopOutType.WITHDRAW_ACCOUNT_ADD);
  }
}

export { EmptyBankAccount };
