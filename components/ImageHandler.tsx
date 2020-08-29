import React from "react";
import { loadingManager } from "../model/LoadingManager";

interface Props {
  src: string;
  scale?: number;
}

class ImageHandler extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this._onLoaded = this._onLoaded.bind(this);
  }

  public componentDidMount(): void {
    loadingManager.addNewTask();
  }

  public componentWillUnmount(): void {
    loadingManager.taskComplete();
  }

  public render(): JSX.Element {
    const { src, scale } = this.props;
    const newScale = scale ? scale : 1;
    return (
      <div
        className="image-handler"
        style={{ transform: `scale(${newScale})` }}
      >
        <img src={src} onLoad={this._onLoaded} />
      </div>
    );
  }

  private _onLoaded(): void {
    loadingManager.taskComplete();
  }
}

export { ImageHandler };
