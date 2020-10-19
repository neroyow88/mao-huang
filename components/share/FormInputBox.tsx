import React from "react";
import { ValidateState } from "../../scripts/WebConstant";

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
  onValidate?: (value: string) => void;
  validateState?: ValidateState;
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

    this._renderIcon = this._renderIcon.bind(this);
    this._showPasswordClicked = this._showPasswordClicked.bind(this);
    this._validateInput = this._validateInput.bind(this);
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
          onBlur={this._validateInput}
        ></input>
        {this._renderIcon()}
      </div>
    );
  }

  private _renderIcon(): JSX.Element {
    const { type, validateState } = this.props;

    if (type === "password") {
      return (
        <div className="icon-container" onClick={this._showPasswordClicked}>
          <ImageContainer src={"pop_out/password_eye.png"} scale={0.31} />
        </div>
      );
    } else if (validateState) {
      switch (validateState) {
        case ValidateState.NOT_EXIST:
          return (
            <div className="icon-container" onClick={this._showPasswordClicked}>
              <ImageContainer src={"pop_out/check.png"} scale={0.31} />
            </div>
          );
        case ValidateState.EXIST:
          return (
            <div className="icon-container" onClick={this._showPasswordClicked}>
              <ImageContainer src={"pop_out/error.png"} scale={0.31} />
            </div>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  }

  private _showPasswordClicked(): void {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  private _validateInput(): void {
    const { onValidate, inputRef } = this.props;
    onValidate && onValidate(inputRef.current.value);
  }
}

export { FormInputBox };
