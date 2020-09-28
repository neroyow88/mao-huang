import React from "react";

import { ImageHandler } from "./ImageHandler";

import { gameListModel } from "../model/GameListConstant";
import { dataSource } from "../model/DataSource";

interface IDropdownItem {
  title: string;
  description: string;
  prefix: string;
  childs?: string[];
}

interface Props {
  isLoaded?: boolean;
}

interface State {
  toggleIndex: number;
  hoverIndex: number;
  selectedIndex: number;
}

class GameListBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      toggleIndex: -1,
      hoverIndex: -1,
      selectedIndex: -1,
    };

    this._renderGameListMobile = this._renderGameListMobile.bind(this);
    this._renderGameListBrowser = this._renderGameListBrowser.bind(this);
    this._listItem = this._listItem.bind(this);
    this._dropdownToggle = this._dropdownToggle.bind(this);
    this._onGameListButtonClicked = this._onGameListButtonClicked.bind(this);
  }

  public render(): JSX.Element {
    const { isMobile } = dataSource.systemModel;
    if (isMobile) {
      return this._renderGameListMobile();
    } else {
      return this._renderGameListBrowser();
    }
  }

  private _renderGameListMobile(): JSX.Element {
    const components = gameListModel.map((item, index: number) => {
      return this._listItem(item, index);
    });
    return (
      <div id="game-list-bar-container-mobile">
        <div id="game-list-bar-title-container">
          <div id="game-list-bar-title">娱乐游戏平台</div>
        </div>
        {components}
      </div>
    );
  }

  private _listItem(content: IDropdownItem, index: number): JSX.Element {
    return (
      <div
        className="game-list-item-container row-container center"
        key={`game-list-item-container-${index}`}
      >
        <ImageHandler
          src={`mobile/game_list/${content.prefix}_logo.png`}
          scale={0.33}
        />
        <div
          className="labels-container column-container"
          key={`label-container-${index}`}
        >
          <div className="title" key={`title-${index}`}>
            {content.title}
          </div>
          <div className="description" key={`description-${index}`}>
            {content.description}
          </div>
        </div>
        <div
          className="button"
          key={`button-${index}`}
          onClick={(): void => {
            this._onGameListButtonClicked(index);
          }}
        >
          <div className="button-label">进入</div>
        </div>
      </div>
    );
  }

  private _onGameListButtonClicked(index: number): void {
    console.log(index);
  }

  private _renderGameListBrowser(): JSX.Element {
    const toggleComponents = gameListModel.map((item, index: number) => {
      return this._dropdownToggle(item, index);
    });

    const menuComponents = gameListModel.map((item, index: number) => {
      return this._dropdownMenu(item, index);
    });

    return (
      <div id="game-list-bar-container-browser">
        <div id="game-list-toggle-container" className="row-container center">
          {toggleComponents}
        </div>
        {menuComponents}
      </div>
    );
  }

  private _dropdownToggle(content: IDropdownItem, index: number): JSX.Element {
    const { toggleIndex } = this.state;
    const color = toggleIndex === index ? "#FF0000" : "#FFFFFF";

    return (
      <div
        className="dropdown-toggle-container row-container center"
        key={`dropdown-toggle-container-${index}`}
        onClick={(): void => {
          this._onToggle(index);
        }}
        style={{ color: color }}
      >
        {content.title}
        <div
          className="arrow-down"
          key={`arrow-down-${index}`}
          style={{ borderTop: `5px solid ${color}` }}
        ></div>
      </div>
    );
  }

  private _dropdownMenu(content: IDropdownItem, index: number): JSX.Element {
    let dropdownChild = [];
    if (content.childs && content.childs.length > 0) {
      dropdownChild = content.childs.map((child: string, id: number) => {
        const { hoverIndex: itemIndex } = this.state;
        const convertIndex = index * 100 + id;
        const active = itemIndex === convertIndex ? "active" : "deactive";
        const preloadLogo = this.props.isLoaded ? null : (
          <img src={`game_list/${content.prefix}/${child}_active.png`}></img>
        );

        return (
          <div
            className="dropdown-item-container"
            key={`dropdown-item-container${index}${id}`}
            onMouseEnter={(): void => {
              this._onUpdateItem(convertIndex);
            }}
            onMouseLeave={(): void => {
              this._onUpdateItem(-1);
            }}
            onClick={(): void => {
              this._onItemSelected(convertIndex);
            }}
          >
            <img
              src={`game_list/${content.prefix}/${child}_${active}.png`}
            ></img>
            {preloadLogo}
          </div>
        );
      });
    }

    const { toggleIndex } = this.state;
    const yPos = toggleIndex === index ? -1 : -100;

    return (
      <div className="dropdown-mask" key={`dropdown-mask-${index}`}>
        <div
          className="dropdown-menu-container column-container center"
          key={`dropdown-menu-container-${index}`}
          style={{ transform: `translateY(${yPos}%)` }}
        >
          <div
            className="dropdown-menu-title"
            key={`dropdown-menu-title-${index}`}
          >
            <img
              src={`game_list/${content.prefix}/logo.png`}
              style={{ transform: "scale(0.5)" }}
            />
          </div>
          <div
            className="dropdown-menu-grid"
            key={`dropdown-menu-grid-${index}`}
          >
            {dropdownChild}
          </div>
        </div>
      </div>
    );
  }

  private _onToggle(index: number): void {
    const { toggleIndex } = this.state;
    if (toggleIndex === index) {
      this.setState({ toggleIndex: -1 });
    } else {
      this.setState({ toggleIndex: index });
    }
  }

  private _onUpdateItem(index: number): void {
    this.setState({ hoverIndex: index });
  }

  private _onItemSelected(index: number): void {
    this.setState({ selectedIndex: index });
  }
}

export { GameListBar };
