import React from "react";
import TopBar from "./topbar";
import Content from "./content";
import LeftPanel from "./left-panel";
import RightPanel from "./right-panel";
import FlexColumn from "views/components/flex-column";
import FlexRow from "views/components/flex-row";
import styles from "./main.scss";

const Main = () => (
    <FlexColumn className={styles.main}>
        <FlexRow>
            <TopBar />
        </FlexRow>
        <FlexRow full className={styles.content}>
            <LeftPanel />
            <Content />
            <RightPanel />
        </FlexRow>
    </FlexColumn>
);

export default Main;
