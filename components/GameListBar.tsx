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
  const components = gameListModel.map((item) => {
    return dropdownItem(item);
  });

  return (
    <section id="game-list-bar-container" style={styles.gameListBarContainer}>
      <Navbar style={styles.navbarStyle}>
        <Nav style={styles.navStyle}>{components}</Nav>
      </Navbar>
    </section>
  );
}

function dropdownItem(content: IDropdownItem) {
  let dropdownChild = [];
  if (content.childs && content.childs.length > 0) {
    dropdownChild = content.childs.map((child) => {
      return <DropdownItem>{child}</DropdownItem>;
    });
  }

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret style={styles.dropdownItem}>
        {content.label}
      </DropdownToggle>
      <DropdownMenu>{dropdownChild}</DropdownMenu>
    </UncontrolledDropdown>
  );
}
