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

interface Props {}

class UtilityBar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._renderUtilityItem = this._renderUtilityItem.bind(this);
  }

  public render(): JSX.Element {
    const balance = 2432.13;
    return (
      <div id="utility-bar-container" style={styles.utilityBarContainer}>
        <Navbar style={styles.navbarStyle}>
          <Nav style={styles.navStyle}>
            <NavItem style={styles.navItemStyle}>
              <img src={"logo.png"} />
            </NavItem>
            {this._renderUtilityItem({ label: "猫皇", image: "520-logo2.png" })}
            {this._renderUtilityItem({ label: "游戏充值" })}
            {this._renderUtilityItem({ label: "快速提款" })}
            {this._renderUtilityItem({ label: "户内转帐" })}
            {this._renderUtilityItem({ label: "留言信息" })}
            {this._renderUtilityItem({ label: `猫皇余额 : ${balance}` })}
          </Nav>
        </Navbar>
      </div>
    );
  }

  private _renderUtilityItem(content: IUtilityItem): JSX.Element {
    const imageComponent = content.image ? (
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
          {content.label}
          {imageComponent}
        </NavLink>
      </NavItem>
    );
  }
}

export { UtilityBar };
