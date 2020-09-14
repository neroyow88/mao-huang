import React from "react";

interface Props {
  label: string;
  color?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  gradient?: boolean;
  submit?: boolean;
  onClick?: NoParamReturnNulFunction;
  image?: string;
}

class FormButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      label,
      color,
      backgroundColor,
      backgroundGradient,
      submit,
      onClick,
      image,
    } = this.props;
    const button = submit ? "submit" : "button";
    const style = {
      color: color,
      backgroundColor: backgroundColor,

      backgroundImage: `${image ? `url(${image})` : ""}${
        image && backgroundGradient ? ", " : ""
      }${backgroundGradient ? backgroundGradient : ""}`,

      backgroundPosition: `${image ? "90% 50%" : ""}${
        image && backgroundGradient ? ", " : ""
      }${backgroundGradient ? "100%" : ""}`,

      backgroundRepeat: `${image ? "no-repeat" : ""}`,

      backgroundSize: `${image ? "15px" : ""}${
        image && backgroundGradient ? ", " : ""
      }${backgroundGradient ? "100%" : ""}`,
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
