import React from "react";
import {Segment} from "semantic-ui-react";
import FlexColumn from "views/components/flex-column";
import styles from "./right-panel.scss";

class RightPanel extends React.Component {
    render() {
        return (
            <FlexColumn className={styles.rightPanel}>
                <Segment>
                    Pellentesque habitant morbi tristique senectus.
                </Segment>
                <Segment>
                    Pellentesque habitant morbi tristique senectus.
                </Segment>
            </FlexColumn>
        );
    }
}

export default RightPanel;
