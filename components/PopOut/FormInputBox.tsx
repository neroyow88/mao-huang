import React from "react";

interface Props {
  id: string;
  placeholder: string;
  type?: string;
  leftImage?: string;
  rightImage?: string;
  min?: number;
  max?: number;
  inputRef?: any;
  number?: boolean;
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
      inputRef,
    } = this.props;

    const style = {
      backgroundImage: `${leftImage ? `url(${leftImage})` : ""}${
        leftImage && rightImage ? ", " : ""
      }${rightImage ? `url(${rightImage})` : ""}`,
      backgroundPosition: `${leftImage ? "5% 50%" : ""}${
        leftImage && rightImage ? ", " : ""
      }${rightImage ? "95% 50%" : ""}`,
      backgroundRepeat: leftImage || rightImage ? "no-repeat" : "",
      backgroundSize: leftImage || rightImage ? "20px" : "",
      paddingLeft: leftImage ? "40px" : "5px",
    };

    const minLength = min ? min : 0;
    const maxLength = max ? max : 99;

    return (
      <input
        type={type ? type : "text"}
        name={id}
        placeholder={placeholder}
        style={style}
        required
        minLength={minLength}
        maxLength={maxLength}
        ref={inputRef}
        // pattern={number ? `^\d*$` : `^\w*$`}
      ></input>
    );
  }
}

export { FormInputBox };
