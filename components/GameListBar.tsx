import React from "react";
import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { gameListModel } from "../model/GameListModel";
import { utils } from "../model/Utils";
import { ImageHandler } from "./ImageHandler";

interface IDropdownItem {
  title: string;
  description: string;
  prefix: string;
  childs?: string[];
}

const styles = {
  navbarStyle: {
    height: "100%",
    width: "100%",
  },
  navStyle: {
    height: "100%",
    width: "100%",
    paddingLeft: "10%",
    alignContent: "center",
    fontSize: "18px",
  },
  dropdownItem: {
    color: "#FFFFFF",
    paddingRight: "118px",
  },
};

interface Props {}

class GameListBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._renderGameListMobile = this._renderGameListMobile.bind(this);
    this._renderGameListBrowser = this._renderGameListBrowser.bind(this);
    this._listItem = this._listItem.bind(this);
    this._dropdownItem = this._dropdownItem.bind(this);
    this._onGameListButtonClicked = this._onGameListButtonClicked.bind(this);
  }

  public render(): JSX.Element {
    if (utils.isMobile) {
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
        className="game-list-item-container"
        key={`game-list-item-container-${index}`}
      >
        <ImageHandler
          src={`mobile/game_list/${content.prefix}_logo.png`}
          scale={0.33}
        />
        <div className="labels-container" key={`label-container-${index}`}>
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
    const components = gameListModel.map((item, index: number) => {
      return this._dropdownItem(item, index);
    });

    return (
      <div id="game-list-bar-container-browser">
        <Navbar style={styles.navbarStyle}>
          <Nav style={styles.navStyle}>{components}</Nav>
        </Navbar>
      </div>
    );
  }

  private _dropdownItem(content: IDropdownItem, index: number): JSX.Element {
    let dropdownChild = [];
    if (content.childs && content.childs.length > 0) {
      dropdownChild = content.childs.map((child: string, index: number) => {
        return (
          <DropdownItem key={`dropdown-item-${index}`}>
            <img
              src={`game_list/${content.prefix}/${child}_deactive.png`}
            ></img>
          </DropdownItem>
        );
      });
    }

    return (
      <UncontrolledDropdown nav inNavbar key={`uncontrolled-dropdown-${index}`}>
        <DropdownToggle
          key={`dropdown-toggle-${index}`}
          nav
          caret
          style={styles.dropdownItem}
        >
          {content.title}
        </DropdownToggle>
        <DropdownMenu
          key={`dropdown-menu-${index}`}
          // cssModule={customStyles}
        >
          {dropdownChild}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

export { GameListBar };
