import React from "react";
import {Grid} from "semantic-ui-react";
import TopBar from "./topbar";
import Content from "./content";
import LeftPanel from "./left-panel";
import RightPanel from "./right-panel";
import styles from "./main.scss";

const Main = () => (
    <div className={styles.main}>
        <Grid padded>
            <Grid.Row style={{padding: 0}}>
                <TopBar />
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3} className={styles.column}>
                    <LeftPanel />
                </Grid.Column>
                <Grid.Column width={10} className={styles.column}>
                    <Content />
                </Grid.Column>
                <Grid.Column width={3} className={styles.column}>
                    <RightPanel />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
);

export default Main;
