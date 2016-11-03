import React from "react";
import moment from "moment";
import faker from "faker";
import times from "lodash/times";
import {Card, Icon, Image} from "semantic-ui-react";
import FlexColumn from "views/components/flex-column";
import FlexRow from "views/components/flex-row";
import styles from "./content.scss";

moment.locale("pt-br");

class Content extends React.Component {
    render() {
        const records = times(19).map(() => ({
            "title": faker.name.findName(),
            "meta": "350 visualizações",
            "description": faker.hacker.phrase(),
            "image": faker.internet.avatar(),
            "created_at": new Date().toJSON(),
        }));

        return (
            <FlexColumn full className={styles.content}>
                <FlexRow align="center" className={styles.sorting}>
                    <strong>Ordenar por:</strong>
                    <a href="#" className={styles.selected}>Mais Recente</a><span>|</span>
                    <a href="#">Mais Antigo</a><span>|</span>
                    <a href="#">Popularidade</a>
                </FlexRow>
                <Card.Group itemsPerRow={4} className={styles.cards}>
                    {records.map((record, idx) =>
                        <Card key={idx}>
                            <Card.Content>
                                <Image floated="left" size="mini" src={record.image} />
                                <Card.Header>{record.title}</Card.Header>
                                <Card.Meta>{record.meta}</Card.Meta>
                                <Card.Description>{record.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <FlexRow justify="space-between">
                                    <a href="#"><Icon name="heart" /></a>
                                    <span>{moment(record.created_at).fromNow()}</span>
                                </FlexRow>
                            </Card.Content>
                        </Card>
                    )}
                </Card.Group>
            </FlexColumn>
        );
    }
}

export default Content;
