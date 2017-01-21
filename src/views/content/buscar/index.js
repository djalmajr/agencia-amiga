import React from 'react';
import { Page } from '~/views/components';
import Filters from './filters';
import Results from './results';

const Buscar = () => <Page left={Filters} content={Results} />;

export default Buscar;
