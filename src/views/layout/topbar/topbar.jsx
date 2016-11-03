import React from "react";
import {Grid} from "semantic-ui-react";
// import FlexRow from "views/components/flex-row";
import TopBarSearch from "./topbar-search";
import TopBarUser from "./topbar-user";
import styles from "./topbar.scss";

class TopBar extends React.Component {
    render() {
        return (
            <Grid centered padded className={styles.topBar}>
                <Grid.Column width={3} className={styles.column} style={{fontSize: "1.2em"}}>
                    <i className={`fa fa-briefcase ${styles.logo}`} />
                    <span>Agência Amiga</span>
                </Grid.Column>
                <Grid.Column width={10} className={styles.column}>
                    <TopBarSearch />
                </Grid.Column>
                <Grid.Column width={3} className={styles.column}>
                    <TopBarUser />
                </Grid.Column>
            </Grid>
        );
    }
}

export default TopBar;
