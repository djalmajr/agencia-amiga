import React from "react";
import {Dropdown} from "semantic-ui-react";

class Habilidades extends React.Component {
    static propTypes = {
        options: React.PropTypes.array,
        value: React.PropTypes.array,
        onAddItem: React.PropTypes.func,
        onChange: React.PropTypes.func,
    };

    render() {
        const {value, options} = this.props;

        return (
            <Dropdown
                fluid
                search
                multiple
                selection
                allowAdditions
                placeholder="Digite suas habilidades"
                noResultsMessage="Nenhum resultado encontrado"
                value={value}
                options={options}
                onAddItem={this.props.onAddItem}
                onChange={this.props.onChange}
            />
        );
    }
}

export default Habilidades;
