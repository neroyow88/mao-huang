import React from "react";
import { isMobile } from "react-device-detect";

// Components
import { HomeBrowserView } from "../components/HomeBrowserView";
import { HomeMobileView } from "../components/HomeMobileView";
import { LoadingView } from "../components/global/LoadingView";
import { NavigationBar } from "../components/navigationBar/NavigationBar";
import { CustomerService } from "../components/CustomerService";

import { ApiPath } from "../scripts/WebConstant";
import { loadingManager } from "../scripts/LoadingManager";
import { callMultipleApi } from "../scripts/ApiClient";

import { LoginStatusModel } from "../scripts/dataSource/LoginStatusModel";
import { PlatformsModel } from "../scripts/dataSource/PlatformsModel";
import { BannersModel } from "../scripts/dataSource/BannersModel";
import { ContactModel } from "../scripts/dataSource/ContactModel";

interface Props {}

interface State {
  scale: number;
  height: number;
  isStart: boolean;
  isLoading: boolean;
  isMobile: boolean;
  loginStatus: LoginStatusModel;
  platforms: PlatformsModel;
  contact: ContactModel;
  banners: BannersModel;
}

export default class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      scale: 1,
      height: 0,
      isStart: false,
      isLoading: true,
      isMobile: false,
      loginStatus: undefined,
      platforms: undefined,
      contact: undefined,
      banners: undefined,
    };

    this._onResize = this._onResize.bind(this);
    this._onAllTasksCompleted = this._onAllTasksCompleted.bind(this);
    this._updateLogin = this._updateLogin.bind(this);
  }

  public componentDidMount(): void {
    const onResultReturn = (results, err) => {
      if (results && !err) {
        const loginStatus = new LoginStatusModel(results[0].data.data);
        const platforms = new PlatformsModel(results[1].data.data);
        const contact = new ContactModel(results[2].data.data);
        const banners = new BannersModel(results[3].data.data);

        this.setState({
          loginStatus: loginStatus,
          banners: banners,
          contact: contact,
          platforms: platforms,
        });

        this.setState({ isStart: true, isMobile: isMobile });
        this._onResize();
        window.addEventListener("resize", this._onResize);
        loadingManager.setOnAllTasksComplete(this._onAllTasksCompleted);
      }
    };

    const configs = [
      {
        path: ApiPath.GET_LOGIN_STATUS,
      },
      {
        path: ApiPath.GET_GAME_LIST,
      },
      {
        path: ApiPath.GET_CONTACT_INFO,
      },
      {
        path: ApiPath.GET_BANNER,
      },
    ];
    callMultipleApi(configs, onResultReturn);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this._onResize);
  }

  public render(): JSX.Element {
    const {
      scale,
      height,
      isLoading,
      isStart,
      isMobile,
      loginStatus,
      platforms,
      contact,
      banners,
    } = this.state;

    const dataSource = { isMobile, loginStatus, platforms, contact, banners };
    if (isStart) {
      if (isMobile) {
        return (
          <div id="main-container" style={{ height: height }}>
            <LoadingView isLoading={isLoading} height={height} />
            <HomeMobileView
              scale={scale}
              loginCallback={this._updateLogin}
              dataSource={dataSource}
            />
            <NavigationBar scale={scale} />
          </div>
        );
      } else {
        return (
          <div id="main-container" style={{ height: height }}>
            <LoadingView isLoading={isLoading} height={height} />
            <CustomerService />
            <HomeBrowserView
              scale={scale}
              loginCallback={this._updateLogin}
              dataSource={dataSource}
            />
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
    const { isMobile } = this.state;
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

  private _updateLogin(isLogin: boolean, username?: string): void {
    const loginStatus = new LoginStatusModel({
      is_login: isLogin,
      username: username ? username : undefined,
    });
    this.setState({ loginStatus: loginStatus });
  }
}
