import React from "react";
import { loadingManager } from "../model/LoadingManager";

interface Props {
  src: string;
  scale?: number;
  onClick?: NoParamReturnNulFunction;
}

class ImageHandler extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this._onLoaded = this._onLoaded.bind(this);
  }

  public componentDidMount(): void {
    // const { src } = this.props;
    // console.log(`Loading image from ${src}`);
    loadingManager.addNewTask();
  }

  public componentWillUnmount(): void {
    loadingManager.taskComplete();
  }

  public render(): JSX.Element {
    const { src, scale, onClick } = this.props;
    const newScale = scale ? scale : 1;
    return (
      <div
        className="image-handler"
        style={{ transform: `scale(${newScale})` }}
        onClick={onClick && onClick}
      >
        <img src={src} onLoad={this._onLoaded} />
      </div>
    );
  }

  private _onLoaded(): void {
    // const { src, scale } = this.props;
    // console.log(`${src} loaded complete and set scale to ${scale ? scale : 1}`);
    loadingManager.taskComplete();
  }
}

export { ImageHandler };
