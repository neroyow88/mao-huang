import React from "react";
import { Nav, NavItem, Navbar, NavLink } from "reactstrap";

interface IUtilityItem {
  label: string;
  image?: string;
}

const styles = {
  utilityBarContainer: {
    height: "90px",
    width: "100%",
    background: "#AD0002",
    border: "2px solid #AD0002",
  },
  navbarStyle: {
    height: "100%",
    width: "100%",
  },
  navStyle: {
    height: "100%",
    width: "100%",
    paddingLeft: "10%",
    fontSize: "18px",
  },
  navItemStyle: {
    paddingRight: "70px",
  },
  utilityItemContainer: {
    marginTop: "40px",
    paddingRight: "80px",
  },
};

function renderUtilityBar() {
  const balance = 2432.13;

  return (
    <div id="utility-bar-container" style={styles.utilityBarContainer}>
      <Navbar style={styles.navbarStyle}>
        <Nav style={styles.navStyle}>
          <NavItem style={styles.navItemStyle}>
            <img src={"logo.png"} />
          </NavItem>
          {utilityItem({ label: "猫皇", image: "520-logo2.png" })}
          {utilityItem({ label: "游戏充值" })}
          {utilityItem({ label: "快速提款" })}
          {utilityItem({ label: "户内转帐" })}
          {utilityItem({ label: "留言信息" })}
          {utilityItem({ label: `猫皇余额 : ${balance}` })}
        </Nav>
      </Navbar>
    </div>
  );
}

function utilityItem(content: IUtilityItem) {
  const imageComponent = content.image ? <img src="520-logo2.png"></img> : null;

  return (
    <NavItem style={styles.utilityItemContainer}>
      <NavLink
        href=""
        style={{
          color: "#FCB715",
        }}
      >
        {content.label}
        {imageComponent}
      </NavLink>
    </NavItem>
  );
}

export { renderUtilityBar };
