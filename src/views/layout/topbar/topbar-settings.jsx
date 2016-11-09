import React from "react";
// import faker from "faker";
// import FlexColumn from "views/components/flex-column";
import FlexRow from "views/components/flex-row";
import SelectHabilidades from "./topbar-settings-habilidades";
import styles from "./topbar-settings.scss";

import {
    Button,
    Form,
    Input,
    Modal,
} from "semantic-ui-react";

class Settings extends React.Component {
    static propTypes = {
        isOpen: React.PropTypes.bool,
        onClose: React.PropTypes.func,
    };

    state = {
        habilidades: [
            {text: "Eletricista", value: "Eletricista"},
            {text: "Encanador", value: "Encanador"},
            {text: "Mecânico", value: "Mecânico"},
            {text: "Pedreiro", value: "Pedreiro"},
        ],
    };

    handleChange = (e, {value}) => {
        this.setState({selectedValues: value});
    };

    handleAddItem = (e, {value}) => {
        this.setState({
            habilidades: [{text: value, value}, ...this.state.habilidades],
        });
    };

    render() {
        const {isOpen, onClose} = this.props;
        const {selectedValues, habilidades} = this.state;

        return (
            <Modal
                open={isOpen}
                closeOnRootNodeClick={false}
                className={styles.settings}
                onClose={onClose}
            >
                <Modal.Header>
                    Configurações
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input required label="Nome Completo" name="nome" placeholder="Ex.: José Cícero" />
                        <Form.Field
                            required
                            label="Habilidades"
                            value={selectedValues}
                            options={habilidades}
                            onAddItem={this.handleAddItem}
                            onChange={this.handleChange}
                            control={SelectHabilidades}
                        />
                        <Form.Group widths="equal">
                            <Form.Input required label="Estado" name="estado" placeholder="Ex.: Alagoas" />
                            <Form.Input required label="Cidade" name="cidade" placeholder="Ex.: Maceió" />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Senha Atual</label>
                                <Input type="senha" placeholder="******" />
                                <small>Obs.: Deixe em branco para não alterar</small>
                            </Form.Field>
                            <Form.Input label="Nova Senha" name="senha2" placeholder="******" />
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <FlexRow justify="flex-end">
                        <Button content="Fechar" style={{marginRight: "0.8em"}} onClick={onClose} />
                        <Button primary content="Salvar" icon="save" type="submit" />
                    </FlexRow>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default Settings;
