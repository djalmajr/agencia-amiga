import React from "react";
import FlexRow from "views/components/flex-row";
import TopBarSearch from "./topbar-search";
import TopBarUser from "./topbar-user";
import styles from "./topbar.scss";

class TopBar extends React.Component {
    render() {
        return (
            <FlexRow className={styles.topBar}>
                <FlexRow align="center" style={{fontSize: "1.2em"}}>
                    <i className={`fa fa-briefcase ${styles.logo}`} />
                    <span>Agência Amiga</span>
                </FlexRow>
                <TopBarSearch />
                <TopBarUser />
            </FlexRow>
        );
    }
}

export default TopBar;
