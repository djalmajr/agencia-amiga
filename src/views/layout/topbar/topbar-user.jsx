import React from "react";
import faker from "faker";
import FlexRow from "views/components/flex-row";
import {Dropdown, Icon, Image} from "semantic-ui-react";
import styles from "./topbar-user.scss";

class TopBarUser extends React.Component {
    render() {
        const trigger = (
            <FlexRow align="center" justify="center">
                <Image avatar src={faker.internet.avatar()} />
                <Icon name="caret down" style={{marginLeft: "0.3em"}} />
            </FlexRow>
        );

        return (
            <FlexRow align="center" className={styles.topBarUser}>
                <Icon name="alarm outline" style={{marginRight: "1em"}} />
                <Icon name="mail outline" style={{marginRight: "1em"}} />
                <Dropdown icon={null} trigger={trigger} pointing="top right">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Configurações" icon="settings" />
                        <Dropdown.Item text="Sair" icon="sign out" />
                    </Dropdown.Menu>
                </Dropdown>
            </FlexRow>
        );
    }
}

export default TopBarUser;
