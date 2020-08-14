import React from "react";
import { Nav, NavItem, Navbar, NavLink } from "reactstrap";

const styles = {
  utilityBarContainer: {
    height: "110px",
    width: "100%",
    background: "#AD0002 0% 0% no-repeat padding-box",
  },
  navbarStyle: {
    height: "100%",
    width: "100%",
  },
  navStyle: {
    height: "100%",
    width: "100%",
    marginLeft: "12%",
  },
  navItemStyle: {
    alignSelf: "center",
  },
  utilityItemContainer: {
    marginTop: "50px",
    marginLeft: "50px",
  },
};

export default function UtilityBar() {
  const balance = 2432.13;

  return (
    <section id="utility-bar-container" style={styles.utilityBarContainer}>
      <Navbar style={styles.navbarStyle}>
        <Nav style={styles.navStyle}>
          <NavItem style={styles.navItemStyle}>
            <img src={"logo.png"} />
          </NavItem>
          {utilityItem({ contentLabel: "猫皇", contentImage: "520-logo2.png" })}
          {utilityItem({ contentLabel: "游戏充值" })}
          {utilityItem({ contentLabel: "快速提款" })}
          {utilityItem({ contentLabel: "户内转帐" })}
          {utilityItem({ contentLabel: "留言信息" })}
          {utilityItem({ contentLabel: `猫皇余额 : ${balance}` })}
        </Nav>
      </Navbar>
    </section>
  );
}

function utilityItem(content) {
  const imageComponent = content.contentImage ? (
    <img src="520-logo2.png"></img>
  ) : null;

  return (
    <NavItem style={styles.utilityItemContainer}>
      <NavLink
        href=""
        style={{
          color: "#FCB715",
        }}
      >
        {content.contentLabel}
        {imageComponent}
      </NavLink>
    </NavItem>
  );
}
