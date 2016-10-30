import Immutable from "immutable";

export const getUser = (state) => {
    return state.users.byId.first() || Immutable.Map();
};

export const isLogged = (state) => {
    return getUser(state).has("id");
};

export const isLogging = (state) => {
    return state.user.isFetching;
};
