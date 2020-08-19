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
    marginLeft: "12%",
    alignContent: "center",
  },
  dropdownItem: {
    color: "#FFFFFF",
    paddingRight: "118px",
  },
};

export default function GameListBar() {
  const components = gameListModel.map((item, index: number) => {
    return dropdownItem(item, index);
  });

  return (
    <div id="game-list-bar-container" style={styles.gameListBarContainer}>
      <Navbar style={styles.navbarStyle}>
        <Nav style={styles.navStyle}>{components}</Nav>
      </Navbar>
    </div>
  );
}

function dropdownItem(content: IDropdownItem, index: number) {
  let dropdownChild = [];
  if (content.childs && content.childs.length > 0) {
    dropdownChild = content.childs.map((child: string, index: number) => {
      return (
        <DropdownItem key={`dropdown-item-${index}`}>{child}</DropdownItem>
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
      <DropdownMenu key={`dropdown-menu-${index}`}>
        {dropdownChild}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
