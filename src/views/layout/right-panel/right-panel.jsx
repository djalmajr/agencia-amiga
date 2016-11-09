import React from "react";
import {Match} from "react-router";
import ServicosRelacionados from "./servicos-relacionados";

class RightPanel extends React.Component {
    render() {
        const EmptyPanel = () => <div />;

        return (
            <div>
                <Match pattern="/buscar" component={EmptyPanel} />
                <Match pattern="/servicos/:id" component={ServicosRelacionados} />
            </div>
        );
    }
}

export default RightPanel;
