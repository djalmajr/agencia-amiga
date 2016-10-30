// import {REST, Url} from "@comunica/utils";

// export const login = (data) => (
//     REST.post(`${Url.API}/oauth/token`, {
//         body: JSON.stringify({
//             ...data,
//             "grant_type": "password",
//             "client_id": "webapp",
//             "client_secret": "webapp",
//         }),
//     })
// );

// export const fetchUser = (userToken) => (
//     REST.get(`${Url.API}/usuarios/me`, {
//         headers: {
//             Authorization: `${userToken["token_type"]} ${userToken["access_token"]}`,
//         },
//     })
// );
