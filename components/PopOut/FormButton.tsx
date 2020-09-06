import React from "react";

interface Props {
  label: string;
  background: string;
  submit?: boolean;
  onClick?: NoParamReturnNulFunction;
}

class FormButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { label, background, submit, onClick } = this.props;
    const button = submit ? "submit" : "button";

    return (
      <input
        type={button}
        value={label}
        style={{ background }}
        onClick={onClick}
      ></input>
    );
  }
}

export { FormButton };
