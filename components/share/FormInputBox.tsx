import React from "react";

import { ImageContainer } from "./ImageContainer";

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
  color?: string;
}

interface State {
  showPassword: boolean;
}

class FormInputBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showPassword: false,
    };

    this._showPasswordClicked = this._showPasswordClicked.bind(this);
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
      color,
      inputRef,
    } = this.props;
    const { showPassword } = this.state;

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
      color: color ? color : "black",
    };

    const minLength = min ? min : 0;
    const maxLength = max ? max : 99;

    let finalType = type ? type : "text";
    if (type && type === "password" && showPassword) {
      finalType = "text";
    }

    const passwordIcon =
      type === "password" ? (
        <div className="icon-container" onClick={this._showPasswordClicked}>
          <ImageContainer src={"pop_out/password_eye.png"} scale={0.31} />
        </div>
      ) : null;

    return (
      <div className="input-box-container">
        <input
          id={id}
          type={finalType}
          name={id}
          placeholder={placeholder}
          style={style}
          required
          minLength={minLength}
          maxLength={maxLength}
          ref={inputRef}
        ></input>
        {passwordIcon}
      </div>
    );
  }

  private _showPasswordClicked(): void {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }
}

export { FormInputBox };
