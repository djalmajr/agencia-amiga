import {fromJS} from "immutable";
import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import {ActionTypes} from "../../constants";

const byIdInitial = fromJS({});

const isFetching = handleActions({
    [ActionTypes.LOGIN]: () => true,
    [ActionTypes.LOGOUT]: () => false,
    [ActionTypes.USERS_UPDATE]: () => false,
    [ActionTypes.UNAUTHORIZED]: () => false,
}, false);

const byId = handleActions({
    [ActionTypes.LOGOUT]: () => byIdInitial,
    [ActionTypes.UNAUTHORIZED]: () => byIdInitial,
    [ActionTypes.USERS_UPDATE]: (state, action) => {
        if (action.error) {
            return state;
        }

        return fromJS(action.payload.entities.users);
    },
}, byIdInitial);

export default combineReducers({byId, isFetching});
