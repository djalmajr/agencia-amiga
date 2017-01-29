import { v4 } from 'uuid';
import { createAction as createReduxActions } from 'redux-actions';

const createAction = (name, ...args) => createReduxActions(`${name}-${v4()}`, ...args);

export default createAction;
