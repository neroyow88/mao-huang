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

interface IDropdownItem {
  label: string;
  prefix: string;
  childs?: string[];
}

const styles = {
  gameListBarContainer: {
    width: "100%",
    height: "70px",
    backgroundColor: "#1E202F",
    border: "2px solid #1E202F",
  },
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
  }

  public render(): JSX.Element {
    const components = gameListModel.map((item, index: number) => {
      return this._dropdownItem(item, index);
    });

    return (
      <div id="game-list-bar-container" style={styles.gameListBarContainer}>
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
          {content.label}
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
