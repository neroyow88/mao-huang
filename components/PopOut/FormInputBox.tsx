import React from "react";

interface Props {
  id: string;
  placeholder: string;
  type?: string;
  leftImage?: string;
  rightImage?: string;
  min?: number;
  max?: number;
}

class FormInputBox extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      type,
      id,
      placeholder,
      leftImage,
      rightImage,
      min,
      max,
    } = this.props;

    const background = {
      backgroundImage: `${leftImage ? `url(${leftImage})` : ""}${
        leftImage && rightImage ? ", " : ""
      }${rightImage ? `url(${rightImage})` : ""}`,
      backgroundPosition: `${leftImage ? "5% 50%" : ""}${
        leftImage && rightImage ? ", " : ""
      }${rightImage ? "95% 50%" : ""}`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "20px",
      paddingLeft: `${leftImage ? "40px" : "5px"}`,
    };

    const minLength = min ? min : 0;
    const maxLength = max ? max : 99;

    return (
      <input
        type={type ? type : "text"}
        id={id}
        name={id}
        placeholder={placeholder}
        style={background}
        required
        minLength={minLength}
        maxLength={maxLength}
      ></input>
    );
  }
}

export { FormInputBox };