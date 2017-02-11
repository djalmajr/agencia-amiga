import { curry, get } from 'lodash';

export default reducerName => curry((attr, state) => get(state[reducerName], attr));
