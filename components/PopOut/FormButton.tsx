import React from "react";

interface Props {
  label: string;
  background: string;
  color?: string;
  submit?: boolean;
  onClick?: NoParamReturnNulFunction;
}

class FormButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { label, background, color, submit, onClick } = this.props;
    const button = submit ? "submit" : "button";
    const style = {
      background: background,
      color: color,
    };

    return (
      <input
        type={button}
        value={label}
        style={style}
        onClick={onClick}
      ></input>
    );
  }
}

export { FormButton };
