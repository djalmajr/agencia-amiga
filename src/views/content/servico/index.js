import React from 'react';
import { Page } from '~/views/components';
import Panel from './panel';
import Details from './details';
import Related from './related';

const Servico = () => <Page left={Panel} content={Details} right={Related} />;

export default Servico;
