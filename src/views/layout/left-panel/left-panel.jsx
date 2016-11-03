import cn from "classnames";
import React from "react";
import FlexColumn from "views/components/flex-column";
import FlexRow from "views/components/flex-row";
import styles from "./left-panel.scss";
import {
    Button,
    Divider,
    Dropdown,
    Form,
    Header,
    Icon,
    Input,
    Segment,
} from "semantic-ui-react";

class LeftPanel extends React.Component {
    state = {
        isSearching: false,
        selectedFilter: "todos",
    };

    handleFilterClick = (value) => {
        console.log(value);
    };

    render() {
        const {isSearching, selectedFilter} = this.state;
        const habilidades = [
            {text: "Eletricista", value: "Eletricista"},
            {text: "Encanador", value: "Encanador"},
            {text: "Mecânico", value: "Mecânico"},
            {text: "Pedreiro", value: "Pedreiro"},
        ];
        const options = [
            {text: "Todos", value: "todos", icon: "globe"},
            {text: "Organizações", value: "organizacoes", icon: "university"},
            {text: "Serviços", value: "servicos", icon: "wrench"},
            {text: "Pessoas", value: "pessoas", icon: "users"},
            {text: "Campanhas", value: "campanhas", icon: "bullhorn"},
        ];

        return (
            <Segment>
                <FlexColumn className={styles.menu}>
                    {options.map((option) =>
                        <FlexRow
                            align="center"
                            key={option.value}
                            className={cn(styles.menuItem, {[styles.selected]: option.value === selectedFilter})}
                            onClick={() => this.handleFilterClick(option.value)}
                        >
                            <Icon name={option.icon} />
                            <span style={{marginLeft: "0.5em"}}>{option.text}</span>
                        </FlexRow>
                    )}
                </FlexColumn>
                <Divider />
                <FlexColumn>
                    <Header as="h5">Filtrar por:</Header>
                    <Form className={styles.searchForm} onSubmit={this.handleSearch}>
                        <Dropdown
                            fluid
                            search
                            multiple
                            selection
                            options={habilidades}
                            placeholder="Habilidades..."
                        />
                        <Input fluid placeholder="Localização..." style={{marginTop: "1em"}} />
                    </Form>
                    <FlexRow justify="space-between" style={{marginTop: "1em"}}>
                        <Button type="submit" size="small" color="primary" disabled={isSearching}>
                            Buscar
                        </Button>
                        <Button size="small" disabled={isSearching}>
                            Limpar
                        </Button>
                    </FlexRow>
                </FlexColumn>
            </Segment>
        );
    }
}

export default LeftPanel;
