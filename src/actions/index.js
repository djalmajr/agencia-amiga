import * as API from "apis";

export const login = (username, password, scope) => (dispatch) => {
    dispatch({type: "LOGIN"});

    API.login({username, password, scope}).then(
        (response) => dispatch({type: "LOGIN", response}),
        (error) => dispatch({type: "LOGIN", error})
    );
};

export const logout = () => ({type: "LOGOUT"});

export const fetchUser = () => (dispatch, getState) => {
    dispatch({type: "FETCH_USER"});

    API.fetchUser(getState().userToken).then(
        (response) => dispatch({type: "FETCH_USER", response}),
        (error) => dispatch({type: "FETCH_USER", error})
    );
};
