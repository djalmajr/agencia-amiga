import React from "react";
import FlexRow from "views/components/flex-row";
import TopBarSearch from "./topbar-search";
import TopBarUser from "./topbar-user";
import styles from "./topbar.scss";

class TopBar extends React.Component {
    render() {
        return (
            <FlexRow className={styles.topBar}>
                <FlexRow className={styles.column} style={{fontSize: "1.2em"}}>
                    <i className={`fa fa-briefcase ${styles.logo}`} />
                    <span>Agência Amiga</span>
                </FlexRow>
                <FlexRow full className={styles.column}>
                    <TopBarSearch />
                </FlexRow>
                <FlexRow className={styles.column}>
                    <TopBarUser />
                </FlexRow>
            </FlexRow>
        );
    }
}

export default TopBar;
