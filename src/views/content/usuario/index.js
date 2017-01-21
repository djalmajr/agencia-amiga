import React from 'react';
import { Page } from '~/views/components';
import Panel from './panel';
import Details from './details';

const Usuario = () => <Page left={Panel} content={Details} />;

export default Usuario;
