import React from "react";

interface Props {
  isLoading: boolean;
  height: number;
}

interface State {
  display: string;
  opacity: number;
}

class LoadingView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      display: "block",
      opacity: 1,
    };
  }

  public componentDidUpdate(prevProp: Props): void {
    if (prevProp.isLoading !== this.props.isLoading) {
      this.setState({
        display: this.props.isLoading ? "block" : "none",
        opacity: this.props.isLoading ? 1 : 0,
      });
    }
  }

  public render(): JSX.Element {
    const { height } = this.props;
    const { display, opacity } = this.state;
    return (
      <div
        id="loading-container"
        style={{ display, opacity, height: height }}
      ></div>
    );
  }
}

export { LoadingView };
