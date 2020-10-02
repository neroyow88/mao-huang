import React from "react";
import { isMobile } from "react-device-detect";

// Components
import { HomeBrowserView } from "../components/HomeBrowserView";
import { HomeMobileView } from "../components/HomeMobileView";

import { ApiPath } from "../scripts/WebConstant";
import { loadingManager } from "../scripts/LoadingManager";
import { dataSource } from "../scripts/dataSource/DataSource";
import { apiClient } from "../scripts/ApiClient";
import { LoadingView } from "../components/global/LoadingView";
import { NavigationBar } from "../components/navigationBar/NavigationBar";

interface Props {}

interface State {
  isStart: boolean;
  isLoading: boolean;
  scale: number;
  height: number;
}

export default class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isStart: false,
      isLoading: true,
      scale: 1,
      height: 0,
    };

    this._onResize = this._onResize.bind(this);
    this._onAllTasksCompleted = this._onAllTasksCompleted.bind(this);

    const onResultReturn = (result, err) => {
      if (result && !err) {
        dataSource.updateServerModel(result);
      }
    };
    apiClient.callApi(ApiPath.REQUEST_BANNER, onResultReturn);
  }

  public componentDidMount(): void {
    setInterval((): void => {
      dataSource.updateSystemModel({ isMobile });
      this.setState({ isStart: true });
      this._onResize();
      window.addEventListener("resize", this._onResize);
      loadingManager.setOnAllTasksComplete(this._onAllTasksCompleted);
    }, 10);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this._onResize);
  }

  public render(): JSX.Element {
    const { scale, height, isLoading, isStart } = this.state;
    const { isMobile } = dataSource.systemModel;
    if (isStart) {
      if (isMobile) {
        return (
          <div id="main-container" style={{ height: height }}>
            <LoadingView isLoading={isLoading} height={height} />
            <HomeMobileView scale={scale} />
            <NavigationBar scale={scale} />
          </div>
        );
      } else {
        return (
          <div id="main-container" style={{ height: height }}>
            <LoadingView isLoading={isLoading} height={height} />
            <HomeBrowserView scale={scale} />
          </div>
        );
      }
    } else {
      return (
        <div id="main-container" style={{ height: height }}>
          <LoadingView isLoading={isLoading} height={height} />
        </div>
      );
    }
  }

  private _onResize(): void {
    const { isMobile } = dataSource.systemModel;
    let newScale;
    if (isMobile) {
      const maxWidth = 375;
      newScale = window.innerWidth / maxWidth;
    } else {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      const maxWidth = 1920;
      newScale = (window.innerWidth - scrollBarWidth) / maxWidth;
      newScale = newScale <= 0.66 ? 0.66 : newScale;
    }
    this.setState({ scale: newScale, height: window.innerHeight });
  }

  private _onAllTasksCompleted(): void {
    this.setState({ isLoading: false });
  }
}
