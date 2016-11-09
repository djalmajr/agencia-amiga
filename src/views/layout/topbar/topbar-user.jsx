import React from "react";
import {Dropdown, Icon, Image} from "semantic-ui-react";
import FlexRow from "views/components/flex-row";
import defaultUserImage from "./user.png";
import SettingsModal from "./topbar-settings";
import styles from "./topbar-user.scss";

class TopBarUser extends React.Component {
    state = {
        isSettingsVisible: false,
    }

    handleSettingsToggle = () => {
        this.setState({isSettingsVisible: !this.state.isSettingsVisible});
    };

    render() {
        const settingsProps = {
            isOpen: this.state.isSettingsVisible,
            onClose: this.handleSettingsToggle,
        };

        const trigger = (
            <FlexRow align="center" justify="center">
                <Image avatar src={defaultUserImage} />
                <Icon name="caret down" style={{marginLeft: "0.3em"}} />
            </FlexRow>
        );

        return (
            <FlexRow align="center" justify="flex-end" className={styles.topBarUser}>
                <Icon name="alarm outline" style={{marginRight: "1em"}} />
                <Icon name="mail outline" style={{marginRight: "1em"}} />
                <Dropdown icon={null} trigger={trigger} pointing="top right">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Configurações" icon="settings" onClick={this.handleSettingsToggle} />
                        <Dropdown.Item text="Sair" icon="sign out" />
                    </Dropdown.Menu>
                </Dropdown>
                <SettingsModal {...settingsProps} />
            </FlexRow>
        );
    }
}

export default TopBarUser;
