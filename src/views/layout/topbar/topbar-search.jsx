import React from "react";
import {Button, Form, Icon, Input, Dropdown} from "semantic-ui-react";
import styles from "./topbar-search.scss";

class TopBarSearch extends React.Component {
    state = {
        isSearching: false,
        selectedFilter: "todos",
    };

    handleFilterClick = (evt, selectedFilter) => {
        this.setState({selectedFilter});
    };

    handleSearch = (evt, fields) => {
        evt.preventDefault();

        console.log(fields.searchInput);
    };

    render() {
        const {isSearching, selectedFilter} = this.state;

        const options = [
            {text: "Todos", value: "todos", icon: "globe"},
            {text: "Organizações", value: "organizacoes", icon: "university"},
            {text: "Serviços", value: "servicos", icon: "wrench"},
            {text: "Pessoas", value: "pessoas", icon: "users"},
            {text: "Campanhas", value: "campanhas", icon: "bullhorn"},
        ];

        const filters = (
            <Dropdown pointing="top left" icon="sliders" className={styles.filters}>
                <Dropdown.Menu>
                    {options.map((option) =>
                        <Dropdown.Item
                            key={option.value}
                            selected={selectedFilter === option.value}
                            icon={option.icon}
                            value={option.value}
                            text={option.text}
                            onClick={this.handleFilterClick}
                        />
                    )}
                </Dropdown.Menu>
            </Dropdown>
        );

        return (
            <Form className={styles.searchForm} onSubmit={this.handleSearch}>
                <Input
                    action
                    focus={false}
                    loading={isSearching}
                    className={styles.searchInput}
                >
                    <Icon loading={isSearching} name="search" />
                    <input name="searchInput" placeholder="Buscar..." />
                    {filters}
                    <Button type="submit" className={styles.filterButton} disabled={isSearching}>
                        Buscar
                    </Button>
                </Input>
            </Form>
        );
    }
}

export default TopBarSearch;
