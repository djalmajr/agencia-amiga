import React from "react";
import {Match} from "react-router";
import FlexColumn from "views/components/flex-column";
import {Servico, Servicos} from "./servicos";
import styles from "./content.scss";

const Content = () => (
    <FlexColumn full className={styles.content}>
        <Match pattern="/buscar" component={Servicos} />
        <Match pattern="/servicos/:id" component={Servico} />
    </FlexColumn>
);

export default Content;
